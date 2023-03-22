import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import Persona from "../../clases/Persona";
import moment from "moment";

const RegistroClienteScreen = () => {
  const [dni, setDni] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");

  const handleGuardar = () => {
    try {
      const persona = new Persona();
      const response = persona.registerPersona(
        dni,
        nombre,
        apellido,
        direccion,
        telefono,
        fechaNacimiento
      );
      if (response.success) {
        console.log("Persona guardada exitosamente", response.data);
      } else {
        console.log("ERROR", response.error);
      }
    } catch (error) {
      console.log("ERROR", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Registro de Persona</Text>

      <View style={styles.formulario}>
        <Text style={styles.label}>DNI</Text>
        <TextInput
          style={styles.input}
          value={dni}
          onChangeText={setDni}
          keyboardType="numeric"
          maxLength={8}
        />

        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
        />

        <Text style={styles.label}>Apellido</Text>
        <TextInput
          style={styles.input}
          value={apellido}
          onChangeText={setApellido}
        />

        <Text style={styles.label}>Dirección</Text>
        <TextInput
          style={styles.input}
          value={direccion}
          onChangeText={setDireccion}
        />

        <Text style={styles.label}>Teléfono</Text>
        <TextInput
          style={styles.input}
          value={telefono}
          onChangeText={setTelefono}
          keyboardType="phone-pad"
          maxLength={10}
        />

        <Text style={styles.label}>Fecha de Nacimiento</Text>
        <TextInput
          style={styles.input}
          value={moment(fechaNacimiento, "DD/MM/YYYY").format("YYYY-MM-DD")}
          onChangeText={setFechaNacimiento}
          placeholder="DD/MM/AAAA"
          keyboardType="numeric"
          maxLength={10}
        />

        <Button title="Guardar" onPress={handleGuardar} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  formulario: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
});

export default RegistroClienteScreen;
