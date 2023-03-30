import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import DateTimePicker from "@react-native-community/datetimepicker";

const html = `
<html>
  <head>
    <title>Ejemplo de tabla con HTML y CSS</title>
    <style>
      table {
        border-collapse: collapse;
        width: 100%;
      }
      th, td {
        text-align: left;
        padding: 8px;
        border-bottom: 1px solid #ddd;
      }
      th {
        background-color: #f2f2f2;
      }
    </style>
  </head>
  <body>
    <h1>Reporte de Clientes</h1>
    <table>
      <thead>
        <tr>
          <th>DNI</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Dirección</th>
          <th>Teléfono</th>
          <th>Fecha de nacimiento</th>
          <th>Estado</th>
          <th>Fecha de creación</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>12345678</td>
          <td>Juan</td>
          <td>Pérez</td>
          <td>Calle 123</td>
          <td>1234567</td>
          <td>01/01/2000</td>
          <td>Activo</td>
          <td>01/01/2022</td>
        </tr>
        <tr>
          <td>87654321</td>
          <td>María</td>
          <td>García</td>
          <td>Avenida 456</td>
          <td>7654321</td>
          <td>15/05/1998</td>
          <td>Inactivo</td>
          <td>01/02/2022</td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
`;

export const ReporteClientes = () => {
	const [fechIni, setFechIni] = useState(new Date());
	const [fechFin, setFechFin] = useState(new Date());

	const [showDatePickerIni, setShowDatePickerIni] = useState(false);
	const [showDatePickerFin, setShowDatePickerFin] = useState(false);
	const print = async () => {
		await Print.printAsync({
			html,
		});
	};

	const printToFile = async () => {
		// On iOS/android prints the given html. On web prints the HTML from the current page.
		const { uri } = await Print.printToFileAsync({ html });
		console.log("File has been saved to:", uri);
		await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
	};

	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.TextLabel}>Fecha Inicio:</Text>
				<TouchableOpacity onPress={() => setShowDatePickerIni(true)}>
					<Text style={styles.TextInput}>
						{fechIni.toLocaleDateString("es-ES", {
							day: "2-digit",
							month: "2-digit",
							year: "numeric",
						})}
					</Text>
					{showDatePickerIni && (
						<DateTimePicker
							value={fechIni}
							mode="date"
							display="default"
							onChange={(event, selectedDate) => {
								const currentDate = selectedDate || fechIni;
								setShowDatePickerIni(false);
								setFechIni(currentDate);
							}}
						/>
					)}
				</TouchableOpacity>
			</View>
			<View>
				<Text style={styles.TextLabel}>Fecha Fin:</Text>
				<TouchableOpacity onPress={() => setShowDatePickerFin(true)}>
					<Text style={styles.TextInput}>
						{fechFin.toLocaleDateString("es-ES", {
							day: "2-digit",
							month: "2-digit",
							year: "numeric",
						})}
					</Text>
					{showDatePickerFin && (
						<DateTimePicker
							value={fechFin}
							mode="date"
							display="default"
							onChange={(event, selectedDate) => {
								const currentDate = selectedDate || fechFin;
								setShowDatePickerFin(false);
								setFechFin(currentDate);
							}}
						/>
					)}
				</TouchableOpacity>
			</View>

			<TouchableOpacity style={styles.button} onPress={print}>
				<Text style={styles.buttonText}>IMPRIMIR</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	date: {
		fontSize: 20,
		fontWeight: "bold",
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
});
