import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";
import { useNavigation } from "@react-navigation/native";
import { View, Alert, Text } from "react-native";

type homeScreenProp = StackNavigationProp<RootStackParamList, "DrawerScreen">;

export const CerrarSesion = () => {
	const navigation = useNavigation<homeScreenProp>();

	const ConsultarCerrarSesion = () => {
		console.log("cierra sesion");

		Alert.alert(
			"Confirmar cierre de sesión",
			"¿Estás seguro que deseas cerrar sesión?",
			[
				{
					text: "Cancelar",
					style: "cancel",
					onPress: () => {},
				},
				{
					text: "Aceptar",
					onPress: () => {
						// Aquí iría la lógica para cerrar sesión

						navigation.reset({
							index: 0,
							routes: [{ name: "Login" }],
						});
					},
				},
			],
			{ cancelable: false }
		);
	};
	ConsultarCerrarSesion();
	return (
		<View>
			<Text></Text>
		</View>
	);
};
