import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	Alert,
	Image,
} from "react-native";
import Icono from "react-native-vector-icons/FontAwesome";

import { Usuario } from "../../clases/Usuario";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";
import { configData } from "../../../config";

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
		<View style={styles.ContenedorPrincipal}>
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

			<View style={styles.TextInputContainer}>
				<Text style={styles.TextLabel}>Usuario</Text>
				<TextInput
					style={styles.TextInput}
					value={username}
					placeholder="Ingrese Usuario"
					onChangeText={setUsername}
				/>
			</View>
			<View style={[styles.TextInputContainerPass, { position: "relative" }]}>
				<Text style={styles.TextLabel}>Contraseña</Text>
				{/* //implementar ojo de contraseña */}
				<TextInput
					style={styles.TextInput}
					// secureTextEntry={true}
					value={password}
					onChangeText={setPassword}
					placeholder="Ingrese contraseña"
					secureTextEntry={hidePass ? true : false}
				/>
				<Icono
					name={hidePass ? "eye-slash" : "eye"}
					size={15}
					onPress={() => setHidePass(!hidePass)}
					style={styles.ojo}
				/>
			</View>
			<TouchableOpacity
				style={styles.button}
				onPress={handleLogin}
				disabled={isLoading}
			>
				<Text style={styles.buttonText}>
					{isLoading ? "Cargando..." : "Ingresar"}
				</Text>
			</TouchableOpacity>

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
	ContenedorPrincipal: {
		flex: 1,
		backgroundColor: "#F3F8FC",
		padding: 50,
		borderRadius: 10,
		justifyContent: "center",
	},
	TituloContenedor: {
		fontSize: 26,
		fontWeight: "bold",

		textAlign: "center",
	},
	TextInputContainer: {
		marginBottom: 20,
		marginTop: 150,
	},
	TextLabel: {
		color: "#426E4F",

		fontWeight: "bold",
	},
	TextInputContainerPass: {
		marginBottom: 20,
	},
	TextInput: {
		// borderBottomColor: "#5cb85c",
		backgroundColor: "#fff",
		borderRadius: 10,
		marginTop: 5,
		padding: 10,
		fontSize: 14,
		color: "#808080",
	},
	button: {
		backgroundColor: "#386640",
		padding: 10,
		borderRadius: 10,
		alignItems: "center",
		marginTop: 20,
		height: 50,
	},
	buttonText: {
		color: "#FFF",
		fontSize: 20,
		fontWeight: "bold",
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
	ojo: {
		position: "absolute",
		top: 40,
		right: 10,
		zIndex: 1,
		color: "#ccc",
	},
});
//
