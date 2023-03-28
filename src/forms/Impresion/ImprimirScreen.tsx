import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { ListRenderItem } from "react-native";
import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { RootStackParamList } from "../../../App";

interface Opciones {
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

	const opciones: Opciones[] = [
		{
			position: 0,
			text: "Reporte de Créditos",
			pantalla: PantallaReporteCredito,
		},
	];

	const renderItem: ListRenderItem<Opciones> = ({ item }) => {
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
