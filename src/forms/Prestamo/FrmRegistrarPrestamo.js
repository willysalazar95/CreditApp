import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from "react-native";
import { useNavigation, CommonActions   } from "@react-navigation/native";
import { DatosCreditos } from "../../clases/DatosCreditos";

const FrmRegistrarPrestamo = ({ route }) => {
    const navigation = useNavigation();

    const [nIdPers, setNidPers] = useState("");
    const [dni, setDni] = useState("");
    const [nombre, setNombre] = useState("");
    const [dFechaCred, SetFechaCredito] = useState("");
    const [nIdPeriodo, SetnIdPeriodo] = useState("");
    const [nMonto, SetnMonto] = useState("");
    const [nInteres, SetnInteres] = useState("");
    const [nCuotas, SetnCuotas] = useState("");

    useEffect(() => {
        if (route.params && route.params.persona) {
            const persona = route.params.persona;
            setNidPers(persona.nIdPers);
            setDni(persona.cPersDNI);
            setNombre(persona.cPersNombres);
        }
    }, [route.params]);

    const GuardarCredito = async () => {
        const _dCred = new DatosCreditos();
        const response = await _dCred.RegistroCredito(nIdPers, dFechaCred, nIdPeriodo, nMonto, nInteres, nCuotas);
        if (response.success) {
            Alert.alert("OK", "Crédito registrado Correctamente!");
            navigation.goBack();
        } else {
            Alert.alert("ERROR", response.error);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>DNI:</Text>
                <TextInput
                    style={styles.input}
                    value={dni}
                    onChangeText={setDni}
                    keyboardType="text"
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Nombre:</Text>
                <TextInput
                    style={styles.input}
                    value={nombre}
                    onChangeText={setNombre}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Fecha Prestamo:</Text>
                <TextInput
                    style={styles.input}
                    value={dFechaCred}
                    onChangeText={SetFechaCredito}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Periodo:</Text>
                <TextInput
                    style={styles.input}
                    value={nIdPeriodo}
                    onChangeText={SetnIdPeriodo}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Monto:</Text>
                <TextInput
                    style={styles.input}
                    value={nMonto}
                    onChangeText={SetnMonto}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Interes:</Text>
                <TextInput
                    style={styles.input}
                    value={nInteres}
                    onChangeText={SetnInteres}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Cuotas:</Text>
                <TextInput
                    style={styles.input}
                    value={nCuotas}
                    onChangeText={SetnCuotas}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={GuardarCredito}>
                <Text style={styles.buttonText}>
                    Guardar
                </Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonText: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "bold",
    },
    // button: {
    //     backgroundColor: '#007299',
    //     borderRadius: 30,
    //     width: 60,
    //     height: 60,
    //     margin: 10,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     elevation: 3,
    //     position: 'absolute',
    //     bottom: 10,
    //     right: 10,
    //     zIndex: 1,
    // },
    button: {
        backgroundColor: "#5cb85c",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    text: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
});

export default FrmRegistrarPrestamo;

