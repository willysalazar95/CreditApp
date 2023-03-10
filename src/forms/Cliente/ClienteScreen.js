import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import Database from "../../../BdCrediApp/BdCrediApp.js";
const db = new Database();

const ClienteScreen = () => {
  const [dni, setDni] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [referencia, setReferencia] = useState("");

  const handleEnviar = async () => {
    try {
      await db.insertPersona(
        dni,
        nombre,
        apellido,
        telefono,
        direccion,
        referencia
      );
      console.log("Los datos se han guardado correctamente.");
    } catch (error) {
      console.log("Ha ocurrido un error al guardar los datos:", error);
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
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Referencia:</Text>
        <TextInput
          style={styles.input}
          value={referencia}
          onChangeText={setReferencia}
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
export default ClienteScreen;
