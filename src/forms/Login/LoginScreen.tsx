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

import AlertaModal from "../../utils/AlertModal";

type homeScreenProp = StackNavigationProp<RootStackParamList, "DrawerScreen">;

export const LoginScreen = () => {
	const [hidePass, setHidePass] = useState(true);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	// const navigation = useNavigation();
	const navigation = useNavigation<homeScreenProp>();
	const [isLoading, setIsLoading] = useState(false);
	//Inicio Ventana Modal - Prueba
	const [MensajeModal1, setMensajeModal1] = useState("");
	const [isAlertVisible, setAlertVisible] = useState(false);
	const [tituloModal, setTituloModal] = useState("");
	const [alertMessage, setAlertMessage] = useState("");

	const ocultarAlertaModal = () => {
		setAlertVisible(false);
	};

	useEffect(() => {
		navigation.setOptions({ headerShown: false });
	}, []);

	const handleLogin = async () => {
		setIsLoading(true);

		const usu = new Usuario(0, username, password, 0, 0, 0);
		const response = await usu.loginUser();
		setIsLoading(false);
		if (response.success) {
			//Alert.alert("OK", "Bienvenido " + response.data.cUsuUsuario + "!!");
			configData.nUsuId = response.data.nUsuID;
			configData.cUsuario = username;
			configData.nUsuTipo = response.data.nUsuTipo;
			configData.nConfiguracionID = response.data.nConfiguracionID;
			configData.nCredRutasID = response.data.nCredRutasID;
			configData.nCajaId = response.data.caja.nCajaId;
			navigation.navigate("DrawerScreen");
			setTituloModal("MyBankito");
			setMensajeModal1("Bienvenido : " + response.data.cUsuUsuario + "!!");
			setAlertVisible(true);
		} else {
			//Alert.alert("ERROR", response.error);
			setTituloModal("MyBankito");
			setMensajeModal1("ERROR : " + response.error);
			setAlertVisible(true);
			setPassword("");
		}
	};

	const goToRegister = () => {
		navigation.navigate("Configuracion_Screen");
	};
	const goToRecuperarCuenta = () => {
		navigation.navigate("RecuperarCuenta");
	};

	return (
		<View style={styles.Container}>
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
			<Text style={[styles.TituloContenedor, { marginTop: 20, color: "#6E955C" }]}>
				<Text style={[styles.TituloContenedor, { color: "#426E4F" }]}>
					MyBankito
				</Text>
			</Text>

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
				<AlertaModal
					titulo={tituloModal}
					mensaje={MensajeModal1}
					visible={isAlertVisible}
					onConfirm={ocultarAlertaModal}
				/>
			</View>
			<View style={styles.nuevacuenta}>
				<TouchableOpacity onPress={goToRecuperarCuenta}>
					<Text style={styles.createAccountTitleButton}>
						¿Olvidaste tu contraseña?
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
		textDecorationLine: "underline",
	},
});
//
