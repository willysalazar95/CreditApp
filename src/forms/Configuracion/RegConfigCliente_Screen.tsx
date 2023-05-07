import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, ScrollView, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Cliente } from "../../clases/Cliente";
import { convertirFechaAAAAMMDD } from "../../utils/utils";
import { RootStackParamList } from "../../../App";
import { StackNavigationProp } from "@react-navigation/stack";
import { TextInputControl } from "../../Components/TextInputControl";
import { ButtonSendControl } from "../../Components/ButtonSendControl";
import { TextInputDateControl } from "../../Components/TextInputDate";
type homeScreenProp = StackNavigationProp<RootStackParamList, "DrawerScreen">;

//CREADO POR AAGC
const RegConfigCliente_Screen = ({ route }: any) => {
	// const navigation = useNavigation();
	const navigation = useNavigation<homeScreenProp>();
	const [nConfiguracionID, SETnConfiguracionID] = useState(0);
	const [nIdPers, setNidPers] = useState(0);
	const [dni, setDni] = useState("");
	const [nombre, setNombre] = useState("");
	const [apellido, setApellido] = useState("");
	const [telefono, setTelefono] = useState("");
	const [direccion, setDireccion] = useState("");

	const [fechaNac, setFechaNac] = useState(new Date("1989-01-01"));

	useEffect(() => {
		if (route.params && route.params.item) {
			const Dat = route.params.item;
			SETnConfiguracionID(Dat.nConfiguracionID);
		} else {
			// Hacer algo si no hay datos de registro
		}
	}, [route.params]);

	const handleEnviar = async () => {
		const datCliente = new Cliente(
			nIdPers,
			dni,
			nombre,
			apellido,
			direccion,
			telefono,
			convertirFechaAAAAMMDD(fechaNac),
			"",
			0,
			"0", //cLatitud,
			"0", //cLongitud
			""
		);

		const response = await datCliente.RegistrarCliente();
		if (response.success) {
			const nClieID = response.data.nClieID;
			setNidPers(nClieID);

			const datos = {
				nConfiguracionID: nConfiguracionID,
				nClieID: nClieID,
			};

			Alert.alert("Mensaje", "Paso 2, Guardado", [
				{
					text: "Siguiente",
					onPress: () =>
						navigation.navigate("RegistroUsuarioConfig_Screen", { item: datos }),
				},
			]);
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
					Paso 2
				</Text>
				<TextInputControl
					style={styles.InputMargin}
					title="DNI"
					placeholder="Ingrese DNI"
					functionChangeText={setDni}
					value={dni}
					keyboardType="numeric"
					maxLength={8}
				/>

				<TextInputControl
					style={styles.InputMargin}
					title="Nombre"
					placeholder="Ingrese nombre"
					functionChangeText={setNombre}
					value={nombre}
					keyboardType="default"
				/>
				<TextInputControl
					style={styles.InputMargin}
					title="Apellido"
					placeholder="Ingrese apellido"
					functionChangeText={setApellido}
					value={apellido}
					keyboardType="default"
				/>

				<TextInputControl
					style={styles.InputMargin}
					title="Teléfono"
					placeholder="Ingrese teléfono"
					functionChangeText={setTelefono}
					value={telefono}
					keyboardType="phone-pad"
				/>

				<TextInputControl
					style={styles.InputMargin}
					title="Dirección"
					placeholder="Ingrese dirección"
					functionChangeText={setDireccion}
					value={direccion}
					keyboardType="default"
				/>

				<TextInputDateControl
					style={styles.InputMargin}
					title="Fecha Nacimiento"
					value={fechaNac}
					functionChange={setFechaNac}
				/>

				<ButtonSendControl
					style={{ marginTop: 10 }}
					title="Siguiente"
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
		fontSize: 26,
		fontWeight: "bold",
		lineHeight: 26,
		textAlign: "center",
	},
});
export default RegConfigCliente_Screen;
