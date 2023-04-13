import React, { useState } from "react";
import {
	View,
	StyleSheet,
	Text,
	TextInput,
	FlatList,
	TouchableOpacity,
	Alert,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { RootStackParamList } from "../../../App";
import { StackNavigationProp } from "@react-navigation/stack";
import { Usuario } from "../../clases/Usuario";

type homeScreenProp = StackNavigationProp<RootStackParamList, "DrawerScreen">;

const ListarUsuarioScreen = ({ route }: any) => {
	const [usuarios, setUsuarios] = useState([]);
	const [query, setQuery] = useState("");
	const [usuarioSeleccionada, setUsuarioSeleccionada] = useState(null);
	const navigation = useNavigation<homeScreenProp>();

	const ListarUsuarios = async () => {
		const DatUsuario = new Usuario();
		const response = await DatUsuario.ListarUsuario(0);

		setUsuarios(response.data);
	};

	const BuscarPersonas = async () => {
		const DatUsuario = new Usuario();
		const response = await DatUsuario.ListarUsuario(0);
		const filteredData = response.data.filter((item: any) => {
			return item.cUsuUsuario.toLowerCase().includes(query.toLowerCase());
		});
		setUsuarios(filteredData);
	};

	useFocusEffect(
		React.useCallback(() => {
			BuscarPersonas();
		}, [])
	);

	const renderItem = ({ item }: any) => {
		const handleModificar = () => {
			navigation.navigate("RegistrarUsuarios", { item });
		};

		const handleEliminar = (usuario: any) => {
			setUsuarioSeleccionada(usuario);

			Alert.alert(
				"Eliminar persona",
				`¿Está seguro de que desea eliminar a ${usuario.cUsuUsuario}?`,
				[
					{
						text: "Cancelar",
						style: "cancel",
					},
					{
						text: "Eliminar",
						style: "destructive",
						onPress: async () => {
							const DatUsuario = new Usuario();
							const response = await DatUsuario.EliminarUsuario(usuario.nUsuID);

							if (response.success) {
								Alert.alert("OK", "Eliminado " + "!!");
								ListarUsuarios();
							} else {
								Alert.alert("ERROR", response.error);
							}
						},
					},
				]
			);
		};

		return (
			<TouchableOpacity>
				<View style={styles.cardBorder}>
					<Text style={styles.cardTitle}>{`Usuario: ${item.cUsuUsuario}`}</Text>
					<Text>{`Cliente: ${item.cliente.cClieNombres} ${item.cliente.cClieApellidos}`}</Text>
					<Text>{`Tipo: ${
						item.nUsuTipo === 1 ? "Administrador" : "Cobrador"
					}`}</Text>

					<View style={styles.buttonsContainer}>
						<TouchableOpacity
							style={[
								styles.Boton,
								{ backgroundColor: "rgb(12,177,234)", marginRight: 5 },
							]}
							onPress={handleModificar}
						>
							<Icon name="create-outline" size={20} color="white" />
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.Boton, { backgroundColor: "red" }]}
							onPress={() => handleEliminar(item)}
						>
							<Icon name="trash-outline" size={20} color="white" />
						</TouchableOpacity>
					</View>
				</View>
			</TouchableOpacity>
		);
	};

	const goToRegister = () => {
		navigation.navigate("RegistrarUsuarios");
	};

	return (
		<View style={styles.ContenedorPrincipalSearch}>
			<View style={styles.ContenedorSearch}>
				<View style={styles.TextInputSearch}>
					<TextInput
						style={styles.TextInput}
						placeholder="Buscar"
						value={query}
						onChangeText={setQuery}
					/>
				</View>
				<TouchableOpacity
					style={[styles.Boton, { backgroundColor: "#5cb85c", marginRight: 5 }]}
					onPress={BuscarPersonas}
				>
					<Icon name="search-outline" size={24} color="#FFF" />
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.Boton, { backgroundColor: "orange" }]}
					onPress={goToRegister}
				>
					<Icon name="add-outline" size={24} color="#FFF" />
				</TouchableOpacity>
			</View>

			<FlatList
				style={{ width: "100%" }}
				data={usuarios}
				renderItem={renderItem}
				keyExtractor={(item, index) => index.toString()}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	ContenedorPrincipalSearch: {
		flex: 1,
	},
	ContenedorSearch: {
		flexDirection: "row",
		marginHorizontal: 10,
		marginVertical: 5,
	},

	TextInputSearch: {
		flex: 1,
		marginRight: 5,
		borderRadius: 10,
		backgroundColor: "#FFF",
		paddingHorizontal: 10,
	},
	TextInput: {
		flex: 1,
	},
	Boton: {
		display: "flex",
		width: 50,
		height: 40,
		borderRadius: 5,
		alignItems: "center",
		justifyContent: "center",
	},

	cardBorder: {
		flex: 1,
		margin: 5,
		borderRadius: 10,
		padding: 10,
		backgroundColor: "#fff",
	},
	cardTitle: {
		textTransform: "uppercase",
		fontWeight: "bold",
	},
	buttonsContainer: {
		flexDirection: "row",
		justifyContent: "flex-end",
		paddingRight: 10, // Agregar paddingRight para separación
	},
});

export default ListarUsuarioScreen;
