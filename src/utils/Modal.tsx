import React, { useState, useEffect, Children } from "react";
import {
    View,
    StyleSheet,
    Text, 
    TouchableOpacity,
} from "react-native";

//Intstalamos la dependencia :
//yarn add react-native-elements

const Modal = ({ tituloModal, mensajeModal, estado, cambiarEstado, children }) => {
    return (
        <>
            <Modal isVisible={estado} backdropTransitionOutTiming={0}>
                <View style={styles.modalFondo}>
                    <View style={[styles.modalVentana, styles.modalSombra]}>
                        <View style={styles.modalTitulo}>
                            <Text style={styles.modalTitulo}>{tituloModal}</Text>
                        </View>
                        <View style={styles.modalMensaje}>
                            <Text >{mensajeModal}</Text>
                        </View>
                        <TouchableOpacity style={styles.modalBoton} onPress={cambiarEstado}>
                            <Text style={styles.modalBotonText}>Aceptar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {
/*estado&&

            <Overlay>
                <ContenedorModal>
                    <EncabezadoModal>
                        <h3>Titulo</h3>
                    </EncabezadoModal>
                    <BotonCerrar>X</BotonCerrar>
                    {children}
                </ContenedorModal>

            </Overlay>
*/ }
        </>



    );
}

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
        backgroundColor: "white",
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 20,
        elevation: 20,
    },
    modalTitulo: {
        width: '100%',
        height: 40,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    modalMensaje: {
        alignItems: 'center',
        justifyContent: 'center',

    },
    modalMensajeTexto: {
        alignItems: 'center',
        justifyContent: 'center',

    },
    modalBoton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalBotonText: {
        fontSize: 12,
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


export default Modal



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