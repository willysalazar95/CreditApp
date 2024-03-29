import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import ResultCalculationsPago from "../../Components/ResultCalculationsPago";
import { useNavigation, } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { Creditos } from "../../clases/Creditos";
import { RootStackParamList } from "../../../App";
import { StackNavigationProp } from "@react-navigation/stack";
import { CreditosCronogramas } from "../../clases/CreditosCronogramas";

import AlertaModal from "../../utils/AlertModal";
import Checkbox from 'expo-checkbox';
import { CreditoPago } from "../../clases/CreditoPago";


type homeScreenProp = StackNavigationProp<RootStackParamList, "DrawerScreen">;

const PagarCredito_Screen = ({ route }: any) => {

	const [isChecked, setChecked] = useState(false);
	const navigation = useNavigation<homeScreenProp>();
	const { idCredito } = route.params;

	const [nIdCredito, setNIdCredito] = useState(0);
	const [cPersNombre, setCPersNombre] = useState("");
	const [nMontoPrestado, setNMontoPrestado] = useState(0.0);
	const [nMontoInteres, setNMontoInteres] = useState(0.0);
	const [nSaldoAnterior, setNSaldoAnterior] = useState(0.0);
	const [nNuevoSaldo, setNNuevoSaldo] = useState(0.0);
	const [nTotalCuotas, setNTotalCuotas] = useState(0);

	const [nMontoAPagar, setNMontoAPagar] = useState("");
	const [nCronoMonto, setNCronoMonto] = useState(0.0);
	const [nCronoCuota, setNCronoCuota] = useState(0);
	const [cPerDescripcion, setCPerDescripcion] = useState("");
	const [nCredNroCuotas, setNCredNroCuotas] = useState(0);
	const [nPagoCuota, setNPagoCuota] = useState(0.0);

	const [MensajeModal1, setMensajeModal1] = useState("");
	const [isAlertVisible, setAlertVisible] = useState(false);
	const [tituloModal, setTituloModal] = useState("");
	const [alertMessage, setAlertMessage] = useState("");
	const [montoPagado, setMontoPagado] = useState(0);
	const [editable, setEditable] = useState(true);

	const ocultarAlertaModal = () => {
		setAlertVisible(false);
	};

	const [dCronoFechaVencimiento, setDCronoFechaVencimiento] = useState(
		new Date().toString()
	);

	const ObtenerPago = async () => {
		const cc = new CreditosCronogramas();

		const response = (await cc.ObtenerPago(idCredito)).data[0];
		//obtener datos

		const { nCronoCuota, nCronoMonto, dCronoFechaVencimiento, nCronoInteres } =
			response;
		const { cClieNombres, cClieApellidos } = response.cliente;
		const {
			nCredMonto,
			nCredMontoInteres,
			nCredNroCuotas,
			nCredMontoPagado,
			nCredSaldo,
		} = response.credito;
		const { cPerDescripcion } = response.periodo;

		const calcSaldoAnterior = nCredMonto - nCronoMonto;

		setCPersNombre(cClieNombres + " " + cClieApellidos);
		setNMontoPrestado(nCredMonto);

		setNSaldoAnterior(calcSaldoAnterior);
		setNMontoInteres(nCredMontoInteres);
		setNTotalCuotas(nCredNroCuotas);
		setNIdCredito(idCredito);

		const nuevoSaldo =
			nCredMonto +
			nCredMontoInteres -
			(nCronoMonto + nCronoInteres + nCredMontoPagado);

		const nMontoPag = parseFloat(nCronoMonto) + parseFloat(nCronoInteres);

		setNMontoAPagar(String(nMontoPag.toFixed(2)));
		setNPagoCuota(nMontoPag);
		setNNuevoSaldo(nuevoSaldo);

		setNCronoCuota(nCronoCuota);
		setNCronoMonto(nCronoMonto);
		setCPerDescripcion(cPerDescripcion);
		setNCredNroCuotas(nCredNroCuotas);
		setDCronoFechaVencimiento(dCronoFechaVencimiento);
		setMontoPagado(nCredMontoPagado);
	};

	useEffect(() => {
		ObtenerPago();
	}, []);

	const Regresar = () => {
		navigation.goBack();
	};

	const CalcularNuevoSaldo = () => {
		const nuevaCantidad = isNaN(parseFloat(nMontoAPagar))
			? 0.0
			: parseFloat(nMontoAPagar);

		const nNuevoSaldo = nSaldoAnterior - nuevaCantidad;
		setNNuevoSaldo(nNuevoSaldo);
	};

	const OnChangeMontoAPagar = (text: string) => {
		setNMontoAPagar(text);
	};

	const handleCheckboxChange = async () => {
		setChecked(!isChecked);

		if (!isChecked) {
			const DatLiq = new CreditoPago();
			const Response = (await DatLiq.ObtenerLiquidacion(idCredito));
			var nMonto = 0
			nMonto = parseFloat(Response.data[0].nPagMonto) +
				parseFloat(Response.data[0].nCronoInteres) +
				parseFloat(Response.data[0].nCronoMora)
			
			setNMontoAPagar(String(nMonto.toFixed(2)));
		} else {
			ObtenerPago();
		}
		// setEditable(isChecked);
		// console.log(!isChecked +  "- Final");
	};

	const GuardarPago = async () => {
		const _dCred = new Creditos(
			nIdCredito,
			0,
			"",
			0,
			parseFloat(nMontoAPagar),
			0,
			0,
			0,
			"",
			parseFloat(nMontoAPagar),
			0,
			0,
			0,
			0,
			0,
			"",
			"",
			isChecked == true ? 1 : 0,
		);
		const response = await _dCred.RegistroCreditoPago();
		if (response.success) {
			navigation.navigate(
				"VoucherPago",

				{
					userNombres: cPersNombre,
					userMontoPagar: nMontoAPagar,
					MontPagar: nMontoAPagar,
				}
			);
			setTituloModal("MyBankito");
			setMensajeModal1("Pago guardado correctamente ");
			setAlertVisible(true);

			{
				/*
			Alert.alert(
				"Aviso",
				"Pago guardado correctamente",
				[
					{
						text: "Ok",
						onPress: () =>
							navigation.navigate(
								"VoucherPago",

								{
									userNombres: cPersNombre,
									userMontoPagar: nMontoAPagar,
									MontPagar: nMontoAPagar,
								}
							),
					},
				],
				{ cancelable: false }
			);
			*/
			}

			// navigation.goBack();
		} else {
			//Alert.alert("ERROR", response.error);
			setTituloModal("MyBankito");
			setMensajeModal1("ERROR" + response.error);
			setAlertVisible(true);
		}
	};

	return (
		<View style={{ flex: 1, backgroundColor: "#fff" }}>
			<ScrollView
				style={{
					flexDirection: "column",
				}}
			>
				<View style={styles.contenedor}>
					<View>
						<Text style={styles.title}>{cPersNombre}</Text>
					</View>

					<ResultCalculationsPago
						nMontoCredito={nMontoPrestado}
						nMontoInteres={nMontoInteres}
						nSaldoPendiente={nNuevoSaldo}
						nNuevoSaldo={nNuevoSaldo}
						nProxCuota={nCronoCuota}
						nCantCuotas={nCredNroCuotas}
						cModalidadPago={cPerDescripcion}
						dCronoFechaVencimiento={dCronoFechaVencimiento}
						nPagoCuota={nPagoCuota}
						nMontoPagado={montoPagado}
						errorMessage={""}
					/>
					<View style={styles.section}>
						{/* <Checkbox
							style={styles.checkbox}
							value={isChecked}
							onValueChange={RealizarCalculo}
							color={isChecked ? '#4630EB' : undefined}
						/> */}
						<TouchableOpacity onPress={handleCheckboxChange}>
							{/* Establece un estilo diferente según si está marcado o no */}
							<View style={isChecked ? styles.checkedBox : styles.uncheckedBox} />
						</TouchableOpacity>
						<Text style={styles.paragraph}>Liquidar crédito</Text>
					</View>

					<View
						style={{
							marginVertical: 1,
							marginHorizontal: 16,
							flexDirection: "column",
							flexWrap: "wrap",
						}}
					>
						<TextInput
							style={styles.TextInput}
							keyboardType="decimal-pad"
							onChangeText={OnChangeMontoAPagar}
							onBlur={CalcularNuevoSaldo}
							editable={editable}
							value={String(nMontoAPagar)}
						></TextInput>
					</View>
					<View
						style={{
							marginVertical: 1,
							marginHorizontal: 16,
							flexDirection: "row",
							flexWrap: "wrap",
						}}
					>
						<Text style={styles.boton2} onPress={Regresar}>
							<Icon name="close-outline" size={30} color="#fff" />
						</Text>
						<Text style={styles.boton1} onPress={GuardarPago}>
							<Icon name="checkmark-outline" size={30} color="#fff" />
						</Text>
					</View>
					<View style={{ marginTop: 10 }} />
				</View>
				<AlertaModal
					titulo={tituloModal}
					mensaje={MensajeModal1}
					visible={isAlertVisible}
					onConfirm={ocultarAlertaModal}
				/>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({

	checkedBox: {
		width: 20,
		height: 20,
		backgroundColor: 'green',
	},
	uncheckedBox: {
		width: 20,
		height: 20,
		backgroundColor: 'gray',
	},

	container: {
		backgroundColor: "#fff",
	},
	contenedor: {
		alignSelf: "center",
		height: "100%",
		width: "100%",
		bottom: 1,
		marginBottom: "100%",
		marginTop: 20,
	},
	boton0: {
		width: "50%",
		backgroundColor: "#13A364",
		alignSelf: "center",
	},

	boton1: {
		width: "40%",
		// height: "100%",
		backgroundColor: "#13A364",
		marginLeft: "0%",
		textAlign: "center",
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10,
	},
	boton2: {
		width: "40%",
		// height: "100%",
		backgroundColor: "#CD154A",
		marginLeft: "10%",
		textAlign: "center",
		borderTopLeftRadius: 10,
		borderBottomLeftRadius: 10,
	},
	buttonText: {
		color: "#fff",
		fontSize: 20,
		textAlign: "center",
	},

	icon: {
		position: "absolute",
		top: "85%",
		right: 10,
		backgroundColor: "#1B4F72",
		shadowColor: "black",
		shadowOffset: { width: 2, height: 2 },
		shadowOpacity: 0.5,
	},
	item: {
		height: 0.2,
		width: "100%",
		backgroundColor: "#808080",
	},
	ListItemView: {
		backgroundColor: "white",
		padding: 20,
		borderRadius: 10,
		shadowColor: "black",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5,
	},
	texto: {
		fontSize: 15,
		color: "#3f3844",
		fontWeight: "bold",
	},
	Picker1: {
		width: "47%",
		bottom: 10,
		paddingHorizontal: 30,
		marginRight: 10,
		backgroundColor: "#ebebeb",
		padding: 20,
		borderRadius: 10,
		shadowColor: "black",
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 2,
		color: "gray",
	},

	Picker2: {
		width: "50 %",
		bottom: 10,
		paddingHorizontal: 30,
		backgroundColor: "#ebebeb",
		padding: 20,
		borderRadius: 10,
		shadowColor: "black",
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 2,
		color: "gray",
	},

	PickerTexto: {
		paddingHorizontal: 30,
		marginRight: 10,
	},
	buttonsContainer: {
		flexDirection: "row",
		justifyContent: "flex-end",
		marginTop: 10,
	},
	buttonEdit: {
		backgroundColor: "#007299",
		borderRadius: 5,
		padding: 5,
		marginRight: 10,
	},
	buttonDelete: {
		backgroundColor: "#f00",
		borderRadius: 5,
		padding: 5,
	},
	title: {
		color: "#0033A9",
		fontSize: 30,
		textAlign: "center",
		fontWeight: "bold",
		marginBottom: 10,
	},
	TextInput: {
		width: "100%",
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
		padding: 10,
		fontSize: 50,

		textAlign: "center",
		marginBottom: 10,
	},
	section: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	paragraph: {
		fontSize: 15,
	},
	checkbox: {
		margin: 8,
	},
});

export default PagarCredito_Screen;
