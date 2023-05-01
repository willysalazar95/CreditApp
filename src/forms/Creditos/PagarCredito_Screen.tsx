import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	Alert,
	View,
	ScrollView,
} from "react-native";
import ResultCalculationsPago from "../../Components/ResultCalculationsPago";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { Creditos } from "../../clases/Creditos";
import { RootStackParamList } from "../../../App";
import { StackNavigationProp } from "@react-navigation/stack";
import { CreditosCronogramas } from "../../clases/CreditosCronogramas";

type homeScreenProp = StackNavigationProp<RootStackParamList, "DrawerScreen">;

const PagarCredito_Screen = ({ route }: any) => {
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
	const [dCronoFechaVencimiento, setDCronoFechaVencimiento] = useState(
		new Date().toString()
	);

	const ObtenerPago = async () => {
		const cc = new CreditosCronogramas();
		const response = (await cc.ObtenerPago(idCredito)).data[0];

		const { nCronoID, nCronoCuota, nCronoMonto, dCronoFechaVencimiento } =
			response;

		const { cClieNombres, cClieApellidos } = response.cliente;
		const { nCredMonto, nCredMontoInteres, nCredNroCuotas, nCredMontoPagado } =
			response.credito;

		const { cPerDescripcion } = response.periodo;

		let calcSaldoAnterior = 0;

		calcSaldoAnterior = nCredMonto + nCredMontoInteres - nCredMontoPagado;

		setCPersNombre(cClieNombres + " " + cClieApellidos);
		setNMontoPrestado(nCredMonto);

		setNSaldoAnterior(calcSaldoAnterior);
		setNMontoInteres(nCredMontoInteres);
		setNTotalCuotas(nCredNroCuotas);
		setNIdCredito(idCredito);

		let nMontoPag = 0;
		nMontoPag = (nCredMonto + nCredMontoInteres) / nCredNroCuotas;
		console.log(nCredMonto, nCredMontoInteres, nCredNroCuotas, nCronoMonto);

		setNMontoAPagar(String(nMontoPag.toFixed(2)));
		setNPagoCuota(nMontoPag);
		setNNuevoSaldo(calcSaldoAnterior - nMontoPag);

		setNCronoCuota(nCronoCuota);
		setNCronoMonto(nCronoMonto);
		setCPerDescripcion(cPerDescripcion);
		setNCredNroCuotas(nCredNroCuotas);
		setDCronoFechaVencimiento(dCronoFechaVencimiento);
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
			0
		);
		const response = await _dCred.RegistroCreditoPago();
		if (response.success) {
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

			// navigation.goBack();
		} else {
			Alert.alert("ERROR", response.error);
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
						nSaldoPendiente={nSaldoAnterior}
						nNuevoSaldo={nNuevoSaldo}
						nProxCuota={nCronoCuota}
						nCantCuotas={nCredNroCuotas}
						cModalidadPago={cPerDescripcion}
						dCronoFechaVencimiento={dCronoFechaVencimiento}
						nPagoCuota={nPagoCuota}
						errorMessage={""}
					/>

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
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
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
});

export default PagarCredito_Screen;
