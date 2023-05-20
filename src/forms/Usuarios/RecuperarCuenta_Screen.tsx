import { useState } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import { TextInputControl } from "../../Components/TextInputControl";
import { ButtonSendControl } from "../../Components/ButtonSendControl";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";
import { useNavigation } from "@react-navigation/native";

type homeScreenProp = StackNavigationProp<RootStackParamList, "DrawerScreen">;

export const funcionEnviarCorreo = (): boolean => {
	return true;
};

export const RecuperarCuenta_Screen = () => {
	const navigation = useNavigation<homeScreenProp>();
	const [correo, setCorreo] = useState("");
	const funcionEnviarCodigo = () => {
		if (!correo) {
			Alert.alert("ALERTA", "Ingrese correo");
			return;
		}
		if (!funcionValidarCorreo()) {
			Alert.alert(
				"ALERTA",
				"El correo no existe en la base o ingresó uno incorrecto"
			);
			return;
		}

		if (!funcionEnviarCorreo()) {
			Alert.alert("ALERTA", "Error al enviar correo");
			return;
		}

		goToVerificarCodigo();
	};

	const funcionValidarCorreo = (): boolean => {
		return true;
	};

	const goToVerificarCodigo = () => {
		navigation.navigate("VerificarCodigoCorreo", { correo });
	};

	return (
		<View style={styles.Container}>
			<Text style={[styles.TituloContenedor, { color: "#6E955C" }]}>
				¡Recupera tu cuenta!
			</Text>

			<Text style={{ marginTop: 10, color: "#808080" }}>
				Ingresar tu dirección de correo electrónico asociada a tu cuenta, para
				recibir instrucciones sobre cómo recuperar el acceso. Asegúrate de verificar
				también la carpeta de spam.
			</Text>

			<TextInputControl
				style={{ marginTop: 10 }}
				title="Correo"
				placeholder="correo@gmail.com"
				value={correo}
				functionChangeText={setCorreo}
				keyboardType="email-address"
			/>

			<ButtonSendControl
				style={{ marginTop: 20 }}
				title="Buscar Correo"
				functionSend={funcionEnviarCodigo}
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
});
