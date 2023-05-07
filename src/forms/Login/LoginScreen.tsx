import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Alert,
	Image,
} from "react-native";

import { Usuario } from "../../clases/Usuario";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";
import { configData } from "../../../config";
import { TextInputControl } from "../../Components/TextInputControl";
import { TextInputPasswordControl } from "../../Components/TextInputPasswordControl";
import { ButtonSendControl } from "../../Components/ButtonSendControl";

type homeScreenProp = StackNavigationProp<RootStackParamList, "DrawerScreen">;

export const LoginScreen = () => {
	const [hidePass, setHidePass] = useState(true);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	// const navigation = useNavigation();
	const navigation = useNavigation<homeScreenProp>();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		navigation.setOptions({ headerShown: false });
	}, []);

	const handleLogin = async () => {
		setIsLoading(true);

		const usu = new Usuario(0, username, password, 0, 0, 0);
		const response = await usu.loginUser();
		setIsLoading(false);

		if (response.success) {
			Alert.alert("OK", "Bienvenido " + response.data.cUsuUsuario + "!!");
			configData.nUsuId = response.data.nUsuID;
			configData.cUsuario = username;
			configData.nUsuTipo = response.data.nUsuTipo;
			configData.nConfiguracionID = response.data.nConfiguracionID;
			configData.nCredRutasID = response.data.nCredRutasID;
			configData.nCajaId = response.data.caja.nCajaId;
			navigation.navigate("DrawerScreen");
		} else {
			Alert.alert("ERROR", response.error);
			setPassword("");
		}
	};

	const goToRegister = () => {
		navigation.navigate("Configuracion_Screen");
	};

	return (
		<View style={styles.Container}>
			<Text
				style={[styles.TituloContenedor, { marginTop: 100, color: "#6E955C" }]}
			>
				Bienvenido a
			</Text>
			<Text style={[styles.TituloContenedor, { color: "#426E4F" }]}>
				MyBankito
			</Text>
			<View
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					marginTop: 20,
				}}
			>
				<Image
					style={{ width: 70, height: 70 }}
					source={require("../../../assets/adaptive-icon.png")}
				/>
			</View>

			<TextInputControl
				style={{ marginTop: 100, marginBottom: 10 }}
				title="Usuario"
				placeholder="Ingrese usuario"
				value={username}
				keyboardType="default"
				functionChangeText={setUsername}
			/>
			<TextInputPasswordControl
				title="Contraseña"
				placeholder="Ingrese contraseña"
				value={password}
				activePassword={hidePass}
				functionChangeText={setPassword}
				functionActivePassword={() => setHidePass(!hidePass)}
			/>

			<ButtonSendControl
				style={{ marginTop: 20 }}
				title="Ingresar"
				functionSend={handleLogin}
			/>

			<View style={styles.nuevacuenta}>
				<Text style={styles.createAccountTitle}>
					¿Aún no tiene cuenta? Crea una
				</Text>
				<TouchableOpacity onPress={goToRegister}>
					<Text style={styles.createAccountTitleButton}> aquí.</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	Container: {
		flex: 1,
		backgroundColor: "#F3F8FC",
		padding: 40,
		borderRadius: 10,
		justifyContent: "center",
	},
	TituloContenedor: {
		fontSize: 26,
		fontWeight: "bold",
		lineHeight: 26,
		textAlign: "center",
	},
	TextInputContainer: {
		marginBottom: 20,
		marginTop: 150,
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
	},
});
//
