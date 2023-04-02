import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { ListRenderItem } from "react-native";
import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { RootStackParamList } from "../../../App";

interface Opciones {
	icon: string;
	backgroundColor: string;
	position: number;
	text: string;
	pantalla: () => void;
}
type homeScreenProp = StackNavigationProp<RootStackParamList, "DrawerScreen">;

const ImprimirScreen = () => {
	const navigation = useNavigation<homeScreenProp>();

	const PantallaReporteCredito = () => {
		navigation.navigate("ReporteCreditos");
	};

	const PantallaReportePagos = () => {
		navigation.navigate("ReportePagos");
	};

	const PantallaReporteClientes = () => {
		navigation.navigate("ReporteClientes");
	};

	const opciones: Opciones[] = [
		{
			icon: "person-outline",
			backgroundColor: "#5cb85c",
			position: 0,
			text: "Reporte de Clientes",
			pantalla: PantallaReporteClientes,
		},
		{
			icon: "cash-outline",
			backgroundColor: "#50E3C2",
			position: 0,
			text: "Reporte de Créditos",
			pantalla: PantallaReporteCredito,
		},
		{
			icon: "card-outline",
			backgroundColor: "#9013FE",
			position: 0,
			text: "Reporte de Pagos",
			pantalla: PantallaReportePagos,
		},
	];

	const renderItem: ListRenderItem<Opciones> = ({ item }) => {
		return (
			<TouchableOpacity
				style={[styles.widget, { backgroundColor: item.backgroundColor }]}
				onPress={() => item.pantalla()}
			>
				<Icon style={styles.icon} name={item.icon} size={50} color="#fff"></Icon>
				<Text style={styles.title}>{item.text}</Text>
			</TouchableOpacity>
		);
	};

	return (
		<FlatList
			style={styles.list}
			data={opciones}
			renderItem={renderItem}
			keyExtractor={(item, index) => index.toString()}
		/>
	);
};

const styles = StyleSheet.create({
	list: {
		flex: 1,
		marginBottom: 10,
		width: "100%",
		padding: 20,
	},

	widget: {
		display: "flex",
		flexDirection: "row",
		borderStyle: "solid",
		borderRadius: 20,
		padding: 20,
		marginBottom: 10,
		elevation: 2,
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		width: "80%",
		color: "#fff",
		fontSize: 20,
		fontWeight: "bold",
	},
	icon: {
		width: "20%",
	},
});
export default ImprimirScreen;
