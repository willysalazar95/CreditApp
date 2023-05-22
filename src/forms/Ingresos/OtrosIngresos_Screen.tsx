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
 
import { Picker } from "@react-native-picker/picker";


import { Cliente } from "../../clases/Cliente";

import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";
import { configData } from "../../../config";
import { convertirFechaAAAAMMDD, formatoFecha } from "../../utils/utils";

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


    const [dni, setDni] = useState("");
    const [nombre, setNombre] = useState("");
    const [tipoIngreso, setTipoIngreso] = useState("");
    const [fecha, setFecha] = useState(new Date());
    const [monto, setMonto] = useState(0);
    const [showDatePicker, setShowDatePicker] = useState(false);

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
                        placeholder="Ingrese nombre"
                        placeholderTextColor="#D3D3D3"
                        textAlignVertical="top"
                    />
                    <Text style={styles.TextLabel}>Tipo Ingreso:</Text>
                    
                        {/*
                        <View style={styles.TextInputContenedor}>
                            <Text style={styles.TextLabel}>Periodo:</Text>
                            <Picker
                                selectedValue={selectedValue}
                                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                            >
                                {options.map((item: any, index) => {
                                    return (
                                        <Picker.Item
                                            label={item.cPerDescripcion}
                                            value={item.nPerID}
                                            key={index}
                                        />
                                    );
                                })}
                            </Picker>
                        </View>
                        */}
                        
                        <Text style={styles.TextLabel}>Monto:</Text>
                        <TextInput
                            style={styles.TextInput}
                            keyboardType="number-pad"
                            //  value={monto}
                            //onChangeText={setMonto}
                            placeholder="Ingrese Monto"
                            placeholderTextColor="#D3D3D3"
                            textAlignVertical="top"
                        />
                        <Text style={styles.TextLabel}>Fecha:</Text>
                        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                            <Text style={styles.TextInput}>{formatoFecha(fecha.toString())}</Text>
                            {showDatePicker && (
                                <DateTimePicker
                                    value={fecha}
                                    mode="date"
                                    display="default"
                                    onChange={(event, selectedDate) => {
                                        const currentDate = selectedDate || fecha;
                                        setShowDatePicker(false);
                                        setFecha(currentDate);
                                    }}
                                />
                            )}
                        </TouchableOpacity>

                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleEnviar}>
                        <Text style={styles.buttonText}>Grabar</Text>
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
