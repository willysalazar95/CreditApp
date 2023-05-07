import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, ScrollView, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Configuracion } from "../../clases/Configuracion";
import { RootStackParamList } from "../../../App";
import { StackNavigationProp } from "@react-navigation/stack";

import { Constantes } from "../../clases/Constantes";
import { TextInputControl } from "../../Components/TextInputControl";
import { ButtonSendControl } from "../../Components/ButtonSendControl";
import { Option, SelectControl } from "../../Components/SelectControl";

type homeScreenProp = StackNavigationProp<RootStackParamList, "DrawerScreen">;

const Configuracion_Screen = () => {
	const [ruc, setRuc] = useState("");
	const [razonSocial, setRazonSocial] = useState("");
	const [direccion, setDireccion] = useState("");
	const [telefono, setTelefono] = useState("");
	const [tasaInteres, setTasaInteres] = useState("");
	const [tasaMora, setTasaMora] = useState("");

	const [selectedValue, setSelectedValue] = useState(0);
	const [options, setOptions] = useState<Option[]>([]);
	const [bCargado, setbCargado] = useState(false);

	const navigation = useNavigation<homeScreenProp>();

	useEffect(() => {
		if (!bCargado) {
			ListarTipoInteres();
		}
	});

	const handleGuardar = async () => {
		try {
			const Datos = new Configuracion(
				ruc,
				razonSocial,
				direccion,
				telefono,
				selectedValue,
				parseInt(tasaInteres),
				parseInt(tasaMora)
			);
			const response = await Datos.RegistrarConfiguracion();

			if (response.success) {
				// console.log("Configuracion Grabada!", response.data);
				Alert.alert("Mensaje", "Paso 1 Guardado", [
					{
						text: "Siguiente",
						onPress: () =>
							navigation.navigate("RegConfigCliente_Screen", { item: response.data }),
					},
				]);
			} else {
				console.log("ERROR", response.error);
			}
		} catch (error: any) {
			console.log("ERROR", error.message);
		}
	};

	const ListarTipoInteres = async () => {
		const dCred = new Constantes("1002");
		const Datos = await dCred.ObtenerConstante();

		if (Datos.success) {
			const arrayOpciones: Option[] = [];

			Datos.data.forEach((dato: any) => {
				arrayOpciones.push({
					label: dato.cConsDescripcion,
					value: dato.nConsValor,
				});
			});

			setOptions(arrayOpciones);
			setbCargado(true);
		}
	};

	return (
		<View style={styles.container}>
			<ScrollView style={{ padding: 20 }}>
				<Text
					style={[styles.TituloContenedor, { marginTop: 10, color: "#6E955C" }]}
				>
					Paso 1
				</Text>

				<TextInputControl
					style={styles.InputMargin}
					title="RUC"
					placeholder="Ingrese RUC"
					keyboardType="numeric"
					functionChangeText={setRuc}
					value={ruc}
					maxLength={11}
				/>
				<TextInputControl
					style={styles.InputMargin}
					title="Razon Social"
					placeholder="Ingrese razon social"
					keyboardType="default"
					functionChangeText={setRazonSocial}
					value={razonSocial}
				/>

				<TextInputControl
					style={styles.InputMargin}
					title="Dirección"
					placeholder="Ingrese dirección"
					keyboardType="default"
					functionChangeText={setDireccion}
					value={direccion}
				/>
				<TextInputControl
					style={styles.InputMargin}
					title="Teléfono"
					placeholder="Ingrese teléfono"
					keyboardType="phone-pad"
					functionChangeText={setTelefono}
					value={telefono}
				/>

				<SelectControl
					style={styles.InputMargin}
					title="Tipo de Interes:"
					options={options}
					value={selectedValue}
					functionValueChange={(itemValue) => setSelectedValue(itemValue)}
				/>

				<TextInputControl
					style={styles.InputMargin}
					title="Tasa Interes"
					placeholder="Ingrese tasa interes"
					keyboardType="decimal-pad"
					functionChangeText={setTasaInteres}
					value={tasaInteres}
					maxLength={10}
				/>

				<TextInputControl
					style={styles.InputMargin}
					title="Tasa Mora"
					placeholder="Ingrese tasa interes"
					keyboardType="decimal-pad"
					functionChangeText={setTasaMora}
					value={tasaMora}
					maxLength={10}
				/>

				<ButtonSendControl
					style={{ marginTop: 10 }}
					title="Siguiente"
					functionSend={handleGuardar}
				/>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		height: "100%",
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

export default Configuracion_Screen;
