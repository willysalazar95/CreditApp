import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { configData } from "../../../config";
import { Usuario } from "../../clases/Usuario";

export const CambiarContrasenia_Screen = () => {
	const [contraseniaActual, setContraseniaActual] = useState("");
	const [contraseniaNueva, setContraseniaNueva] = useState("");
	const [confirmarContraseniaNueva, setConfirmarContraseniaNueva] = useState("");

	const cambiarContrasenia = async () => {
		//validar las contrasenias
		const usuario = new Usuario();
		const idUsuario: number = configData.nUsuId;

		const data = await usuario.ListarUsuario(idUsuario);

		let constraseniaBase: string = data.data[0].cUsuClave;

		if (!contraseniaActual || !contraseniaNueva || !confirmarContraseniaNueva) {
			Alert.alert("ALERTA", "Complete los campos");
			return;
		}

		if (contraseniaActual !== constraseniaBase) {
			Alert.alert("ALERTA", "La contraseña Actual no es la correcta");
			return;
		}

		if (contraseniaNueva !== confirmarContraseniaNueva) {
			Alert.alert("ALERTA", "Las nuevas contraseñas no coinciden");
			return;
		}

		if (contraseniaActual === confirmarContraseniaNueva) {
			Alert.alert(
				"ALERTA",
				"La contraseña nueva no puede ser la misma que la actual"
			);
			return;
		}

		//si pasa todo bien cambiar contrasenia
		const cambio = await usuario.CambiarClave(
			idUsuario,
			confirmarContraseniaNueva
		);

		if (cambio.success) {
			Alert.alert("OK", "Se cambió la clave correctamente !!");

			limpiarContrasenias();
		}
	};

	const limpiarContrasenias = () => {
		setContraseniaActual("");
		setContraseniaNueva("");
		setConfirmarContraseniaNueva("");
	};

	return (
		<View style={styles.container}>
			<Text style={styles.textLabel}>Contraseña Actual</Text>
			<TextInput
				style={styles.textInput}
				value={contraseniaActual}
				onChangeText={setContraseniaActual}
				placeholder="Ingrese Contraseña Actual"
				keyboardType="default"
				placeholderTextColor="#D3D3D3"
				textAlignVertical="center"
				secureTextEntry={true}
			/>
			<Text style={styles.textLabel}>Contraseña Nueva</Text>
			<TextInput
				style={styles.textInput}
				value={contraseniaNueva}
				onChangeText={setContraseniaNueva}
				placeholder="Ingrese Contraseña Nueva"
				keyboardType="default"
				placeholderTextColor="#D3D3D3"
				textAlignVertical="center"
				secureTextEntry={true}
			/>
			<Text style={styles.textLabel}>Confirmar Contraseña Nueva</Text>
			<TextInput
				style={styles.textInput}
				value={confirmarContraseniaNueva}
				onChangeText={setConfirmarContraseniaNueva}
				placeholder="Confire Contraseña Nueva"
				keyboardType="default"
				placeholderTextColor="#D3D3D3"
				textAlignVertical="center"
				secureTextEntry={true}
			/>

			<TouchableOpacity style={styles.button} onPress={cambiarContrasenia}>
				<Text style={styles.textButton}>Cambiar Contraseña</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 20,
		display: "flex",
		flexDirection: "column",
	},
	textLabel: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 5,
	},
	textInput: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
		padding: 10,
		fontSize: 16,
		height: 50,
		marginBottom: 15,
	},
	button: {
		padding: 10,
		borderRadius: 5,
		alignItems: "center",
		backgroundColor: "#5cb85c",
		height: 50,
	},
	textButton: {
		color: "#fff",
		fontSize: 20,
		fontWeight: "bold",
	},
});
