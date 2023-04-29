import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Touchable from "react-native-platform-touchable";
import Icon from "react-native-vector-icons/Ionicons";
import { configData } from "../../../config";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";
import { useNavigation } from "@react-navigation/native";

type homeScreenProp = StackNavigationProp<RootStackParamList, "DrawerScreen">;

const HomeScreen = () => {
	const navigation = useNavigation<homeScreenProp>();	 

	return (
		<View style={styles.ContenedorPrincipal}>
			<View style={styles.CajaContenedor}>
				<Touchable
					style={styles.widgets1}
					onPress={() => {
						navigation.navigate("ListarPersonas", {} );
						navigation.setOptions({ title: 'Inicio' });
						 
					//	navigation.setOptions({ headerTitle: 'header Set in Navigator' });
						  				
					}}
				>
					<View style={styles.ContenedorWidget}>
						<Icon name="person-outline" size={70} color="#FFF"></Icon>
						{/* <Text style={styles.TotalTitle}> 2023</Text> */}
						<Text style={styles.DetalleTitle}>
							CLIENTE
							{/* {configData.nConfiguracionID} */}
						</Text>
					</View>
				</Touchable>

				<Touchable
					style={styles.widgets6}
					onPress={() => {
						navigation.navigate("ListarCreditos");						
						navigation.setOptions({ title: 'CREDITO - Elija un cliente' });
					}}
				>
					<View style={styles.ContenedorWidget}>
						<Icon name="cash-outline" size={70} color="#FFF"></Icon>
						{/* <Text style={styles.TotalTitle}> 2023</Text> */}
						<Text style={styles.DetalleTitle}>CREDITO</Text>
					</View>
				</Touchable>
			</View>

			<View style={styles.CajaContenedor}>
				<Touchable
					style={styles.widgets3}
					onPress={() => {
						navigation.navigate("SimularCredito");
					}}
				>
					<View style={styles.ContenedorWidget}>

					 <Icon name="alarm-outline" size={70} color="#FFF"></Icon>
						{/* <Text style={styles.TotalTitle}> 2023</Text> */}
						<Text style={styles.DetalleTitle}>SIMULADOR</Text>
					</View>
				</Touchable>

				<Touchable
					style={styles.widgets4}
					onPress={() => {
						navigation.navigate("ListarPagos");
					}}
				>
					<View style={styles.ContenedorWidget}>
						<Icon name="card-outline" size={70} color="#FFF"></Icon>
						{/* <Text style={styles.TotalTitle}> 2023</Text> */}
						<Text style={styles.DetalleTitle}>PAGOS</Text>
					</View>
				</Touchable>
			</View>

			<View style={styles.CajaContenedor}>
				<Touchable
					style={styles.widgets2}
					onPress={() => {
						navigation.navigate("ListarCierre");
					}}
				>
					<View style={styles.ContenedorWidget}>
						<Icon name="lock-closed-outline" size={70} color="#FFF"></Icon>
						{/* <Text style={styles.TotalTitle}> 2023</Text> */}
						<Text style={styles.DetalleTitle}>CIERRE</Text>
					</View>
				</Touchable>

				<Touchable
					style={styles.widgets5}
					onPress={() => {
						navigation.navigate("ListarImprimir");
					}}
				>
					<View style={styles.ContenedorWidget}>
						<Icon name="print-outline" size={70} color="#FFF"></Icon>
						{/* <Text style={styles.TotalTitle}> 2023</Text> */}
						<Text style={styles.DetalleTitle}>REPORTES</Text>
					</View>
				</Touchable>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	ContenedorPrincipal: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "flex-start",
		backgroundColor: "#FFFFFF",
	},
	CajaContenedor: {
		flex: 1,
		flexDirection: "row",
		height: 120,
		marginTop: 15,
		marginBottom: 15,
	},
	widgets1: {
		backgroundColor: "#00FF00",
		elevation: 2,
		width: "44%",
		marginLeft: 15,
		borderRadius: 20,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
	},
	widgets2: {
		backgroundColor: "#5cb85c",
		elevation: 2,
		width: "44%",
		marginLeft: 15,
		borderRadius: 20,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
	},
	widgets3: {
		backgroundColor: "#9013FE",
		elevation: 2,
		width: "44%",
		marginLeft: 15,
		borderRadius: 20,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
	},
	widgets4: {
		backgroundColor: "#F44336",
		elevation: 2,
		width: "44%",
		marginLeft: 15,
		borderRadius: 20,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
	},
	widgets5: {
		backgroundColor: "#5C6BC0",
		elevation: 2,
		width: "44%",
		marginLeft: 15,
		borderRadius: 20,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
	},
	widgets6: {
		backgroundColor: "#FF9800",
		elevation: 2,
		width: "44%",
		marginLeft: 15,
		borderRadius: 20,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
	},
	ContenedorWidget: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
	},
	DetalleTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 5,
		color: "#FFF",
		marginRight: 5,
	},


});
export default HomeScreen;
