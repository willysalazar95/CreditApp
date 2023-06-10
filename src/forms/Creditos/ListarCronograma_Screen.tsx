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
import { formatoFecha, formatoMonedaPeruana } from "../../utils/utils";

const ListarCronograma_Screen = ({ route }: any) => {
	const [data, setData] = useState([]);
	const navigation = useNavigation();
	const [cNombreCliente, setcNombreCliente] = useState("");
	const [nCredID, setnCredID] = useState(0);

	const ListarCronograma = async () => {
		// console.log(nCredID + " Cod CRed");
		const _Dat = new CreditosCronogramas();
		const response = await _Dat.ListarCreditosCronogramas(nCredID);
		setData(response.data);
	};

	const renderItem = ({ item }: any) => {
		return (
			<TouchableOpacity>
				<View
					style={[
						styles.cardBorder,
						item.nCronoEstado === 1
							? { backgroundColor: "rgba(0, 255, 0, 0.2)" }
							: item.nCronoMontoPagado > 0
								? { backgroundColor: "rgba(255, 165, 0, 0.2)" }
								: { backgroundColor: "rgba(255, 0, 0, 0.2)" },
					]}
				>
					<Text style={styles.cardTitle}>{`Cuota: ${item.nCronoCuota}`}</Text>
					<Text style={styles.cardDesc}>{`Fecha Vencimiento: ${formatoFecha(
						item.dCronoFechaVencimiento
					)}`}</Text>
					<Text style={styles.cardDesc}>{`Fecha Pago: ${formatoFecha(
						item.dCronoFechaPago
					)}`}</Text>
					<Text style={styles.cardDesc}>{`Monto a Pagar : ${formatoMonedaPeruana(
						item.nCronoMonto + item.nCronoInteres + item.nCronoMora
					)}`}</Text>
					<Text style={styles.cardDesc}>{`Monto Pagado: ${formatoMonedaPeruana(
						item.nCronoMontoPagado + item.nCronoInteresPagado + item.nCronoMoraPagada
					)}`}</Text>
					<Text style={styles.cardDesc}>
						<Text>{`Saldo : ${formatoMonedaPeruana(
							(item.nCronoMonto + item.nCronoInteres + item.nCronoMora) -
							(item.nCronoMontoPagado + item.nCronoInteresPagado + item.nCronoMoraPagada)
						)}`}</Text>
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
			else {
				//*****   Nuevo método  *****
				// await SimularCronograma();				
				const _Dat = new CreditosCronogramas();
				const response = await _Dat.simularCronogramas(route.params.nCuotas, route.params.nPeriodo, route.params.FechaPago, route.params.nMonto, route.params.nIdConfig);
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
					marginHorizontal: 20,
					flexDirection: "column",
					flexWrap: "wrap",
				}}
			>
				<Text>Cliente : {cNombreCliente}</Text>
			</View>

			<FlatList
				style={{ width: "100%", paddingHorizontal: 20 }}
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
		marginHorizontal: 20,
		marginVertical: 5,
	},

	TextInputSearch: {
		flex: 1,
		marginRight: 5,
		borderRadius: 10,
		backgroundColor: "#FFF",
		paddingHorizontal: 20,
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
		marginBottom: 10,
		borderRadius: 10,
		padding: 10,
		backgroundColor: "#fff",
	},
	cardTitle: {
		// textTransform: "uppercase",
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
	cardDesc: {
		color: "gray",
	},
});

export default ListarCronograma_Screen;
