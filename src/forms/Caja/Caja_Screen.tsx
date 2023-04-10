import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from "react-native";

import { configData } from "../../../config";
import { Caja } from "../../clases/Caja";

const Caja_Screen = () => {
  const [cUsuario, SETcUsuario] = useState("");
  const [nMontoApertura, SETnMontoApertura] = useState("");
  const [nMontoCobrado, SETnMontoCobrado] = useState("");
  const [nMontoCredito, SETnMontoCredito] = useState("");
  const [nMontoFinal, SETnMontoFinal] = useState("");

  const [nCajaEstado, SETnCajaEstado] = useState(false);
  const [bCargar, SETbCargar] = useState(true);

  useEffect(() => {
    async function fetchData() {
      SETcUsuario(configData.cUsuario);
      // console.log(bCargar);
      if (bCargar) {
        await ObtenerDatosCaja();
      }
    }
    fetchData();

  });

  const ObtenerDatosCaja = async () => {
    const Dat = new Caja(
      0,
      configData.nUsuId,
      "",
      "",
      0,
      0,
      0,
      0,
      0
    );

    const Response = await Dat.ObtenerDatosCaja();

    if (Response.success) {
      var bEstadoCaja = Response.data.nCajaEstado == "1" ? true : false
      SETnCajaEstado(bEstadoCaja);
      SETnMontoApertura(Response.data.nMontoApertura);
      SETnMontoCobrado(Response.data.nMontoCobradoEfectivo);
      SETnMontoCredito(Response.data.nMontoCredito);
      SETnMontoFinal(Response.data.nMontoFinal);

      console.log(Response.data.nMontoCobradoEfectivo + " -- Apertura2")
    } else {
      Alert.alert("ERROR", Response.error);
    }
    SETbCargar(false);
  }

  const EjecutarCaja = async () => {
    var msg = nCajaEstado ? "cerrar caja" : "abrir caja"
    Alert.alert(
      "Confirmar Caja",
      "¿Estás seguro que deseas " + msg + "?",
      [
        {
          text: "Cancelar",
          style: "cancel",
          onPress: () => { },
        },
        {
          text: "Aceptar",
          onPress: () => {
            Procesar();
          },
        },
      ],
      { cancelable: false }
    );
  }

  const Procesar = async () => {
    const Dat = new Caja(
      0,
      configData.nUsuId,
      "",
      "",
      0,
      parseFloat(nMontoApertura),
      parseFloat(nMontoCobrado),
      parseFloat(nMontoCredito),
      parseFloat(nMontoFinal)
    )

    const response = nCajaEstado ? await Dat.CierreCaja() : await Dat.AperturarCaja();
    if (response.success) {
      Alert.alert("OK", "Registrado Correctamente !!");
      SETnCajaEstado(true);
    } else {
      Alert.alert("OK", "Error");
    }
  }

  return (
    <View style={styles.ContenedorPrincipal}>
      <ScrollView>
        <View style={styles.TextInputContenedor}>
          <Text style={styles.TextLabel}>Usuario</Text>
          <TextInput
            style={styles.TextInput}
            value={cUsuario}
            onChangeText={SETcUsuario}
            placeholder="Ingrese usuario"
            placeholderTextColor="#D3D3D3"
            textAlignVertical="top"
          />
          <Text style={styles.TextLabel}>Monto Apertura:</Text>
          <TextInput
            style={styles.TextInput}
            value={nMontoApertura.toString()}
            onChangeText={SETnMontoApertura}
            placeholder="Ingrese monto"
            placeholderTextColor="#D3D3D3"
            textAlignVertical="top"
          />
          {nCajaEstado &&
            <View id="CierreCaja">
              <Text style={styles.TextLabel}>Monto Cobrado:</Text>
              <TextInput
                style={styles.TextInput}
                value={nMontoCobrado.toString()}
                onChangeText={SETnMontoCobrado}
                placeholder="Ingrese monto"
                placeholderTextColor="#D3D3D3"
                textAlignVertical="top"
              />
              <Text style={styles.TextLabel}>Monto Credito:</Text>
              <TextInput
                style={styles.TextInput}
                value={nMontoCredito.toString()}
                onChangeText={SETnMontoCredito}
                placeholder="Ingrese monto"
                placeholderTextColor="#D3D3D3"
                textAlignVertical="top"
              />
              <Text style={styles.TextLabel}>Monto Final:</Text>
              <TextInput
                style={styles.TextInput}
                value={nMontoFinal.toString()}
                onChangeText={SETnMontoFinal}
                placeholder="Ingrese monto"
                placeholderTextColor="#D3D3D3"
                textAlignVertical="top"
              />
            </View>
          }
          <TouchableOpacity style={styles.button} onPress={EjecutarCaja}>
            <Text style={styles.buttonText}>GUARDAR</Text>
          </TouchableOpacity>
        </View>
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
});

export default Caja_Screen;
