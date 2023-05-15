import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	Alert,
	ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import MapView, { Marker } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";
import { Platform, PermissionsAndroid } from "react-native";

import { Cliente } from "../../clases/Cliente";
import { convertirFechaAAAAMMDD, formatoFecha } from "../../utils/utils";
import { getRelativeCoords } from "react-native-reanimated";

import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";
import { configData } from "../../../config";

import AlertaModal from "../../utils/AlertModal"

type homeScreenProp = StackNavigationProp<RootStackParamList, "DrawerScreen">;
//CREADO POR AAGC
const RegistroCliente_Screen = ({ route }: any) => {
	const navigation = useNavigation<homeScreenProp>();
	const [nIdPers, setNidPers] = useState(0);
	const [dni, setDni] = useState("");
	const [nombre, setNombre] = useState("");
	const [apellido, setApellido] = useState("");
	const [telefono, setTelefono] = useState("");
	const [direccion, setDireccion] = useState("");
	const [cLatitud, SETcLatitud] = useState("");
	const [cLongitud, SETcLongitud] = useState("");

	const [accionBoton, setAccionBoton] = useState("Guardar");
	const [isEditing, setIsEditing] = useState(false);

	const [fechaNac, setFechaNac] = useState(new Date());
	const [fechaAlta, setFechaAlta] = useState(new Date());
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [showDatePicker2, setShowDatePicker2] = useState(false);

	const [MensajeModal1, setMensajeModal1] = useState("");

	const [region, setRegion] = useState({
		latitude: 0, //-12.026971,
		longitude: 0, //-77.063492,
		latitudeDelta: 0, //0.0922,
		longitudeDelta: 0, //0.0421,
	});
	const [marker, setMarker] = useState({
		latitude: 0, //-12.026971,
		longitude: 0, //-77.063492,
	});

	const onMarkerDragEnd = (event: any) => {
		setMarker({
			latitude: event.nativeEvent.coordinate.latitude,
			longitude: event.nativeEvent.coordinate.longitude,
		});
		SETcLatitud(event.nativeEvent.coordinate.latitude);
		SETcLongitud(event.nativeEvent.coordinate.longitude);
	};

	useEffect(() => {
		if (route.params && route.params.item) {
			// console.log(route);

			const persona = route.params.item;
			setNidPers(persona.nClieID);
			setDni(persona.cClieDNI);
			setNombre(persona.cClieNombres);
			setApellido(persona.cClieApellidos);
			setDireccion(persona.cClieDireccion);
			setTelefono(persona.cClieTelefono);
			setFechaNac(new Date(persona.cClieFechNac));
			setFechaAlta(new Date(persona.dClieFechaAlta));
			setIsEditing(true);
			setAccionBoton("Modificar");
		} else {
			setAccionBoton("Registrar");
		}

		// ObtenerUbicacion();
	}, [route.params]);

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

	const handleEnviar = async () => {
		const datCliente = new Cliente(
			nIdPers,
			dni,
			nombre,
			apellido,
			direccion,
			telefono,
			convertirFechaAAAAMMDD(fechaNac),
			"",
			0,
			"0", //cLatitud,
			"0", //cLongitud
			convertirFechaAAAAMMDD(fechaAlta),
			configData.nConfiguracionID.toString()
		);
		const response = isEditing
			? await datCliente.ActualizarCliente()
			: await datCliente.RegistrarCliente();
		 console.log("aqui estamos");
		if (response.success) {
			if (isEditing) {
				//Alert.alert("OK", "Modificado Correctamente " + "!!");
				setTituloModal("MyBankito");
				setMensajeModal1("Registro actualizado ");
				setAlertVisible(true);
			} else {
				//Alert.alert("OK", "Registrado Correctamente " + "!!");
				setTituloModal("MyBankito");
				setMensajeModal1("Registrado Correctamente ");
				setAlertVisible(true);
			}
			setAlertVisible(true);
			//navigation.goBack();
		} else {
			//Alert.alert("ERROR", response.error);
			setTituloModal("MyBankito");
			setMensajeModal1("ERROR" + response.error);
			setAlertVisible(true);
		}
		//Para que funcione la ventana modal
		console.log(MensajeModal1);
		
	};

	const abrirMapa = () => {
		navigation.navigate("Mapa_Screen", { item: "" });
	};


	//Inicio Ventana Modal - Prueba
	const [isAlertVisible, setAlertVisible] = useState(false);
	const [tituloModal, setTituloModal] = useState('');
	const [alertMessage, setAlertMessage] = useState('');

	const ocultarAlertaModal = () => {
		setAlertVisible(false);
	};

	const abrirAlertaModal = () => {
		const timestamp = Date.now();
		if (timestamp % 2 === 0) {
			setTituloModal('even');
			setAlertMessage(`timestamp is even!: ${timestamp}`);
		} else {
			setTituloModal('odd');
			setAlertMessage(`timestamp is odd!: ${timestamp}`);
		}
		setAlertVisible(true);
	};
	//Fin de Ventana Modal

	return (
		<View style={styles.ContenedorPrincipal}>
			<ScrollView>
				{/* <Text style={styles.TituloContenedor}>
					{isEditing ? "Modificar " : "Nuevo"} Cliente
				</Text> */}
				<View style={styles.TextInputContenedor}>
					<Text style={styles.TextLabel}>DNI:</Text>
					<TextInput
						style={styles.TextInput}
						value={dni}
						onChangeText={setDni}
						keyboardType="numeric"
						placeholder="Ingrese dni"
						placeholderTextColor="#D3D3D3"
						textAlignVertical="top"
					/>
					<Text style={styles.TextLabel}>Nombre:</Text>
					<TextInput
						style={styles.TextInput}
						value={nombre}
						onChangeText={setNombre}
						placeholder="Iingrese nombre"
						placeholderTextColor="#D3D3D3"
						textAlignVertical="top"
					/>
					<Text style={styles.TextLabel}>Apellido:</Text>
					<TextInput
						style={styles.TextInput}
						value={apellido}
						onChangeText={setApellido}
						placeholder="Ingrese apellido"
						placeholderTextColor="#D3D3D3"
						textAlignVertical="top"
					/>
					<Text style={styles.TextLabel}>Teléfono:</Text>
					<TextInput
						style={styles.TextInput}
						value={telefono}
						onChangeText={setTelefono}
						keyboardType="phone-pad"
						placeholder="Ingrese telefono"
						placeholderTextColor="#D3D3D3"
						textAlignVertical="top"
					/>
					<Text style={styles.TextLabel}>Dirección:</Text>
					<TextInput
						style={styles.TextInput}
						value={direccion}
						onChangeText={setDireccion}
						placeholder="Ingrese direccion"
						placeholderTextColor="#D3D3D3"
						textAlignVertical="top"
					/>
					<Text style={styles.TextLabel}>Fecha Nac:</Text>
					<TouchableOpacity onPress={() => setShowDatePicker(true)}>
						<Text style={styles.TextInput}>{formatoFecha(fechaNac.toString())}</Text>
						{showDatePicker && (
							<DateTimePicker
								value={fechaNac}
								mode="date"
								display="default"
								onChange={(event, selectedDate) => {
									const currentDate = selectedDate || fechaNac;
									setShowDatePicker(false);
									setFechaNac(currentDate);
								}}
							/>
						)}
					</TouchableOpacity>
					<Text style={styles.TextLabel}>Fecha Alta:</Text>
					<TouchableOpacity onPress={() => setShowDatePicker2(true)}>
						<Text style={styles.TextInput}>{formatoFecha(fechaAlta.toString())}</Text>
						{showDatePicker2 && (
							<DateTimePicker
								value={fechaAlta}
								mode="date"
								display="default"
								onChange={(event, selectedDate) => {
									const currentDate = selectedDate || fechaAlta;
									setShowDatePicker2(false);
									setFechaAlta(currentDate);
								}}
							/>
						)}
					</TouchableOpacity>
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

				<TouchableOpacity style={styles.buttonMapa} onPress={abrirMapa}>
					<Text style={styles.buttonMapaText}>Mapa</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={handleEnviar}>
					<Text style={styles.buttonText}>{accionBoton}</Text>
				</TouchableOpacity>
				<AlertaModal
					titulo={tituloModal}
					mensaje={MensajeModal1}
					visible={isAlertVisible}
					onConfirm={ocultarAlertaModal}
				/>

				 

			</ScrollView>

		</View>
	);
};

const styles = StyleSheet.create({
	ContenedorPrincipal: {
		flex: 1,
		backgroundColor: "#fff",
		padding: 20,
	},
	TituloContenedor: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
		color: "#5cb85c",
	},
	TextInputContenedor: {
		marginBottom: 10,
	},
	TextLabel: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 5,
	},
	TextInput: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
		padding: 10,
		fontSize: 16,
	},
	button: {
		backgroundColor: "#5cb85c",
		padding: 10,
		borderRadius: 5,
		alignItems: "center",
		marginTop: 20,
		height: 50,
	},
	buttonText: {
		color: "#FFF",
		fontSize: 20,
		fontWeight: "bold",
	},
	buttonMapa: {
		backgroundColor: "#F44336",
		padding: 10,
		borderRadius: 5,
		alignItems: "center",
		marginTop: 20,
		height: 50,
	},
	buttonMapaText: {
		color: "#FFF",
		fontSize: 20,
		fontWeight: "bold",
	},
});
export default RegistroCliente_Screen;
