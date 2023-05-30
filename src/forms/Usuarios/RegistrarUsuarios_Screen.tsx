import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Usuario } from "../../clases/Usuario";
import { Picker } from "@react-native-picker/picker";
import { configData } from "../../../config";
import Icon from "react-native-vector-icons/Ionicons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";

type homeScreenProp = StackNavigationProp<RootStackParamList, "DrawerScreen">;

interface ClienteInterface {
	idcliente: number;
	nombre: string;
	apellido: string;
}

const RegistroUsuario_Screen = ({ route }: any) => {
	const navigation = useNavigation<homeScreenProp>();
	const [idUsuario, setIdUsuario] = useState(0);
	const [usuario, setUsuario] = useState("");
	const [clave, setClave] = useState("");
	const [confirmarClave, setConfirmarClave] = useState("");
	const [estado, setEstado] = useState(-1);
	const [tipoUsuario, setTipoUsuario] = useState(-1);
	const [clienteSeleccionado, setClienteSeleccionado] =
		useState<ClienteInterface>({ idcliente: -1, nombre: "", apellido: "" });

	const [accionBoton, setAccionBoton] = useState("Guardar");
	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		if (route.params && route.params.item) {
			const usuario = route.params.item;
			setIdUsuario(usuario.nUsuID);
			setUsuario(usuario.cUsuUsuario);
			setClave(usuario.cUsuClave);
			setConfirmarClave(usuario.cUsuClave);
			setEstado(usuario.bUsuEstado);
			setTipoUsuario(usuario.nUsuTipo);
			setClienteSeleccionado({
				idcliente: usuario.nClieID,
				nombre: usuario.cliente.cClieNombres,
				apellido: usuario.cliente.cClieApellidos,
			});

			setIsEditing(true);
			setAccionBoton("Modificar");
		} else {
			setAccionBoton("Registrar");
		}
	}, [route.params]);

	const handleEnviar = async () => {
		const datUsuario = new Usuario(
			idUsuario,
			usuario,
			clave,
			estado,
			tipoUsuario,
			clienteSeleccionado.idcliente,
			configData.nConfiguracionID,
			configData.nCredRutasID
		);

		if (clave !== confirmarClave) {
			Alert.alert("ALERTA", "La contraseñas ingresadas no coinciden");
			return;
		}
		if (clienteSeleccionado.idcliente === -1) {
			Alert.alert("ALERTA", "Escoga un cliente");
			return;
		}

		const response = isEditing
			? await datUsuario.ActualizarUsuario()
			: await datUsuario.RegistrarUsuario_Config();
		if (response.success) {
			if (isEditing) {
				Alert.alert("OK", "Modificado Correctamente " + "!!");
			} else {
				Alert.alert("OK", "Registrado Correctamente " + "!!");
			}
			navigation.goBack();
		} else {
			Alert.alert("ERROR", response.error);
		}
	};

	const handleSelectClient = (cliente: any) => {
		setClienteSeleccionado({
			idcliente: cliente.nClieID,
			nombre: cliente.cClieNombres,
			apellido: cliente.cClieApellidos,
		});
	};

	const irPantallaClientes = () => {
		navigation.navigate("ListarPersonas", {
			pantalla: "usuario",
			onSelect: handleSelectClient,
		});

		navigation.setOptions({ title: "Relacion de Personas3333" });
	};

	return (
		<View style={styles.ContenedorPrincipal}>
			{/* <ScrollView> */}
			<View style={styles.TextInputContenedor}>
				<Text style={styles.TextLabel}>Usuario:</Text>
				<TextInput
					style={styles.TextInput}
					value={usuario}
					onChangeText={setUsuario}
					keyboardType="default"
					placeholder="Ingrese usuario"
					placeholderTextColor="#D3D3D3"
					textAlignVertical="center"
					editable={isEditing ? false : true}
				/>

				<Text style={styles.TextLabel}>Cliente:</Text>

				<View style={styles.ControlIrOtraPantalla}>
					<TextInput
						style={[styles.TextInput, { width: "85%" }]}
						value={`${clienteSeleccionado.apellido} ${clienteSeleccionado.nombre}`.trim()}
						// onChangeText={setUsuario}
						keyboardType="default"
						placeholder="Agregue un Cliente"
						placeholderTextColor="#D3D3D3"
						textAlignVertical="center"
						editable={false}
					/>
					<TouchableOpacity
						style={[styles.button, { backgroundColor: "orange", width: "15%" }]}
						onPress={irPantallaClientes}
					>
						<Icon name="add-outline" size={24} color={"white"} />
					</TouchableOpacity>
				</View>

				<Text style={styles.TextLabel}>Clave:</Text>
				<TextInput
					style={styles.TextInput}
					value={clave}
					onChangeText={setClave}
					placeholder="Ingrese clave"
					placeholderTextColor="#D3D3D3"
					textAlignVertical="center"
					secureTextEntry={true}
					editable={isEditing ? false : true}
				/>

				<Text style={styles.TextLabel}>Confirmar Clave:</Text>
				<TextInput
					style={styles.TextInput}
					value={confirmarClave}
					onChangeText={setConfirmarClave}
					placeholder="Repita clave"
					placeholderTextColor="#D3D3D3"
					textAlignVertical="center"
					secureTextEntry={true}
					editable={isEditing ? false : true}
				/>

				<Text style={styles.TextLabel}>Seleccione Tipo:</Text>
				<View style={styles.picker}>
					<Picker
						selectedValue={tipoUsuario}
						onValueChange={(itemValue, itemIndex) => setTipoUsuario(itemValue)}
						mode="dialog"
					>
						<Picker.Item label="Seleccione" value={-1} />
						<Picker.Item label="Administrador" value={1} />
						<Picker.Item label="Cobrador" value={2} />
					</Picker>
				</View>

				<Text style={styles.TextLabel}>Seleccione Estado:</Text>
				<View style={styles.picker}>
					<Picker
						selectedValue={estado}
						onValueChange={(itemValue, itemIndex) => setEstado(itemValue)}
						mode="dialog"
					>
						<Picker.Item label="Seleccione" value={-1} />
						<Picker.Item label="Activo" value={1} />
						<Picker.Item label="Inactivo" value={0} />
					</Picker>
				</View>
			</View>

			<TouchableOpacity
				style={[
					styles.button,
					isEditing
						? { backgroundColor: "rgb(12,177,234)" }
						: { backgroundColor: "orange" },
				]}
				onPress={handleEnviar}
			>
				<Text style={styles.buttonText}>{accionBoton}</Text>
			</TouchableOpacity>
			{/* </ScrollView> */}
		</View>
	);
};

const styles = StyleSheet.create({
	ContenedorPrincipal: {
		flex: 1,
		backgroundColor: "#fff",
		padding: 20,
	},
	TituloContenedor: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
		color: "#5cb85c",
	},
	TextInputContenedor: {
		marginBottom: 10,
	},
	TextLabel: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 5,
	},
	TextInput: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
		padding: 10,
		fontSize: 16,
		height: 50,
	},
	button: {
		padding: 10,
		borderRadius: 5,
		alignItems: "center",
		// marginTop: 20,
		height: 50,
	},
	buttonText: {
		color: "#FFF",
		fontSize: 20,
		fontWeight: "bold",
	},
	picker: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
		padding: 0,
		fontSize: 16,
	},
	inputContainer: {
		position: "relative",
		width: "80%",
	},
	input: {
		borderWidth: 1,
		borderColor: "gray",
		borderRadius: 5,
		padding: 10,
		width: "100%",
	},
	listContainer: {
		position: "absolute",
		width: "100%",
		backgroundColor: "#fff",
		borderWidth: 1,
		borderColor: "gray",
		borderRadius: 5,
		maxHeight: 200,
		overflow: "scroll",
		zIndex: 1,
	},
	item: {
		fontSize: 16,
		paddingVertical: 10,
		paddingHorizontal: 20,
	},
	ControlIrOtraPantalla: {
		display: "flex",
		flexDirection: "row",
		height: 50,
		alignItems: "center",
	},
});
export default RegistroUsuario_Screen;
