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
import Icon from "react-native-vector-icons/FontAwesome";
import { Creditos } from "../../clases/Creditos";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";

type homeScreenProp = StackNavigationProp<RootStackParamList, "DrawerScreen">;

import { configData } from "../../../config";
import { convertirFechaAAAAMMDD, formatoFecha } from "../../utils/utils";
import DateTimePicker from "@react-native-community/datetimepicker";

const Creditos_Screen = () => {
	const [data, setData] = useState([]);
	const navigation = useNavigation<homeScreenProp>();
	const [query, setQuery] = useState("");
	const [abrirFechaInicio, setAbrirFechaInicio] = useState(false);
	const [abrirFechaFin, setAbrirFechaFin] = useState(false);
	const [fechaInicio, setFechaInicio] = useState(new Date());
	const [fechaFin, setFechaFin] = useState(new Date());

	const ListarCreditos = async () => {
		const _Dat = new Creditos(
			0,
			0,
			"",
			0,
			0,
			0,
			0,
			0,
			"",
			0,
			0,
			0,
			0,
			configData.nUsuId,
			configData.nCredRutasID,
			convertirFechaAAAAMMDD(fechaInicio),
			convertirFechaAAAAMMDD(fechaFin)
		);
		const response = await _Dat.ListarCreditos();
		setData(response.data);
	};

	const BuscarCreditos = async () => {
		const _Dat = new Creditos(
			0,
			0,
			"",
			0,
			0,
			0,
			0,
			0,
			"",
			0,
			0,
			0,
			0,
			configData.nUsuId,
			configData.nCredRutasID,
			convertirFechaAAAAMMDD(fechaInicio),
			convertirFechaAAAAMMDD(fechaFin)
		);
		const response = await _Dat.ListarCreditos();
		const filteredData = response.data.filter((item: any) => {
			return (item.cClieDescripcion ?? "")
				.toLowerCase()
				.includes(query.toLowerCase());
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
			navigation.navigate("PagarPrestamo", { idCredito: item.nCredID });
		};

		const VerCronograma = () => {
			const pantalla: string = "ListarCreditos";
			navigation.navigate("ListarCronograma_Screen", { pantalla, credito: item });
		};
		console.log(item);

		return (
			<TouchableOpacity>
				<View style={styles.cardBorder}>
					<Text style={styles.cardTitle}>
						{item.cClieDescripcion} {item.dCredFechaFin.substring(0, 10)}
					</Text>
					<Text style={styles.cardTitle}>
						MONTO TOTAL S/. {item.nCredMonto + item.nCredMontoInteres} {"\n"}
						PENDIENTE S/. {item.nCredMontoDeuda - item.nCredMontoPagado}
					</Text>
					<View style={styles.buttonsContainer}>
						<TouchableOpacity style={styles.buttonEdit} onPress={VerCronograma}>
							{/* <Text style={styles.buttonText}>Ver Datos</Text> */}
							<Icon name="eye" size={25} color="white" />
						</TouchableOpacity>
						<TouchableOpacity style={styles.buttonDelete} onPress={PagarCredito}>
							{/* <Text style={styles.buttonText}>Realizar Pago</Text> */}
							<Icon name="money" size={25} color="white" />
						</TouchableOpacity>
					</View>
				</View>
			</TouchableOpacity>
		);
	};

	const SelecClienteNuevoCredito = () => {
		navigation.navigate("ListarPersonas", { pantalla: "credito" });
		navigation.setOptions({ title: "Seleccione un cliente" });
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

				<TouchableOpacity style={styles.BotonSearch} onPress={BuscarCreditos}>
					<Icon name="search" size={24} color="#FFF" />
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.BotonAgregar}
					onPress={SelecClienteNuevoCredito}
				>
					<Icon name="plus" size={24} color="#FFF" />
				</TouchableOpacity>
			</View>
			<View style={styles.ContenedorFechas}>
				<TouchableOpacity
					style={[styles.TextInput, { marginRight: 10 }]}
					onPress={() => setAbrirFechaInicio(true)}
				>
					<Text>{formatoFecha(fechaInicio.toString())}</Text>
					{abrirFechaInicio && (
						<DateTimePicker
							value={fechaInicio}
							mode="date"
							display="default"
							onChange={(event, selectedDate) => {
								const currentDate = selectedDate || fechaInicio;
								setAbrirFechaInicio(false);
								setFechaInicio(currentDate);
							}}
						/>
					)}
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.TextInput}
					onPress={() => setAbrirFechaFin(true)}
				>
					<Text>{formatoFecha(fechaFin.toString())}</Text>
					{abrirFechaFin && (
						<DateTimePicker
							value={fechaFin}
							mode="date"
							display="default"
							onChange={(event, selectedDate) => {
								const currentDate = selectedDate || fechaFin;
								setAbrirFechaFin(false);
								setFechaFin(currentDate);
							}}
						/>
					)}
				</TouchableOpacity>
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
	ContenedorFechas: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		height: 60,
		paddingHorizontal: 10,
	},
	TextInput: {
		width: "50%",
		flex: 1,
		borderRadius: 10,
		backgroundColor: "#FFF",
		padding: 10,
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
		marginTop: 10,
		alignItems: "center",
	},
	buttonEdit: {
		backgroundColor: "rgb(12,177,234)",
		borderRadius: 10,
		padding: 10,
		marginRight: 10,
	},
	buttonDelete: {
		backgroundColor: "#f00",
		borderRadius: 10,
		padding: 10,
	},
	buttonText: {
		color: "#FFF",
	},
});

export default Creditos_Screen;
