import React, { useState, useEffect } from "react";
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
import { Cliente } from "../../clases/Cliente";

import Icon from "react-native-vector-icons/FontAwesome";
import { configData } from "../../../config";
import { RootStackParamList } from "../../../App";
import { StackNavigationProp } from "@react-navigation/stack";

type homeScreenProp = StackNavigationProp<RootStackParamList, "DrawerScreen">;

const ListarClienteScreen = ({ route }: any) => {
	const [personas, setPersonas] = useState([]);
	const [query, setQuery] = useState("");
	const [personaSeleccionada, setPersonaSeleccionada] = useState(null);
	const [isClienteCredito, setClienteCredito] = useState(false);

	const navigation = useNavigation<homeScreenProp>();
	const ListarPersonas = async () => {
		const DatCliente = new Cliente(
			0,"","","","","","","",1,"","","",
			configData.nConfiguracionID.toString()
		);
		const response = await DatCliente.ListarCliente();
		setPersonas(response.data);
	};

	const BuscarPersonas = async () => {
		const DatCliente = new Cliente(
			0,"","","","","","","",1,"","","",
			configData.nConfiguracionID.toString()
		);
		const response = await DatCliente.ListarCliente();
		const filteredData = response.data.filter((item: any) => {
			return item.cClieNombres.toLowerCase().includes(query.toLowerCase());
		});
		setPersonas(filteredData);
	};

	useEffect(() => {
		if (route.params) {
			// console.log("Seleccionar Persona");
			setClienteCredito(true);
		} else {
			ListarPersonas();
			setClienteCredito(false);
		}
		setQuery("");
	}, []);

	useFocusEffect(
		React.useCallback(() => {
			BuscarPersonas();
		}, [])
	);

	const renderItem = ({ item }: any) => {
		const handleModificar = () => {
			navigation.navigate("ModificarPersona", { item });
		};

		const handleEliminar = (cliente: any) => {
			setPersonaSeleccionada(cliente);
			Alert.alert(
				"Eliminar CLIENTE",
				`¿Está seguro de que desea eliminar a ${cliente.cClieNombres} ${cliente.cClieApellidos}?`,
				[
					{
						text: "Cancelar",
						style: "cancel",
					},
					{
						text: "Eliminar",
						style: "destructive",
						onPress: async () => {
							const DatCliente = new Cliente(
								cliente.nClieID,"","","","","","","",0,
								"","","",configData.nConfiguracionID.toString()
							);
							const response = await DatCliente.EliminarCliente();

							if (response.success) {
								Alert.alert("OK", "Eliminado " + "!!");
								ListarPersonas();
							} else {
								Alert.alert("ERROR", response.error);
							}
						},
					},
				]
			);
		};

		const handleSeleccionCliente = (item: any) => {
			if (route.params?.pantalla === "credito") {
				navigation.navigate("RegistrarPrestamo", { item });
			}

			if (route.params?.pantalla === "usuario") {
				route.params.onSelect(item);
				navigation.goBack();
				console.log("pasa");
			}
		};

		return (
			<TouchableOpacity onPress={() => handleSeleccionCliente(item)}>
				<View style={styles.cardBorder}>
					<Text style={styles.cardTitle}>
						{`Nombre: ${item.cClieNombres} ${item.cClieApellidos}`}
					</Text>
					{<Text>{`Dirección: ${item.cClieDireccion}`}</Text>}
					{<Text>{`Teléfono: ${item.cClieTelefono}`}</Text>}
					<View style={styles.buttonsContainer}>
						<TouchableOpacity style={styles.buttonEdit} onPress={handleModificar}>
							<Icon name="pencil" size={20} color="white" />
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.buttonDelete}
							onPress={() => handleEliminar(item)}
						>
							<Icon
								name="trash"
								size={20}
								color="white"
								// style={{ backgroundColor: "red" }}
							/>
						</TouchableOpacity>
					</View>
				</View>
			</TouchableOpacity>
		);
	};

	const goToRegister = () => {
		navigation.navigate("ModificarPersona");
	};
	// {isClienteCredito ? "Seleccione al cliente para el credito" : ""}
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
				<TouchableOpacity style={styles.BotonSearch} onPress={BuscarPersonas}>
					<Icon name="search" size={24} color="#FFF" />
				</TouchableOpacity>
				<TouchableOpacity style={styles.BotonAgregar} onPress={goToRegister}>
					<Icon name="plus" size={24} color="#FFF" />
				</TouchableOpacity>
			</View>

			<FlatList
				style={{ width: "100%" }}
				data={personas}
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

	BotonSearch: {
		backgroundColor: "#5cb85c",
		width: 50,
		height: 40,
		borderRadius: 5,
		alignItems: "center",
		justifyContent: "center",
	},

	BotonAgregar: {
		backgroundColor: "orange",
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
	buttonEdit: {
		backgroundColor: "rgb(12,177,234)",
		width: 50,
		height: 40,
		padding: 5,
		borderRadius: 5,
		marginRight: 5,
		alignItems: "center",
		justifyContent: "center",
	},
	buttonDelete: {
		backgroundColor: "red",
		width: 50,
		height: 40,
		padding: 5,
		borderRadius: 5,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default ListarClienteScreen;
