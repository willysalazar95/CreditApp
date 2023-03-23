import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const ImprimirScreen = () => {
	const navigation = useNavigation();

	const PantallaReporteCredito = () => {
		navigation.navigate("ReporteCreditos");
	};

	const opciones = [
		{
			position: 0,
			text: "Reporte de Créditos",
			pantalla: PantallaReporteCredito,
		},
		{
			position: 1,
			text: "Reporte de Créditos 2 ",
			pantalla: PantallaReporteCredito,
		},
		{
			position: 2,
			text: "Reporte de Créditos 3",
			pantalla: PantallaReporteCredito,
		},
		{
			position: 3,
			text: "Reporte de Créditos 4",
			pantalla: PantallaReporteCredito,
		},
		{
			position: 4,
			text: "Reporte de Créditos 5",
			pantalla: PantallaReporteCredito,
		},
		{
			position: 5,
			text: "Reporte de Créditos 6",
			pantalla: PantallaReporteCredito,
		},
	];

	const renderItem = ({ item }) => {
		return (
			<TouchableOpacity style={styles.widget} onPress={() => item.pantalla()}>
				<Icon name="print" size={50} color="#fff"></Icon>
				<Text>{item.text}</Text>
			</TouchableOpacity>
		);
	};

	return (
		<FlatList
			style={styles.list}
			data={opciones}
			renderItem={renderItem}
			keyExtractor={(item) => item.position}
		/>
	);
};

const styles = StyleSheet.create({
	list: {
		flex: 1,
		marginBottom: 10,
		width: "100%",
		padding: 20,
		backgroundColor: "red",
	},

	widget: {
		borderStyle: "solid",
		borderWidth: 1,
		backgroundColor: "#5cb85c",
		borderRadius: 20,
		padding: 20,
		marginBottom: 10,
	},
	title: {
		color: "fff",
	},
});
export default ImprimirScreen;
