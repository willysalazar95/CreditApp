import React, { useState, useEffect } from "react";
import {
	View,
	StyleSheet,
	Text,
	FlatList,
	TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CreditosCronogramas } from "../../clases/CreditosCronogramas";

const ListarCronograma_Screen = ({ route }: any) => {
	const [data, setData] = useState([]);
	const navigation = useNavigation();
	const [cNombreCliente, setcNombreCliente] = useState("");
	const [nCredID, setnCredID] = useState(0);

	const ListarCronograma = async () => {
		console.log(nCredID + " Cod CRed");
		const _Dat = new CreditosCronogramas();
		const response = await _Dat.ListarCreditosCronogramas(nCredID);
		setData(response.data);
	};

	const renderItem = ({ item }: any) => {
		return (
			<TouchableOpacity>
				<View style={styles.cardBorder}>
					<Text style={styles.cardTitle}>{`Cuota: ${item.nCronoCuota}`}</Text>
					{<Text>{`Monto : ${item.nCronoMonto}`}</Text>}
					{<Text>{`Pagado: ${item.nCronoMontoPagado}`}</Text>}
					<Text style={styles.cardTitle}>
						{<Text>{`Saldo : ${item.nCronoMonto - item.nCronoMontoPagado}`}</Text>}
					</Text>
				</View>
			</TouchableOpacity>
		);
	};

	useEffect(() => {
		async function fetchData() {
			if (route.params && route.params.credito) {
				const credito = route.params.credito;
				setcNombreCliente(credito.cClieDescripcion);
				setnCredID(credito.nCredID);

				// await ListarCronograma();
				const _Dat = new CreditosCronogramas();
				const response = await _Dat.ListarCreditosCronogramas(credito.nCredID);
				setData(response.data);
			}
		}

		fetchData();
	}, [route.params]);

	return (
		<View style={styles.ContenedorPrincipalSearch}>
			<View
				style={{
					marginVertical: 1,
					marginHorizontal: 16,
					flexDirection: "column",
					flexWrap: "wrap",
				}}
			>
				<Text>Cliente : {cNombreCliente}</Text>
			</View>

			<FlatList
				style={{ width: "100%" }}
				data={data}
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

export default ListarCronograma_Screen;
