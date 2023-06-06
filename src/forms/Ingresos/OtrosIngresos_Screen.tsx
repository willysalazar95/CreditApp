import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { OtrosIngresos } from "../../clases/OtrosIngresos";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";
import AlertaModal from "../../utils/AlertModal";
import { Option, SelectControl } from "../../Components/SelectControl";
import { Constantes } from "../../clases/Constantes";
import { TextInputControl } from "../../Components/TextInputControl";
import { TextInputDateControl } from "../../Components/TextInputDate";
import { ButtonSendControl } from "../../Components/ButtonSendControl";
import { convertirFechaAAAAMMDD } from "../../utils/utils";

import Icon from "react-native-vector-icons/FontAwesome";

type homeScreenProp = StackNavigationProp<RootStackParamList, "DrawerScreen">;
//CREADO POR AAGC

const OtrosIngresos_Screen = ({ route }: any) => {
	const navigation = useNavigation<homeScreenProp>();

	useEffect(() => {
		ListarTipoIngreso();
	}, []);

	const handleEnviar = async () => {
		const datOtrosIngresos = new OtrosIngresos(
			0,
			nClieID,
			convertirFechaAAAAMMDD(fecha),
			tipoIngreso,
			Number(monto)
		);
		const response = await datOtrosIngresos.grabarOtrosIngresos();

		if (response.success) {
			setTituloModal("MyBankito");
			setMensajeModal1("Registro actualizado ");
			setAlertVisible(true);
			setAlertVisible(true);
		} else {
			//Alert.alert("ERROR", response.error);
			setTituloModal("MyBankito");
			setMensajeModal1("ERROR" + response.error);
			setAlertVisible(true);
		}
		//Para que funcione la ventana modal
		console.log(MensajeModal1);
	};

	const abrirMapa = () => {
		navigation.navigate("Mapa_Screen", { item: "" });
	};
	const [nClieID, setnClieID] = useState(0);
	const [cDni, setcDni] = useState("");
	const [cNombre, setcNombre] = useState("");
	const [tipoIngreso, setTipoIngreso] = useState(0);
	const [fecha, setFecha] = useState(new Date());
	const [monto, setMonto] = useState("");


	//Inicio Ventana Modal - Prueba
	const [MensajeModal1, setMensajeModal1] = useState("");
	const [isAlertVisible, setAlertVisible] = useState(false);
	const [tituloModal, setTituloModal] = useState("");
	const [alertMessage, setAlertMessage] = useState("");
	const [options, setOptions] = useState<Option[]>([]);

	const ocultarAlertaModal = () => {
		setAlertVisible(false);
	};

	const ListarTipoIngreso = async () => {
		const dCred = new Constantes("1003");
		const Datos = await dCred.ObtenerConstante();

		if (Datos.success) {
			const arrayOpciones: Option[] = [];

			Datos.data.forEach((dato: any) => {
				arrayOpciones.push({
					label: dato.cConsDescripcion,
					value: dato.nConsValor,
				});
			});

			setOptions(arrayOpciones);
		}
	};

	useEffect(() => {
		if (route.params && route.params.item) {
			const persona = route.params.item;
			setnClieID(persona.nClieID);
			setcDni(persona.cClieDNI);
			setcNombre(`${persona.cClieNombres} ${persona.cClieApellidos}`);
		}

		//ListarPeriodos();
	}, [route.params]);

	const SelecCliente = () => {
		navigation.navigate("ListarPersonas", { pantalla: "ingresos" });
		navigation.setOptions({ title: "Seleccione un cliente" });
	};

	return (
		<View style={styles.ContenedorPrincipal}>
			<View style={styles.ContenedorSearch}>
				<View style={styles.TextInputSearch}>
					<TextInputControl
						style={styles.InputMargin}
						title="DNI:"
						placeholder="Ingrese DNI"
						keyboardType="numeric"
						functionChangeText={setcDni}
						value={cDni}
						maxLength={8}
					/>
				</View>
				<TouchableOpacity
					style={styles.BotonAgregar}
					onPress={SelecCliente}
				>
					<Icon name="plus" size={24} color="#FFF" />
				</TouchableOpacity>
			</View>
			<TextInputControl
				style={styles.InputMargin}
				title="Nombre:"
				placeholder="Ingrese Nombre"
				keyboardType="default"
				functionChangeText={setcNombre}
				value={cNombre}
			/>
			<SelectControl
				style={styles.InputMargin}
				title="Tipo Ingreso:"
				options={options}
				value={tipoIngreso}
				functionValueChange={(itemValue) => setTipoIngreso(itemValue)}
			/>
			{/*
                        <View style={styles.TextInputContenedor}>
                            <Text style={styles.TextLabel}>Periodo:</Text>
                            <Picker
                                selectedValue={selectedValue}
                                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                            >
                                {options.map((item: any, index) => {
                                    return (
                                        <Picker.Item
                                            label={item.cPerDescripcion}
                                            value={item.nPerID}
                                            key={index}
                                        />
                                    );
                                })}
                            </Picker>
                        </View>
                        */}

			<TextInputControl
				style={styles.InputMargin}
				title="Monto:"
				placeholder="Ingrese monto"
				keyboardType="decimal-pad"
				functionChangeText={setMonto}
				value={monto}
			/>
			<TextInputDateControl
				title="Fecha:"
				value={fecha}
				functionChange={setFecha}
			/>

			<ButtonSendControl
				style={{ marginTop: 20 }}
				title="Grabar"
				functionSend={handleEnviar}
			/>

			{/* <AlertaModal
					titulo={tituloModal}
					mensaje={MensajeModal1}
					visible={isAlertVisible}
					onConfirm={ocultarAlertaModal}
				/> */}
		</View>
	);
};

const styles = StyleSheet.create({
	ContenedorPrincipalSearch: {
		flex: 1,
	},
	ContenedorSearch: {
		flexDirection: "row",
		marginHorizontal: 10,
		marginVertical: 5,
	},
	TextInputSearch: {
		flex: 1,
		marginRight: 5,
		borderRadius: 10,
		backgroundColor: "#FFF",
		paddingHorizontal: 10,
	},
	BotonAgregar: {
		backgroundColor: "orange",
		width: 50,
		height: 40,
		borderRadius: 5,
		alignItems: "center",
		justifyContent: "center",
	},
	ContenedorPrincipal: {
		flex: 1,
		backgroundColor: "#F3F8FC",
		padding: 20,
	},
	TituloContenedor: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
		color: "#5cb85c",
	},
	TextInputContenedor: {
		marginBottom: 10,
	},
	TextLabel: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 5,
	},
	TextInput: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
		padding: 10,
		fontSize: 16,
	},
	button: {
		backgroundColor: "#5cb85c",
		padding: 10,
		borderRadius: 5,
		alignItems: "center",
		marginTop: 20,
		height: 50,
	},
	buttonText: {
		color: "#FFF",
		fontSize: 20,
		fontWeight: "bold",
	},
	buttonMapa: {
		backgroundColor: "#F44336",
		padding: 10,
		borderRadius: 5,
		alignItems: "center",
		marginTop: 20,
		height: 50,
	},
	buttonMapaText: {
		color: "#FFF",
		fontSize: 20,
		fontWeight: "bold",
	},
	InputMargin: {
		marginBottom: 10,
	},
});
export default OtrosIngresos_Screen;
