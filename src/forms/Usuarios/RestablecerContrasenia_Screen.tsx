import { Text, View, StyleSheet, Alert } from "react-native";
import { ButtonSendControl } from "../../Components/ButtonSendControl";
import { useState } from "react";
import { TextInputPasswordControl } from "../../Components/TextInputPasswordControl";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";
import { useNavigation } from "@react-navigation/native";

type homeScreenProp = StackNavigationProp<RootStackParamList, "DrawerScreen">;

export const RestablecerContrasenia_Screen = () => {
	const navigation = useNavigation<homeScreenProp>();
	const [hidePass, setHidePass] = useState(true);
	const [hidePass2, setHidePass2] = useState(true);
	const [contrasenia, setContrasenia] = useState("");
	const [confirmacion, setConfirmacion] = useState("");

	const funcionRestablecerContrasenia = () => {
		if (!contrasenia || !confirmacion) {
			Alert.alert("ALERTA", "Ingrese todos los datos");
			return;
		}
		if (!(contrasenia === confirmacion)) {
			Alert.alert("ALERTA", "las contraseñas deben ser iguales, verificar");
			return;
		}

		if (!cambiarContrasenia()) {
			Alert.alert(
				"ALERTA",
				"Hubo un error al cambiar contraseña, volver a intentar mas tarde"
			);
			return;
		}
		goToLogin();
	};

	const cambiarContrasenia = (): boolean => {
		return true;
	};
	const goToLogin = () => {
		navigation.navigate("Login");
	};
	return (
		<View style={styles.Container}>
			<Text style={[styles.TituloContenedor, { color: "#6E955C" }]}>
				Restablecer Contraseña
			</Text>

			<Text style={{ marginTop: 10, color: "#808080" }}>
				Introduce la nueva contraseña que utilizarás para tu inicio de sesión
			</Text>
			<TextInputPasswordControl
				style={{ marginTop: 10 }}
				title="Contraseña"
				placeholder="Ingrese constraseña"
				value={contrasenia}
				functionChangeText={setContrasenia}
				activePassword={hidePass}
				functionActivePassword={() => setHidePass(!hidePass)}
			/>
			<TextInputPasswordControl
				style={{ marginTop: 10 }}
				title="Confirmar Contraseña"
				placeholder="Ingrese código"
				value={confirmacion}
				functionChangeText={setConfirmacion}
				activePassword={hidePass2}
				functionActivePassword={() => setHidePass2(!hidePass2)}
			/>
			<View style={styles.nuevacuenta}>
				<Text style={styles.createAccountTitle}>
					Despues de restablecer, se te redigira a la pantalla de Login
				</Text>
			</View>

			<ButtonSendControl
				style={{ marginTop: 20 }}
				title="Restablecer Contraseña"
				functionSend={funcionRestablecerContrasenia}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	Container: {
		flex: 1,
		backgroundColor: "#F3F8FC",
		padding: 20,
		borderRadius: 10,
	},
	TituloContenedor: {
		fontSize: 26,
		fontWeight: "bold",
		lineHeight: 26,
		textAlign: "center",
	},
	nuevacuenta: {
		display: "flex",
		alignItems: "center",
		flexDirection: "row",
		marginTop: 10,
		// justifyContent: "center",
	},
	createAccountTitle: {
		color: "#426E4F",
		fontSize: 12,
	},
});
