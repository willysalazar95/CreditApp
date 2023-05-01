import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	Alert,
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
			console.log(configData);
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
			<Text style={styles.TituloContenedor}>MyBANKito</Text>
			<View style={styles.TextInputContainer}>
				<Text style={styles.TextLabel}>USUARIO</Text>
				<TextInput
					style={styles.TextInput}
					value={username}
					onChangeText={setUsername}
				/>
			</View>
			<View style={[styles.TextInputContainerPass, { position: "relative" }]}>
				<Text style={styles.TextLabel}>CLAVE</Text>
				{/* //implementar ojo de contraseña */}
				<TextInput
					style={styles.TextInput}
					// secureTextEntry={true}
					value={password}
					onChangeText={setPassword}
					secureTextEntry={hidePass ? true : false}
				/>
				<Icono
					name={hidePass ? "eye-slash" : "eye"}
					size={15}
					color="grey"
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
					{isLoading ? "Cargando..." : "Iniciar Sesión"}
				</Text>
			</TouchableOpacity>

			<View style={styles.nuevacuenta}>
				<Text style={styles.createAccountTitle}>¿No tienes cuenta? Crea una</Text>
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
		backgroundColor: "#FFFFFF",
		padding: 50,
		borderRadius: 10,
		justifyContent: "center",
	},
	TituloContenedor: {
		fontSize: 26,
		fontWeight: "bold",
		marginBottom: 20,
		color: "#5cb85c",
		textAlign: "center",
	},
	TextInputContainer: {
		marginBottom: 20,
		marginTop: 300,
	},
	TextLabel: {
		color: "#CCC",
	},
	TextInputContainerPass: {
		marginBottom: 20,
	},
	TextInput: {
		borderBottomColor: "#5cb85c",
		borderBottomWidth: 1,
		padding: 10,
		fontSize: 18,
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
	nuevacuenta: {
		flexDirection: "row",
		marginTop: 10,
	},
	createAccountTitle: {
		color: "#CCC",
		fontSize: 18,
	},
	createAccountTitleButton: {
		color: "#5cb85c",
		fontWeight: "bold",
		fontSize: 20,
	},
	ojo: {
		position: "absolute",
		top: 40,
		right: 10,
		zIndex: 1,
		color: "#5cb85c",
	},
});
//
