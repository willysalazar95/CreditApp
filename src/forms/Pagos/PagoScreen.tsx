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


import { convertirFechaAAAAMMDD, formatoFecha } from "../../utils/utils";

import DateTimePicker from "@react-native-community/datetimepicker";

function PagoScreen() {

  const [fechaInicio, setFechaInicio] = useState(new Date());
  const [fechaFin, setFechaFin] = useState(new Date());
	const [showDatePicker, setShowDatePicker] = useState(false);


  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
     
      <Text style={styles.TextLabel}>Desde:</Text>
					<TouchableOpacity onPress={() => setShowDatePicker(true)}>
						<Text style={styles.TextInput}>{formatoFecha(fechaInicio.toString())}</Text>
						{showDatePicker && (
							<DateTimePicker
								value={fechaInicio}
								mode="date"
								display="default"
								onChange={(event, selectedDate) => {
									const currentDate = selectedDate || fechaInicio;
									setShowDatePicker(false);
									setFechaInicio(currentDate);
								}}
							/>
						)}
					</TouchableOpacity>
          <Text style={styles.TextLabel}>Hasta:</Text>
					<TouchableOpacity onPress={() => setShowDatePicker(true)}>
						<Text style={styles.TextInput}>{formatoFecha(fechaFin.toString())}</Text>
						{showDatePicker && (
							<DateTimePicker
								value={fechaFin}
								mode="date"
								display="default"
								onChange={(event, selectedDate) => {
									const currentDate = selectedDate || fechaFin;
									setShowDatePicker(false);
									setFechaFin(currentDate);
								}}
							/>
						)}
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
})
export default PagoScreen;
