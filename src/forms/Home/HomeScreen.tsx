import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Touchable from "react-native-platform-touchable";
import Icon from "react-native-vector-icons/FontAwesome";

class HomeScreen extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.row}>
					<Touchable style={styles.widgets1}>
						<View style={styles.widgetContent}>
							<View style={styles.widgetLeft}>
								<Icon name="user" size={70} color="#FFF"></Icon>
								<Text style={styles.TotalTitle}> 2023</Text>
							</View>
							<Text style={styles.DetalleTitle}>Total Cliente </Text>
						</View>
					</Touchable>

					<Touchable style={styles.widgets2}>
						<View style={styles.widgetContent}>
							<View style={styles.widgetLeft}>
								<Icon name="money" size={70} color="#FFF"></Icon>
								<Text style={styles.TotalTitle}> 2023</Text>
							</View>
							<Text style={styles.DetalleTitle}>Total Cobrado </Text>
						</View>
					</Touchable>
				</View>

				<View style={styles.row}>
					<Touchable style={styles.widgets3}>
						<View style={styles.widgetContent}>
							<View style={styles.widgetLeft}>
								<Icon name="user" size={70} color="#FFF"></Icon>
								<Text style={styles.TotalTitle}> 2023</Text>
							</View>
							<Text style={styles.DetalleTitle}>Total no quiere pagar </Text>
						</View>
					</Touchable>

					<Touchable style={styles.widgets4}>
						<View style={styles.widgetContent}>
							<View style={styles.widgetLeft}>
								<Icon name="user" size={70} color="#FFF"></Icon>
								<Text style={styles.TotalTitle}> 2023</Text>
							</View>
							<Text style={styles.DetalleTitle}>Total de los totales </Text>
						</View>
					</Touchable>
				</View>

				<View style={styles.row}>
					<Touchable style={styles.widgets5}>
						<View style={styles.widgetContent}>
							<View style={styles.widgetLeft}>
								<Icon name="user" size={70} color="#FFF"></Icon>
								<Text style={styles.TotalTitle}> 2023</Text>
							</View>
							<Text style={styles.DetalleTitle}>Total mora </Text>
						</View>
					</Touchable>

					<Touchable style={styles.widgets6}>
						<View style={styles.widgetContent}>
							<View style={styles.widgetLeft}>
								<Icon name="user" size={70} color="#FFF"></Icon>
								<Text style={styles.TotalTitle}> 2023</Text>
							</View>
							<Text style={styles.DetalleTitle}>Enviar la Moto </Text>
						</View>
					</Touchable>
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "flex-start",
		backgroundColor: "#FFFFFF",
	},
	iconWithMargin: {
		marginRight: 50,
	},
	row: {
		flex: 1,
		flexDirection: "row",
		height: 120,
		marginTop: 15,
		marginBottom: 15,
	},
	widgets1: {
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
	widgets2: {
		backgroundColor: "#50E3C2",
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
	widgetContent: {
		flex: 1,
		flexDirection: "column",
		marginLeft: 10,
	},
	widgetLeft: {
		flexDirection: "row",
		alignItems: "center",
	},
	TotalTitle: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#FFF",
		textAlign: "right",
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
