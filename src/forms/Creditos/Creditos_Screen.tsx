import React, { useState, useEffect } from "react";
import {
	FlatList,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { Creditos } from "../../clases/Creditos";
import { Cliente } from "../../clases/Cliente";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";
// import { Icon } from "react-native-vector-icons/Icon";

type homeScreenProp = StackNavigationProp<RootStackParamList, "DrawerScreen">;

const Creditos_Screen = () => {
	const [data, setData] = useState([]);
	const navigation = useNavigation<homeScreenProp>();
	const [query, setQuery] = useState("");

	const ListarCreditos = async () => {
		const _Dat = new Creditos();
		const response = await _Dat.ListarCreditos();
		console.log(response.data);
		setData(response.data);
	};

	const BuscarCreditos = async () => {
		const _Dat = new Creditos();
		const response = await _Dat.ListarCreditos();
		const filteredData = response.data.filter((item: Cliente) => {
			return item.cClieNombresGet.toLowerCase().includes(query.toLowerCase());
		});
		setData(filteredData);
		setQuery("");
	};

	useEffect(() => {
		ListarCreditos();
	}, []);

	useFocusEffect(
		React.useCallback(() => {
			BuscarCreditos();
		}, [])
	);

	const renderItem = ({ item }: any) => {
		const PagarCredito = () => {
			navigation.navigate("PagarPrestamo", { credito: item });
		};

		const VerCronograma = () => {
			navigation.navigate("ListarCronograma");
		};

		return (
			<TouchableOpacity>
				<View style={styles.cardBorder}>
					<Text style={styles.cardTitle}>{item.cClieDescripcion}</Text>
					<Text>
						S/ {item.nCredMonto} | {item.dCredFechaFin}
					</Text>
					<View style={styles.buttonsContainer}>
						<TouchableOpacity style={styles.buttonEdit} onPress={VerCronograma}>
							<Text style={styles.buttonText}>Ver Datos</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.buttonDelete} onPress={PagarCredito}>
							<Text style={styles.buttonText}>Realizar Pago</Text>
						</TouchableOpacity>
					</View>
				</View>
			</TouchableOpacity>
		);
	};

	const SelecClienteNuevoCredito = () => {
		navigation.navigate("ListarPersonas", { opcion: 2 });
	};

	return (
		<View style={styles.container}>
			<View style={styles.searchContainer}>
				<View style={styles.inputContainer}>
					<TextInput placeholder="Buscar" value={query} onChangeText={setQuery} />
				</View>
				<TouchableOpacity style={styles.buttonSearch} onPress={BuscarCreditos}>
					{/* <Icon name="user" size={24} color="#FFF" /> */}
				</TouchableOpacity>
			</View>
			<FlatList
				style={{ width: "100%" }}
				data={data}
				renderItem={renderItem}
				keyExtractor={(item, index) => index.toString()}
			/>
			<TouchableOpacity style={styles.button} onPress={SelecClienteNuevoCredito}>
				<Text style={styles.text}>+</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
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
	container: {
		flex: 1,
	},
	button: {
		backgroundColor: "#5cb85c",
		borderRadius: 30,
		width: 60,
		height: 60,
		margin: 10,
		alignItems: "center",
		justifyContent: "center",
		elevation: 3,
		position: "absolute",
		bottom: 10,
		right: 10,
		zIndex: 1,
	},
	text: {
		fontSize: 24,
		color: "white",
		fontWeight: "bold",
	},
	buttonsContainer: {
		flexDirection: "row",
		justifyContent: "flex-end",
		marginTop: 10,
	},
	buttonEdit: {
		backgroundColor: "rgb(12,177,234)",
		borderRadius: 5,
		padding: 5,
		marginRight: 10,
	},
	buttonDelete: {
		backgroundColor: "#f00",
		borderRadius: 5,
		padding: 5,
	},
	buttonText: {
		color: "#FFF",
	},
	searchContainer: {
		flexDirection: "row",
		marginHorizontal: 10,
		marginVertical: 5,
	},
	inputContainer: {
		flex: 1,
		marginRight: 5,
		borderRadius: 10,
		backgroundColor: "#FFF",
		paddingHorizontal: 10,
	},
	buttonSearch: {
		backgroundColor: "#5cb85c",
		width: 50,
		height: 40,
		borderRadius: 5,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default Creditos_Screen;
