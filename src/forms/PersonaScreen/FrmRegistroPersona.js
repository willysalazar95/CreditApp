import React, { useState } from "react";
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Cliente } from "../../clases/Cliente";

const FrmRegistroPersona = () => {
  const [dni, setDni] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");

  const handleEnviar = async () => {
    const datCliente = new Cliente();
    const response = await datCliente.RegistroPersona( dni, nombre, apellido, direccion, telefono, '1');
    // console.log(response);
    if (response.success) {
        Alert.alert("OK", "Registrado Correctamente " + "!!");
    } else {
        Alert.alert("ERROR", response.error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Formulario de Registro</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>DNI:</Text>
        <TextInput
          style={styles.input}
          value={dni}
          onChangeText={setDni}
          keyboardType="numeric"
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
        <Text style={styles.label}>Apellido:</Text>
        <TextInput
          style={styles.input}
          value={apellido}
          onChangeText={setApellido}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Teléfono:</Text>
        <TextInput
          style={styles.input}
          value={telefono}
          onChangeText={setTelefono}
          keyboardType="phone-pad"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Dirección:</Text>
        <TextInput
          style={styles.input}
          value={direccion}
          onChangeText={setDireccion}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleEnviar}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
  button: {
    backgroundColor: "#5cb85c",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
export default FrmRegistroPersona;
