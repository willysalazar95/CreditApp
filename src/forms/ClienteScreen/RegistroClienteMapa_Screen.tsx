import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";

import { RootStackParamList } from "../../../App";
import { StackNavigationProp } from "@react-navigation/stack";

type homeScreenProp = StackNavigationProp<RootStackParamList, "DrawerScreen">;

const RegistroClienteMapa_Screen = ({ route }: any) => {
	const [marker, setMarker] = useState({
		latitude: 0, //-12.026971,
		longitude: 0, //-77.063492,
	});

	const [cLatitud, SETcLatitud] = useState("");
	const [cLongitud, SETcLongitud] = useState("");

	const onMarkerDragEnd = (event: any) => {
		setMarker({
			latitude: event.nativeEvent.coordinate.latitude,
			longitude: event.nativeEvent.coordinate.longitude,
		});
		SETcLatitud(event.nativeEvent.coordinate.latitude);
		SETcLongitud(event.nativeEvent.coordinate.longitude);
	};

	const [region, setRegion] = useState({
		latitude: 0, //-12.026971,
		longitude: 0, //-77.063492,
		latitudeDelta: 0, //0.0922,
		longitudeDelta: 0, //0.0421,
	});
	// const ObtenerUbicacion = async () => {
	// 	// ubicacion
	// 	try {
	// 		const granted = await PermissionsAndroid.request(
	// 			PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
	// 			{
	// 				title: 'Permiso de ubicación',
	// 				message:
	// 					'Esta aplicación necesita acceder a su ubicación para funcionar correctamente.',
	// 				buttonNeutral: 'Preguntar más tarde',
	// 				buttonNegative: 'Cancelar',
	// 				buttonPositive: 'OK',
	// 			},
	// 		);
	// 		if (granted === PermissionsAndroid.RESULTS.GRANTED) {
	// 			Geolocation.getCurrentPosition(
	// 				position => {
	// 					const { latitude, longitude } = position.coords;
	// 					console.log(`Latitud: ${latitude}, Longitud: ${longitude}`);
	// 				},
	// 				error => console.log(error),
	// 				{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
	// 			);
	// 		} else {
	// 			console.log('Permiso de ubicación denegado');
	// 		}
	// 	} catch (err) {
	// 		console.warn(err);
	// 	}
	// }

	return (
		<View style={styles.ContenedorPrincipalSearch}>
			<View style={styles.ContenedorSearch}>
				<View style={styles.TextInputSearch}>
					<Text>Cliente Mapa</Text>
				</View>
			</View>
			{/* <MapView
				maxZoomLevel={20}
				minZoomLevel={14}
				style={{ width: "100%", height: 200, top: 10, alignSelf: "center" }}
				region={region}
				onRegionChangeComplete={(region) => setRegion(region)}
			>
				<Marker
					draggable
					onDragEnd={onMarkerDragEnd}
					coordinate={marker}
					pinColor={"red"}
				/>
			</MapView> */}
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
