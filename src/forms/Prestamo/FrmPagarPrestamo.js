import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, Button, TouchableOpacity, View, ScrollView } from "react-native";
import ResultCalculationsPago from "../../Components/ResultCalculationsPago"
import Icon from 'react-native-vector-icons/FontAwesome';
// import { TextInput, DataTable, List } from 'react-native-paper';

const FrmPagarPrestamo = ({ route }) => {
    const [nIdCredito, SETnIdCredito] = useState("");
    const [nIdPers, SETnIdPers] = useState("");
    const [cPersNombre, SETcPersNombre] = useState("");

    useEffect(() => {
        if (route.params && route.params.credito) {
            const credito = route.params.credito;

            // console.log(credito);
            SETcPersNombre(credito.cPersNombre);
        }
    }, [route.params]);

    return (
        <View style={{ flex: 1, backgroundColor: '#fff', }}>
            <ScrollView style={{ marginVertical: 20, marginHorizontal: 16, flexDirection: 'column', top: "2%" }}>
                <View style={styles.contenedor}>
                    <Text> REALIZAR PAGO </Text>

                    <View style={{ marginVertical: 20, marginHorizontal: 16, }}>
                        <TextInput
                            disabled
                            value={"CLIENTE : " + cPersNombre}
                            label="Nombres y Apellidos"
                        // onChangeText={ ( userNombres ) => setUserNombres( userNombres ) }
                        />

                    </View>
                    <View style={{ marginVertical: 1, marginHorizontal: 16, flexDirection: 'column', flexWrap: "wrap" }}>
                        <TextInput style={{ width: '100%', bottom: 10, paddingHorizontal: 30, marginRight: 10, textAlign: "center" }}
                            value={"0.00"}
                            keyboardType='numeric'
                            label="Valor de la cuota a pagar"
                        // onChangeText={ ( values ) => {
                        //     setUserMontoPagar( values ); 0
                        //     if ( userMontoPagar ) { ResultCalculationsPago; }
                        // } }
                        />
                    </View>



                    <ResultCalculationsPago
                        text1={''}
                        userCuotas={30000}
                        SaldoPago={200}
                        InteresReal={200}
                        NumeroCuotaPagada={200}
                        userValorCuota={200}
                        userInteresCuota={"Diario"}
                        errorMessage={""}
                    />

                    <View style={{ marginVertical: 1, marginHorizontal: 16, flexDirection: 'row', flexWrap: "wrap" }}>
                    <Text style={styles.boton2}>
                            <Icon name="times" size={30} color="#fff" />
                        </Text>
                        <Text style={styles.boton1}>
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
});

export default FrmPagarPrestamo;

