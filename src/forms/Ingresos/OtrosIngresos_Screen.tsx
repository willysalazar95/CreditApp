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

import { Cliente } from "../../clases/Cliente";

import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";
import { configData } from "../../../config";

import AlertaModal from "../../utils/AlertModal"

type homeScreenProp = StackNavigationProp<RootStackParamList, "DrawerScreen">;
//CREADO POR AAGC
const OtrosIngresos_Screen = () => {
    const navigation = useNavigation<homeScreenProp>();

    useEffect(() => {
    },);

    const handleEnviar = async () => {
        const datCliente = new Cliente(

        );
        const response = await datCliente.RegistrarCliente();

        if (response.success) {
            setTituloModal("MyBankito");
            setMensajeModal1("Registro actualizado ");
            setAlertVisible(true);
            setAlertVisible(true);
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
    const [MensajeModal1, setMensajeModal1] = useState("");
    const [isAlertVisible, setAlertVisible] = useState(false);
    const [tituloModal, setTituloModal] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    const ocultarAlertaModal = () => {
        setAlertVisible(false);
    };


    //Fin de Ventana Modal

    return (
        <View style={styles.ContenedorPrincipal}>
            <ScrollView>
                <View style={styles.TextInputContenedor}>
                    <Text style={styles.TextLabel}>DNI:</Text>
                    <TextInput
                        style={styles.TextInput}
                        // value={dni}
                        // onChangeText={setDni}
                        keyboardType="numeric"
                        placeholder="Ingrese dni"
                        placeholderTextColor="#D3D3D3"
                        textAlignVertical="top"
                    />
                    <Text style={styles.TextLabel}>Nombre:</Text>
                    <TextInput
                        style={styles.TextInput}
                        // value={nombre}
                        // onChangeText={setNombre}
                        placeholder="Iingrese nombre"
                        placeholderTextColor="#D3D3D3"
                        textAlignVertical="top"
                    />
                    <Text style={styles.TextLabel}>Apellido:</Text>
                    <TextInput
                        style={styles.TextInput}
                        // value={apellido}
                        // onChangeText={setApellido}
                        placeholder="Ingrese apellido"
                        placeholderTextColor="#D3D3D3"
                        textAlignVertical="top"
                    />
                    <Text style={styles.TextLabel}>Teléfono:</Text>
                    <TextInput
                        style={styles.TextInput}
                        // value={telefono}
                        // onChangeText={setTelefono}
                        keyboardType="phone-pad"
                        placeholder="Ingrese telefono"
                        placeholderTextColor="#D3D3D3"
                        textAlignVertical="top"
                    />
                    <Text style={styles.TextLabel}>Dirección:</Text>
                    <TextInput
                        style={styles.TextInput}
                        // value={direccion}
                        // onChangeText={setDireccion}
                        placeholder="Ingrese direccion"
                        placeholderTextColor="#D3D3D3"
                        textAlignVertical="top"
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleEnviar}>
                    <Text style={styles.buttonText}>Boton</Text>
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
export default OtrosIngresos_Screen;
