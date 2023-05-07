import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	Alert,
	ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { RootStackParamList } from "../../../App";
import { StackNavigationProp } from "@react-navigation/stack";
type homeScreenProp = StackNavigationProp<RootStackParamList, "DrawerScreen">;

import { Usuario } from "../../clases/Usuario";
import { TextInputControl } from "../../Components/TextInputControl";
import { TextInputPasswordControl } from "../../Components/TextInputPasswordControl";
import { ButtonSendControl } from "../../Components/ButtonSendControl";
//CREADO POR AAGC
const RegistroUsuarioConfig_Screen = ({ route }: any) => {
	const navigation = useNavigation<homeScreenProp>();
	const [hidePass, setHidePass] = useState(true);
	const [nClienId, setnClienId] = useState(0);
	const [nConfiguracionID, setnConfiguracionID] = useState("");

	const [cUsuUsuario, setcUsuUsuario] = useState("");
	const [cUsuClave, setcUsuClave] = useState("");

	useEffect(() => {
		if (route.params && route.params.item) {
			const Dat = route.params.item;
			setnClienId(Dat.nClieID);
			setnConfiguracionID(Dat.nConfiguracionID);
		} else {
			// Hacer algo si no hay datos de registro
		}
	}, [route.params]);

	const handleEnviar = async () => {
		const dat = new Usuario(
			0,
			cUsuUsuario,
			cUsuClave,
			1,
			1,
			nClienId,
			parseInt(nConfiguracionID),
			0
		);
		const response = await dat.RegistrarUsuario_Config();
		if (response.success) {
			Alert.alert(
				"Mensaje",
				"Registro Finalizado Correctamente! , ya Puedes Iniciar Sesión ",
				[
					{
						text: "Iniciar Sesión",
						onPress: () => {
							navigation.navigate("Login");
						},
					},
				]
			);
		} else {
			Alert.alert("ERROR", response.error);
		}
	};

	return (
		<View style={styles.Container}>
			<ScrollView style={{ padding: 20 }}>
				<Text
					style={[styles.TituloContenedor, { marginTop: 10, color: "#6E955C" }]}
				>
					Solo falta un último paso
				</Text>
				<TextInputControl
					style={styles.InputMargin}
					title="Usuario"
					placeholder="Ingrese usuario"
					value={cUsuUsuario}
					functionChangeText={setcUsuUsuario}
					keyboardType="default"
				/>
				{/* <Text style={styles.TituloContenedor}>Crea tu usuario</Text> */}

				<TextInputPasswordControl
					style={styles.InputMargin}
					title="Contraseña"
					placeholder="Ingrese contraseña"
					value={cUsuClave}
					functionChangeText={setcUsuClave}
					activePassword={hidePass}
					functionActivePassword={() => setHidePass(!hidePass)}
				/>
				<ButtonSendControl
					style={{ marginTop: 10 }}
					title="Finalizar"
					functionSend={handleEnviar}
				/>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	Container: {
		flex: 1,
		backgroundColor: "#F3F8FC",
	},
	InputMargin: {
		marginBottom: 10,
	},
	TituloContenedor: {
		fontSize: 20,
		textAlign: "center",
		marginBottom: 10,

		textDecorationLine: "underline",
	},
});
export default RegistroUsuarioConfig_Screen;
