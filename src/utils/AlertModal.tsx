import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";
import { Modal } from "react-native";
//Intstalamos la dependencia :
//yarn add react-native-elements
const AlertModal = ({
    titulo,
    mensaje,
    visible,
    onConfirm,
}: {
    titulo: string;
    mensaje: string;
    visible: boolean;
    onConfirm: () => void;
}) => {
    return (
        <>
            <Modal
                transparent
                animationType="slide"
                hardwareAccelerated
                visible={visible} >
                <View style={styles.modalFondo}>
                    <View style={styles.modalVentana}>
                        <View style={styles.modalTitulo}>
                            <Text style={styles.modalTituloText}>{titulo}</Text>
                        </View>
                        <View style={styles.modalMensaje}>
                            <Text style={styles.modalMensajeTexto}>{mensaje}</Text>
                        </View>
                        <View  style={styles.modalBotonesContenedor} >
                            <TouchableOpacity style={styles.modalBoton} onPress={onConfirm}>
                                <Text style={styles.modalBotonText}>Aceptar</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    modalFondo: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalVentana:
    {
        width: "80%",
        height: "30%",
        backgroundColor: "white",
        paddingHorizontal: 0,
        paddingVertical: 0,
        borderRadius: 20,
        elevation: 0,
    },
    modalTitulo: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#5cb85c",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 0,
    },
    modalTituloText: {
        fontSize: 20,
        color: "white",
        textAlign: "center",
        justifyContent: 'center',
    },
    modalMensaje: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: "20%",
        top: 40,
    },
    modalMensajeTexto: {
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
    },
    modalBotonesContenedor:
    {
        width: "100%",
        top:60,
        display: "flex", 
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalBoton: {
             
        width: "50%",
        height: "40%",
        backgroundColor: "#5cb85c",
        borderRadius: 10,                
    },
    modalBotonText: {
        fontSize: 20,
        color:"white",
        textAlign: "center",
    },
    modalSombra: {
        alignSelf: 'center',
        backgroundColor: 'white',
        shadowColor: 'blue',
        shadowOpacity: 0.7,
        shadowRadius: 5,
        height: 150,
        width: 150,
        borderRadius: 4,
        elevation: 7,
        shadowOffset: { width: -15, height: 15 },
    },
})

export default AlertModal


/*
const EncabezadoModal = styled.div`
display:flex;
align-items:center;
justify-content:pace-between;
margin-bottom:20px;
padding-bottom:20px;
border-bottom:1px solid #E8E8E8;
h3{font-weight:500;
fontsize:16px;
color:#1766DC;
`;

const Overlay = styled.div`
width:100vw;
height:100vh;
position:fixed;
top:0;
left:0;
background:rgba(0,0,0,0,5);
padding:48px;
display:flex;
align-items:center;
justify-content:center;
`;

const ContenedorModal = styled.div`
width:500px;
min-heigth:100px;
background:#fff;
position:relative;
border-radius:5px;
box-shadow:rgba(100,100,111,0.2) 0px 7px 29px 0px;
padding:200px
`

const ContenedorBotones = styled.div`
padding: 48px;
display:flex;
flex-wrap:wrap;
justify-content:center;
gap:20px

h1{font-size:42px}

`;
const BotonCerrar=styled.button`
position:absolute;
top:20px;
rigth:20px;
width:30px;
heigth:30px;
border:none;
background:#000;
cursor:pointer;
transition:.3s ease all;
border-radius:5px;
color:#1766DC
&:hover{background:#f2f2f2}
`;
*/