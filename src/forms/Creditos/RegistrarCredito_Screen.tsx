import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	TouchableOpacity,
	Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { Creditos } from "../../clases/Creditos";

const RegistrarCredito_Screen = ({ route }: any) => {
	const [options, setOptions] = useState([]);
	const [selectedOption, setSelectedOption] = useState("");
	const navigation = useNavigation();

	const [selectedValue, setSelectedValue] = useState(0);

	const [nIdPers, SETnIdPers] = useState(0);
	const [dni, SETcDNI] = useState("");
	const [nombre, SETcNombre] = useState("");
	const [dFechaCred, SETdFechaCredito] = useState("");
	const [nIdPeriodo, SetnIdPeriodo] = useState("");
	const [nMonto, SetnMonto] = useState("");
	const [nInteres, SetnInteres] = useState("");
	const [nCuotas, SetnCuotas] = useState("");

	const ListarPeriodos = async () => {
		const dCred = new Creditos();
		const DatosPeriodos = await dCred.ListarCreditosPeriodos();
		console.log(DatosPeriodos.data);
		if (DatosPeriodos.success) {
			setOptions(DatosPeriodos.data);
		}
	};

	useEffect(() => {
		if (route.params && route.params.item) {
			const persona = route.params.item;
			SETnIdPers(persona.nClieID);
			SETcDNI(persona.cClieDNI);
			SETcNombre(persona.cClieNombres);
		}

		ListarPeriodos();
	}, [route.params]);

	const GuardarCredito = async () => {
		const _dCred = new Creditos(
			0,
			nIdPers,
			dFechaCred,
			selectedValue,
			parseInt(nMonto),
			parseInt(nInteres),
			0,
			parseInt(nCuotas),
			"",
			0,
			0,
			0,
			0
		);
		const response = await _dCred.RegistroCredito();
		if (response.success) {
			Alert.alert("OK", "Crédito registrado Correctamente!");
			navigation.goBack();
		} else {
			Alert.alert("ERROR", response.error);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.inputContainer}>
				<Text style={styles.label}>DNI:</Text>
				<TextInput
					style={styles.input}
					value={dni}
					onChangeText={SETcDNI}
					keyboardType="number-pad"
				/>
			</View>
			<View style={styles.inputContainer}>
				<Text style={styles.label}>Nombre:</Text>
				<TextInput style={styles.input} value={nombre} onChangeText={SETcNombre} />
			</View>
			<View style={styles.inputContainer}>
				<Text style={styles.label}>Fecha Prestamo:</Text>
				<TextInput
					style={styles.input}
					value={dFechaCred}
					onChangeText={SETdFechaCredito}
				/>
			</View>
			<View style={styles.inputContainer}>
				<Text style={styles.label}>Periodo:</Text>
				<Picker
					selectedValue={selectedValue}
					onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
				>
					{/* <Picker.Item label="--Selecciona--" value="" /> */}
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
			<View style={styles.inputContainer}>
				<Text style={styles.label}>Monto:</Text>
				<TextInput
					style={styles.input}
					value={nMonto}
					onChangeText={SetnMonto}
					keyboardType="decimal-pad"
				/>
			</View>
			<View style={styles.inputContainer}>
				<Text style={styles.label}>Interes:</Text>
				<TextInput
					style={styles.input}
					value={nInteres}
					onChangeText={SetnInteres}
					keyboardType="decimal-pad"
				/>
			</View>
			<View style={styles.inputContainer}>
				<Text style={styles.label}>Cuotas:</Text>
				<TextInput
					style={styles.input}
					value={nCuotas}
					onChangeText={SetnCuotas}
					keyboardType="decimal-pad"
				/>
			</View>

			<TouchableOpacity style={styles.button} onPress={GuardarCredito}>
				<Text style={styles.buttonText}>Guardar</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	buttonText: {
		color: "#FFF",
		fontSize: 18,
		fontWeight: "bold",
	},
	// button: {
	//     backgroundColor: '#007299',
	//     borderRadius: 30,
	//     width: 60,
	//     height: 60,
	//     margin: 10,
	//     alignItems: 'center',
	//     justifyContent: 'center',
	//     elevation: 3,
	//     position: 'absolute',
	//     bottom: 10,
	//     right: 10,
	//     zIndex: 1,
	// },
	button: {
		backgroundColor: "#5cb85c",
		padding: 10,
		borderRadius: 5,
		alignItems: "center",
	},
	text: {
		fontSize: 24,
		color: "white",
		fontWeight: "bold",
	},
	container: {
		flex: 1,
		backgroundColor: "#fff",
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
	},
	inputContainer: {
		marginBottom: 10,
	},
	label: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 5,
	},
	input: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
		padding: 10,
		fontSize: 16,
	},
});

export default RegistrarCredito_Screen;
