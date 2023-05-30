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
import { configData } from "../../../config";
import { convertirFechaAAAAMMDD, formatoFecha } from "../../utils/utils";
import DateTimePicker from "@react-native-community/datetimepicker";

const RegistrarCredito_Screen = ({ route }: any) => {
	const [options, setOptions] = useState([]);
	const navigation = useNavigation();

	const [selectedValue, setSelectedValue] = useState(0);

	const [nIdPers, SETnIdPers] = useState(0);
	const [dni, SETcDNI] = useState("");
	const [nombre, SETcNombre] = useState("");
	const [nMonto, SetnMonto] = useState("");

	const [nInteres, SetnInteres] = useState("");
	const [nCuotas, SetnCuotas] = useState("");

	const [dFechaCred, SETdFechaCredito] = useState(new Date());
	const [showDatePicker, setShowDatePicker] = useState(false);

	const ListarPeriodos = async () => {
		const dCred = new Creditos();
		const DatosPeriodos = await dCred.ListarCreditosPeriodos();
		if (DatosPeriodos.success) {
			setOptions(DatosPeriodos.data);
		}
	};

	useEffect(() => {
		if (route.params && route.params.item) {
			const persona = route.params.item;
			SETnIdPers(persona.nClieID);
			SETcDNI(persona.cClieDNI);
			SETcNombre(`${persona.cClieNombres} ${persona.cClieApellidos}`);
		}

		ListarPeriodos();
	}, [route.params]);

	const GuardarCredito = async () => {
		const _dCred = new Creditos(
			0,
			nIdPers,
			convertirFechaAAAAMMDD(dFechaCred),
			selectedValue,
			parseInt(nMonto),
			parseInt(nInteres),
			0,
			parseInt(nCuotas),
			"",
			0,
			0,
			0,
			0,
			configData.nUsuId,
			configData.nCredRutasID
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
		<View style={styles.ContenedorPrincipal}>
			<View style={styles.TextInputContenedor}>
				<Text style={styles.TextLabel}>DNI:</Text>
				<TextInput
					style={styles.TextInput}
					value={dni}
					onChangeText={SETcDNI}
					keyboardType="number-pad"
					placeholder="Ingrese dni"
					placeholderTextColor="#D3D3D3"
					textAlignVertical="top"
				/>
			</View>
			<View style={styles.TextInputContenedor}>
				<Text style={styles.TextLabel}>Nombre:</Text>
				<TextInput
					style={styles.TextInput}
					value={nombre}
					onChangeText={SETcNombre}
					placeholder="Ingrese nombre"
					placeholderTextColor="#D3D3D3"
					textAlignVertical="top"
				/>
			</View>
			<View style={styles.TextInputContenedor}>
				<Text style={styles.TextLabel}>Fecha Prestamo:</Text>
				<TouchableOpacity onPress={() => setShowDatePicker(true)}>
					<Text style={styles.TextInput}>{formatoFecha(dFechaCred.toString())}</Text>
					{showDatePicker && (
						<DateTimePicker
							value={dFechaCred}
							mode="date"
							display="default"
							onChange={(event, selectedDate) => {
								const currentDate = selectedDate || dFechaCred;
								setShowDatePicker(false);
								SETdFechaCredito(currentDate);
							}}
						/>
					)}
				</TouchableOpacity>
			</View>
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
			<View style={styles.TextInputContenedor}>
				<Text style={styles.TextLabel}>Monto:</Text>
				<TextInput
					style={styles.TextInput}
					value={nMonto}
					onChangeText={SetnMonto}
					keyboardType="decimal-pad"
					placeholder="Ingrese monto"
					placeholderTextColor="#D3D3D3"
					textAlignVertical="top"
				/>
			</View>
			<View style={styles.TextInputContenedor}>
				<Text style={styles.TextLabel}>Cuotas:</Text>
				<TextInput
					style={styles.TextInput}
					value={nCuotas}
					onChangeText={SetnCuotas}
					keyboardType="decimal-pad"
					placeholder="Ingrese cuotas"
					placeholderTextColor="#D3D3D3"
					textAlignVertical="top"
				/>
			</View>

			<TouchableOpacity style={styles.button} onPress={GuardarCredito}>
				<Text style={styles.buttonText}>Guardar</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	ContenedorPrincipal: {
		flex: 1,
		backgroundColor: "#fff",
		padding: 20,
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
		fontSize: 18,
		fontWeight: "bold",
	},
});

export default RegistrarCredito_Screen;
