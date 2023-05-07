import React, { useState, useEffect } from "react";

import MapView, { Marker } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";

import { RootStackParamList } from "../../../App";
import { StackNavigationProp } from "@react-navigation/stack";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	Alert,
	ScrollView,
} from "react-native";

type homeScreenProp = StackNavigationProp<RootStackParamList, "DrawerScreen">;

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const RegistroClienteMapa_Screen = ({ route }: any) => {
	const [marker, setMarker] = useState({
		latitude: -8.11177451876017,
		longitude: -79.0286967806073,
	});

	const [currentLocation, setCurrentLocation] = useState(null);

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
		latitude: -8.11177451876017,
		longitude: -79.0286967806073,
		latitudeDelta: 0, //0.0922,
		longitudeDelta: 0, //0.0421,
	});

	return (
		<>
			<View style={[styles.ContenedorPrincipalSearch, { position: "relative" }]}>
				{/* <View style={styles.ContenedorSearch}>
				<View style={styles.TextInputSearch}>
					<Text>Cliente Mapa</Text>
				</View>
			</View> */}

				<MapView
					maxZoomLevel={15}
					minZoomLevel={15}
					style={{ width: "100%", height: "100%", alignSelf: "center" }}
					region={region}
					onRegionChangeComplete={(region) => setRegion(region)}
				>
					<Marker
						draggable
						onDragEnd={onMarkerDragEnd}
						coordinate={marker}
						pinColor={"red"}
					/>
				</MapView>
			</View>
			<View
				style={{
					position: "absolute",
					width: "100%",
					top: 10,
					left: 0,
					backgroundColor: "#fff",
					borderRadius: 10,
					padding: 10,
					elevation: 10,
				}}
			>
				<Text>Direccion:</Text>
				<TextInput
					style={{
						padding: 10,
						borderColor: "#ccc",
						borderWidth: 1,
						marginTop: 10,
						borderRadius: 10,
					}}
					value=""
					placeholder="direccion"
				/>
				<GooglePlacesAutocomplete
					placeholder="Search"
					onPress={(data, details = null) => {
						// 'details' is provided when fetchDetails = true
						console.log(data, details);
					}}
					query={{
						key: "YOUR API KEY",
						language: "en",
					}}
				/>
			</View>
		</>
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
