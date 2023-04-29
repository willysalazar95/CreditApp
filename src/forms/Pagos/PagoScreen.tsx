import React,{useState, useEffect } from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	Alert,
	ScrollView,
} from "react-native";


import Icon from "react-native-vector-icons/FontAwesome";
import { convertirFechaAAAAMMDD, formatoFecha } from "../../utils/utils";

import DateTimePicker from "@react-native-community/datetimepicker";

function PagoScreen() {

  const [fechaInicio, setFechaInicio] = useState(new Date());
  const [fechaFin, setFechaFin] = useState(new Date());
	const [showDatePickerInicio, setShowDatePickerinicio] = useState(false);
	
	const [showDatePickerFin, setShowDatePickerFin] = useState(false);
	const BuscarPagos = async () => {
		/*
		const DatCliente = new Cliente();
		const response = await DatCliente.ListarCliente();
		const filteredData = response.data.filter((item: any) => {
			return item.cClieNombres.toLowerCase().includes(query.toLowerCase());
		});
		setPersonas(filteredData);
		 */
	};

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
     
      <Text style={styles.TextLabel}>Desde:</Text>
					<TouchableOpacity onPress={() => setShowDatePickerinicio(true)}>
						<Text style={styles.TextInput}>{formatoFecha(fechaInicio.toString())}</Text>
						{showDatePickerInicio && (
							<DateTimePicker
								value={fechaInicio}
								mode="date"
								display="default"
								onChange={(event, selectedDate) => {
									const currentDate = selectedDate || fechaInicio;
									setShowDatePickerinicio(false);
									setFechaInicio(currentDate);
								}}
							/>
						)}
					</TouchableOpacity>
          <Text style={styles.TextLabel}>Hasta:</Text>
					<TouchableOpacity onPress={() => setShowDatePickerFin(true)}>
						<Text style={styles.TextInput}>{formatoFecha(fechaFin.toString())}</Text>
						{showDatePickerFin && (
							<DateTimePicker
								value={fechaFin}
								mode="date"
								display="default"
								onChange={(event, selectedDate) => {
									const currentDate = selectedDate || fechaFin;
									setShowDatePickerFin(false);
									setFechaFin(currentDate);
								}}
							/>
						)}
					</TouchableOpacity>
					<TouchableOpacity style={styles.BotonSearch} onPress={BuscarPagos}>
					<Icon name="search" size={24} color="#FFF" />
				</TouchableOpacity>
    </View>
  );

              }
const styles = StyleSheet.create({
	ContenedorPrincipal: {
		flex: 1,
		backgroundColor: "#fff",
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
	BotonSearch: {
		backgroundColor: "#5cb85c",
		width: 50,
		height: 40,
		borderRadius: 5,
		alignItems: "center",
		justifyContent: "center",
	},
})
export default PagoScreen;
