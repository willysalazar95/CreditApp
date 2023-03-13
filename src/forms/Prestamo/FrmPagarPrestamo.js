import React, { useState, useEffect, useRef  } from "react";
import { StyleSheet, Text, TextInput, Alert, TouchableOpacity, View, ScrollView } from "react-native";
import ResultCalculationsPago from "../../Components/ResultCalculationsPago"
import { useNavigation   } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { DatosCreditos } from "../../clases/DatosCreditos";

const FrmPagarPrestamo = ({ route }) => {
    const navigation = useNavigation();

    const [nIdCredito, SETnIdCredito] = useState("");
    const [cPersNombre, SETcPersNombre] = useState("");
    const [nMontoPrestado, SETnMontoPrestado] = useState("");
    const [nMontoInteres, SETnMontoInteres] = useState("");
    const [nSaldoAnterior, SETnSaldoAnterior] = useState("");
    const [nNuevoSaldo, SETnNuevoSaldo] = useState(0);
    const [nTotalCuotas, SETnTotalCuotas] = useState(0);

    const [nMontoAPagar, SETnMontoAPagar] = useState(0.00);

    useEffect(() => {
        if (route.params && route.params.credito) {
            const credito = route.params.credito;
            
            let calcSaldoAnterior = 0
            calcSaldoAnterior = (credito.nMonto + credito.nMontoInteres) - credito.nMontoPagado

            SETcPersNombre(credito.cPersNombre);
            SETnMontoPrestado(credito.nMonto);
            SETnSaldoAnterior(calcSaldoAnterior);
            SETnMontoInteres(credito.nMontoInteres);
            SETnTotalCuotas(credito.nNroCuotas);
            SETnIdCredito(credito.nIdPrestamo);

            let nMontoPag = 0
            nMontoPag = (credito.nMonto + credito.nMontoInteres) / credito.nNroCuotas
            SETnMontoAPagar(nMontoPag);
            SETnNuevoSaldo(calcSaldoAnterior - (nMontoPag));
        }   

    }, [route.params]);

    const Regresar = () => {
        navigation.goBack();
    }

    const CalcularNuevoSaldo = (text) => {
        const nCantidad = parseFloat(text);
        const nNuevoSaldo = isNaN(nCantidad) ? 0 : nSaldoAnterior - nCantidad;
        SETnNuevoSaldo(nNuevoSaldo);
        SETnMontoAPagar(nCantidad);
    }

    const GuardarPago = async () => {
        const _dCred = new DatosCreditos();
        const response = await _dCred.RegistroCreditoPago(nIdCredito, nMontoAPagar);
        if (response.success) {
            Alert.alert("OK", "Crédito registrado Correctamente!");
            navigation.goBack();
        } else {
            Alert.alert("ERROR", response.error);
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff', }}>
            <ScrollView style={{ marginVertical: 20, marginHorizontal: 16, flexDirection: 'column', top: "2%" }}>
                <View style={styles.contenedor}>
                    <View>
                        <Text style={styles.tile}>{cPersNombre}</Text>
                    </View>

                    <View style={{ marginVertical: 1, marginHorizontal: 16, flexDirection: 'column', flexWrap: "wrap" }}>
                        <TextInput style={{ width: '100%', bottom: 10, paddingHorizontal: 30, marginRight: 10, textAlign: "center", fontSize: 40, fontWeight: 'bold' }}
                            keyboardType='numeric'
                            name="nMontoPagar"
                            onChangeText={text => {
                                CalcularNuevoSaldo(text);
                            }}
                        >{nMontoAPagar}</TextInput>
                    </View>

                    <ResultCalculationsPago
                        text1={''}
                        nMontoCredito={nMontoPrestado}
                        nSaldoPendiente={nSaldoAnterior}
                        nNuevoSaldo={nNuevoSaldo}
                        nProxCuota={1}
                        nCantCuotas={12}
                        cModalidadPago={"Diario"}
                        errorMessage={""}
                    />

                    <View style={{ marginVertical: 1, marginHorizontal: 16, flexDirection: 'row', flexWrap: "wrap" }}>
                        <Text style={styles.boton2} onPress={Regresar}>
                            <Icon name="times" size={30} color="#fff" />
                        </Text>
                        <Text style={styles.boton1} onPress={GuardarPago}>
                            <Icon name="check" size={30} color="#fff" />
                        </Text>

                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff"

    },
    contenedor: {
        alignSelf: "center",
        height: "100%",

        width: "100%",

        bottom: 1,
        marginBottom: "100%",
    },
    boton0: {

        width: "50%",
        backgroundColor: "#13A364",
        alignSelf: "center",

    },

    boton1: {

        width: "5%",
        height: "5%",
        backgroundColor: "#13A364",
        marginLeft: "0%"

    },
    boton2: {

        width: "40%",
        height: "100%",
        backgroundColor: "#CD154A",
        marginLeft: "10%"
    },
    buttonText: {
        color: "#fff",
        fontSize: 20,
        textAlign: "center",
    },
    boton1: {
        width: "40%",
        height: "100%",
        backgroundColor: "#13A364",
        marginLeft: "8%",
        textAlign: "center"
    },
    boton2: {

        width: "40%",
        height: "100%",
        backgroundColor: "#CD154A",
        marginLeft: "10%",
        textAlign: "center"
    },

    icon: {
        position: "absolute",
        top: '85%',
        right: 10,
        backgroundColor: "#1B4F72",
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
    },
    item: {
        height: 0.2,
        width: '100%',
        backgroundColor: '#808080'
    },
    ListItemView: {

        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    texto: {
        fontSize: 15,
        color: "#3f3844",
        fontWeight: 'bold',

    },
    Picker1: {
        width: '47%', bottom: 10, paddingHorizontal: 30, marginRight: 10,
        backgroundColor: '#ebebeb',
        padding: 20,
        borderRadius: 10,
        shadowColor: "black",
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
        color: "gray",
        paddingHorizontal: 30
    },

    Picker2: {
        width: '50 %', bottom: 10, paddingHorizontal: 30,
        backgroundColor: '#ebebeb',
        padding: 20,
        borderRadius: 10,
        shadowColor: "black",
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
        color: "gray",

    },

    PickerTexto: {

        paddingHorizontal: 30, marginRight: 10

    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    buttonEdit: {
        backgroundColor: '#007299',
        borderRadius: 5,
        padding: 5,
        marginRight: 10,
    },
    buttonDelete: {
        backgroundColor: '#f00',
        borderRadius: 5,
        padding: 5,
    },
    tile: {
        color: "#0033A9",
        fontSize: 40,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: "center"
    },
});

export default FrmPagarPrestamo;

