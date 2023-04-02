import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Cliente } from "../../clases/Cliente";
import { convertirFechaAAAAMMDD, formatoFecha } from "../../utils/utils";

let html = "";
const fechaActual = new Date();
const fecha1Enero = new Date(fechaActual.getFullYear(), 0, 1);

export const ReporteClientes = () => {
	const [fechIni, setFechIni] = useState(fecha1Enero);
	const [fechFin, setFechFin] = useState(new Date());
	const [usuID, setUsuID] = useState(1);

	const [showDatePickerIni, setShowDatePickerIni] = useState(false);
	const [showDatePickerFin, setShowDatePickerFin] = useState(false);
	const print = async () => {
		await GenerarHTMLReporteCliente();
		await Print.printAsync({
			html,
		});
	};

	// const printToFile = async () => {
	// 	// On iOS/android prints the given html. On web prints the HTML from the current page.
	// 	const { uri } = await Print.printToFileAsync({ html });
	// 	console.log("File has been saved to:", uri);
	// 	await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
	// };

	const GenerarHTMLReporteCliente = async () => {
		let cliente: Cliente = new Cliente();

		let response = await cliente.ReporteClienteRango(
			usuID,
			convertirFechaAAAAMMDD(fechIni),
			convertirFechaAAAAMMDD(fechFin)
		);

		const htmlCabecera = `
		<html>
			<head>
				<title>Ejemplo de tabla con HTML y CSS</title>
				<style>
					table {
						border-collapse: collapse;
						width: 100%;
						background-color: #f5f5f5;
					}
					thead tr {
						background-color: #5cb85c;
						color: #fff;
					}
					
					th {
						padding: 8px 2px;
						border: 1px solid #ddd;
						font-size: 0.7em;
						font-weight: bold;
						text-align: center;
					}
					
					td {
						padding: 8px 2px;
						border: 1px solid #ddd;
						font-size: 0.7em;
					}
					
					tbody tr:nth-child(even) {
						background-color: #e3e3e3;
					}
					
					tbody tr:hover {
						background-color: #ddd;
					}
					
					.left {
						text-align: left;
					}
					.right {
						text-align: right;
					}
					.center {
						text-align: center;
					}
				</style>
			</head>
			<body>
				<h1>Reporte de Clientes</h1>
				<table>
					<thead>
					<tr>
						<th>Fecha de creación</th>
						<th>DNI</th>
						<th>Nombre</th>
						<th>Apellido</th>
						<th>Dirección</th>
						<th>Teléfono</th>
						<th>Fecha de nacimiento</th>
						<th>Estado</th>
					</tr>
					</thead>
					<tbody>
					`;
		let html_dinamico: string = "";

		response.data.forEach(function (element: any) {
			html_dinamico =
				html_dinamico +
				`<tr>
					<td class="center"> ${formatoFecha(element.dClieFechaCreacion)}</td>
					<td class="right">${element.cClieDNI}</td>
					<td class="left">${element.cClieNombres}</td>
					<td class="left">${element.cClieApellidos}</td>
					<td class="left">${element.cClieDireccion}</td>
					<td class="rigth">${element.cClieTelefono}</td>
					<td class="center">${formatoFecha(element.cClieFechNac)}</td>
					<td class="center">${element.nClieEstado}</td>				
				</tr>`;
		});

		const htmlPie = `	</tbody>
							</table>
						</body>
					</html>`;

		html = htmlCabecera + html_dinamico + htmlPie;
	};

	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.TextLabel}>Fecha Inicio:</Text>
				<TouchableOpacity onPress={() => setShowDatePickerIni(true)}>
					<Text style={styles.TextInput}>{formatoFecha(fechIni.toString())}</Text>
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
					<Text style={styles.TextInput}>{formatoFecha(fechFin.toString())}</Text>
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
