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
import { Usuario } from "../../clases/Usuario";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";

type homeScreenProp = StackNavigationProp<RootStackParamList, "DrawerScreen">;

export const LoginScreen = () => {
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
			//navigation.navigate("DrawerScreen", { cUsuario: response.data.cUsuario }); //aguego
			navigation.navigate("DrawerScreen");
		} else {
			Alert.alert("ERROR", response.error);
			setPassword("");
		}
	};

	const goToRegister = () => {
		navigation.navigate("Register");
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Bienvenido a CreditApp</Text>
			<View style={styles.inputContainerUsu}>
				<Text style={styles.cajaCabecera}>USUARIO</Text>
				<TextInput
					style={styles.input}
					value={username}
					onChangeText={setUsername}
				/>
			</View>
			<View style={styles.inputContainerPass}>
				<Text style={styles.cajaCabecera}>CLAVE</Text>
				<TextInput
					style={styles.input}
					secureTextEntry={true}
					value={password}
					onChangeText={setPassword}
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

			<Text style={styles.createAccountTitle}>
				¿No tienes cuenta? Crea una
				<TouchableOpacity onPress={goToRegister}>
					<Text style={styles.createAccountTitleButton}> aquí</Text>
				</TouchableOpacity>
				.
			</Text>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
		padding: 50,
		borderRadius: 10,
		justifyContent: "center",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
		color: "#5cb85c",
		textAlign: "center",
	},
	inputContainerUsu: {
		marginBottom: 20,
		marginTop: 300,
	},
	inputContainerPass: {
		marginBottom: 20,
	},
	input: {
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
	},
	buttonText: {
		color: "#FFF",
		fontSize: 18,
		fontWeight: "bold",
	},
	createAccountTitle: {
		color: "#CCC",
		textAlign: "center",
		marginTop: 20,
	},
	cajaCabecera: {
		color: "#CCC",
	},
	createAccountTitleButton: {
		color: "#5cb85c",
		fontWeight: "bold",
	},
});
