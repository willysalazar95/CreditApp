import { useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet, Alert } from "react-native";
import { TextInputControl } from "../../Components/TextInputControl";
import { ButtonSendControl } from "../../Components/ButtonSendControl";
import { funcionEnviarCorreo } from "./RecuperarCuenta_Screen";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";
import { useNavigation } from "@react-navigation/native";

type homeScreenProp = StackNavigationProp<RootStackParamList, "DrawerScreen">;

export const VerificarCodigoCorreo_Screen = ({ route }: any) => {
	const navigation = useNavigation<homeScreenProp>();
	const { correo } = route.params;
	const [codigo, setCodigo] = useState("");

	const funcionOnPress = () => {
		if (!funcionValidarCodigo()) {
			Alert.alert("ALERTA", "Codigo Incorrecto");
			return;
		}
		goToRestablecerContraseña();
	};

	const funcionValidarCodigo = (): boolean => {
		return true;
	};

	const goToRestablecerContraseña = () => {
		navigation.navigate("RestablecerContrasenia", { correo });
	};
	return (
		<View style={styles.Container}>
			<Text style={[styles.TituloContenedor, { color: "#6E955C" }]}>
				Verificar Código
			</Text>

			<Text style={{ marginTop: 10, color: "#808080" }}>
				Introduce el código que te hemos enviado al correo:{" "}
				<Text style={{ fontWeight: "bold" }}>{correo}</Text>
			</Text>
			<TextInputControl
				style={{ marginTop: 10 }}
				title="Código"
				placeholder="Ingrese código"
				value={codigo}
				functionChangeText={setCodigo}
				keyboardType="email-address"
			/>

			<ButtonSendControl
				style={{ marginTop: 20 }}
				title="Validar Codigo"
				functionSend={funcionOnPress}
			/>
			<View style={styles.nuevacuenta}>
				<Text style={styles.createAccountTitle}>
					¿No has recibido el código de seguridad?
				</Text>
			</View>

			<View style={styles.nuevacuenta}>
				<TouchableOpacity

				// onPress={goToRegister}
				>
					<Text style={styles.createAccountTitle}>
						Podemos{" "}
						<Text
							style={styles.createAccountTitleButton}
							onPress={funcionEnviarCorreo}
						>
							{" "}
							volver a enviarlo.
						</Text>
					</Text>
				</TouchableOpacity>
			</View>
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
		justifyContent: "center",
	},
	createAccountTitle: {
		color: "#426E4F",
		fontSize: 12,
	},
	createAccountTitleButton: {
		color: "#426E4F",
		fontWeight: "bold",
		textDecorationStyle: "dashed",
		fontSize: 12,
		textDecorationLine: "underline",
	},
});
