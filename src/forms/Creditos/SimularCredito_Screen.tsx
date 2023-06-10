import React, { useState } from "react";
import {
	View,
	TextInput,
	StyleSheet,
	Text,
	TouchableOpacity,
} from "react-native";
import { configData } from "../../../config";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";
import { convertirFechaAAAAMMDD, formatoFecha } from "../../utils/utils";
import DateTimePicker from "@react-native-community/datetimepicker";
type homeScreenProp = StackNavigationProp<RootStackParamList, "DrawerScreen">;

const SimularCredito_Screen = () => {
	const navigation = useNavigation<homeScreenProp>();
	const [monto, setMonto] = useState("");
	const [cuota, setCuota] = useState("");
	const [cuotaMonto, setCuotaMonto] = useState("");
	const [totalInteres, setTotalInteres] = useState("");
	const [showDatePickerIni, setShowDatePickerIni] = useState<boolean>(false);
	const [fechaPago, setFechaPago] = useState<Date>(new Date());
	let nCuotaMonto = 0;
	let nTotalInteres = 0;

	const cambiarMonto = (text: string) => {
		const nNuevoMonto: string = text ? text : "";

		setMonto(nNuevoMonto);
		generarSimuladorCredito(parseInt(nNuevoMonto), parseInt(cuota));
	};
	const cambiarCuota = (text: string) => {
		const nCantidad = parseFloat(text);
		const nNuevaCuota: number = isNaN(nCantidad) ? 0 : nCantidad;
		setCuota(nNuevaCuota.toString());
		generarSimuladorCredito(parseInt(monto), nNuevaCuota);
	};

	const generarSimuladorCredito = (pmonto: number, pcuota: number) => {
		nCuotaMonto = (pmonto * (1 + configData.nCredTasaInteres)) / pcuota;
		setCuotaMonto(nCuotaMonto === Infinity ? "0" : nCuotaMonto.toString());
		nTotalInteres = pmonto * configData.nCredTasaInteres;
		setTotalInteres(nTotalInteres.toString());
	};

	const VerCronograma = () => {
		const credito = {
			nCuotas: Number(cuota),
			nPeriodo: 4,
			FechaPago: convertirFechaAAAAMMDD(fechaPago),
			nMonto: Number(monto),
			nIdConfig: configData.nConfiguracionID,
			sCliente: "Simulación Crédito",
		};
		const pantalla: string = "SimularCredito_Screen";

		navigation.navigate("ListarCronograma_Screen", { pantalla, credito });
	};

	return (
		<View style={styles.ContenedorPrincipal}>
			<View style={styles.TextInputContenedor}>
				<Text style={styles.TextLabel}>Monto:</Text>
				<TextInput
					style={styles.TextInput}
					value={monto}
					onChangeText={(text) => {
						cambiarMonto(text);
					}}
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
					value={cuota}
					onChangeText={(text) => {
						cambiarCuota(text);
					}}
					keyboardType="decimal-pad"
					placeholder="Ingrese cuotas"
					placeholderTextColor="#D3D3D3"
					textAlignVertical="top"
				/>
			</View>
			<View style={styles.TextInputContenedor}>
				<Text style={styles.TextLabel}>Cuota Mensual:</Text>
				<TextInput
					style={styles.TextInput}
					value={cuotaMonto}
					keyboardType="decimal-pad"
					placeholder="Cuota Mensual"
					placeholderTextColor="#D3D3D3"
					textAlignVertical="top"
					editable={false}
				/>
			</View>
			<View style={styles.TextInputContenedor}>
				<Text style={styles.TextLabel}>Interes generado:</Text>
				<TextInput
					style={styles.TextInput}
					value={totalInteres}
					keyboardType="decimal-pad"
					placeholder="Ingrese cuotas"
					placeholderTextColor="#D3D3D3"
					textAlignVertical="top"
					editable={false}
				/>
			</View>

			<View>
				<Text style={styles.TextLabel}>Fecha Pago:</Text>
				<TouchableOpacity onPress={() => setShowDatePickerIni(true)}>
					<Text style={styles.TextInput}>{formatoFecha(fechaPago.toString())}</Text>
					{showDatePickerIni && (
						<DateTimePicker
							value={fechaPago}
							mode="date"
							display="default"
							onChange={(event, selectedDate) => {
								const currentDate = selectedDate || fechaPago;
								setShowDatePickerIni(false);
								setFechaPago(currentDate);
							}}
						/>
					)}
				</TouchableOpacity>
			</View>
			<TouchableOpacity style={styles.button} onPress={VerCronograma}>
				<Text style={styles.buttonText}>Generar</Text>
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

export default SimularCredito_Screen;
