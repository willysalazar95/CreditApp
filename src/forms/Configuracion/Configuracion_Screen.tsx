import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";

import moment from "moment";
import { Configuracion, Datos } from "../../clases/Configuracion";

const Configuracion_Screen = () => {
	const [RUC, SETRuc] = useState("");
	const [RazonSocial, SETRazonSocial] = useState("");
	const [Direccion, SETDireccion] = useState("");
	const [Telefono, SETTelefono] = useState("");
	const [TasaInteres, SETTasaInteres] = useState("");
	const [TasaMora, SETTasaMora] = useState("");

	const handleGuardar = async () => {
		try {
			const persona = new Configuracion(
				RUC,
				RazonSocial,
				Direccion,
				Telefono,
				parseInt(TasaInteres),
				parseInt(TasaMora)
			);
			const response = await persona.RegistrarConfiguracion();

			if (response.success) {
				console.log("Persona guardada exitosamente", response.data);
			} else {
				console.log("ERROR", response.error);
			}
		} catch (error: any) {
			console.log("ERROR", error.message);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.formulario}>
				<Text style={styles.label}>RUC</Text>
				<TextInput
					style={styles.input}
					value={RUC}
					onChangeText={SETRuc}
					keyboardType="numeric"
					maxLength={8}
				/>

				<Text style={styles.label}>RAZON SOCIAL</Text>
				<TextInput 
					style={styles.input} 
					value={RazonSocial} 
					onChangeText={SETRazonSocial} 
				/>

				<Text style={styles.label}>Direccion</Text>
				<TextInput
					style={styles.input}
					value={Direccion}
					onChangeText={SETDireccion}
				/>

				<Text style={styles.label}>Telefono</Text>
				<TextInput
					style={styles.input}
					value={Telefono}
					keyboardType="numeric"
					maxLength={9}
					onChangeText={SETTelefono}
				/>

				<Text style={styles.label}>Tasa Interes</Text>
				<TextInput
					style={styles.input}
					value={TasaInteres}
					onChangeText={SETTasaInteres}
					keyboardType="phone-pad"
					maxLength={10}
				/>

				<Text style={styles.label}>Tasa Mora</Text>
				<TextInput
					style={styles.input}
					value={TasaMora}
					onChangeText={SETTasaMora}
					keyboardType="phone-pad"
					maxLength={10}
				/>

				<Button title="Guardar" onPress={handleGuardar} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		padding: 20,
	},
	titulo: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
	},
	formulario: {
		backgroundColor: "#f9f9f9",
		padding: 20,
		borderRadius: 10,
	},
	label: {
		fontSize: 18,
		marginBottom: 5,
	},
	input: {
		fontSize: 16,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
		padding: 10,
		marginBottom: 20,
	},
});

export default Configuracion_Screen;
