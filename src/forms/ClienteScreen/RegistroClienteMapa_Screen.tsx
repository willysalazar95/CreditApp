import React, { useState, useEffect } from "react";
import {
	View,
	StyleSheet,
	Text,
} from "react-native";

import { RootStackParamList } from "../../../App";
import { StackNavigationProp } from "@react-navigation/stack";

type homeScreenProp = StackNavigationProp<RootStackParamList, "DrawerScreen">;

const RegistroClienteMapa_Screen = ({ route }: any) => {
	return (
		<View style={styles.ContenedorPrincipalSearch}>
			<View style={styles.ContenedorSearch}>
				<View style={styles.TextInputSearch}>
					<Text>Cliente Mapa</Text>
				</View>
			</View>
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

export default RegistroClienteMapa_Screen;
