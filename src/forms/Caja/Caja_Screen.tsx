import React from "react";
import { Text, View, StyleSheet, ScrollView, TextInput, TouchableOpacity } from "react-native";

function Caja_Screen() {
  return (
    <View style={styles.ContenedorPrincipal}>
      <ScrollView>
        <View style={styles.TextInputContenedor}>
          <Text style={styles.TextLabel}>Usuario</Text>
          <TextInput
            style={styles.TextInput}
            // value={dni}
            // onChangeText={setDni}
            placeholder="Ingrese dni"
            placeholderTextColor="#D3D3D3"
            textAlignVertical="top"
          />
          <Text style={styles.TextLabel}>Monto Apertura:</Text>
          <TextInput
            style={styles.TextInput}
            // value={nombre}
            // onChangeText={setNombre}
            placeholder="Ingrese monto"
            placeholderTextColor="#D3D3D3"
            textAlignVertical="top"
          />
          <Text style={styles.TextLabel}>Monto Cobrado:</Text>
          <TextInput
            style={styles.TextInput}
            // value={nombre}
            // onChangeText={setNombre}
            placeholder="Ingrese monto"
            placeholderTextColor="#D3D3D3"
            textAlignVertical="top"
          />
          <Text style={styles.TextLabel}>Monto Credito:</Text>
          <TextInput
            style={styles.TextInput}
            // value={nombre}
            // onChangeText={setNombre}
            placeholder="Ingrese monto"
            placeholderTextColor="#D3D3D3"
            textAlignVertical="top"
          />
          <Text style={styles.TextLabel}>Monto Final:</Text>
          <TextInput
            style={styles.TextInput}
            // value={nombre}
            // onChangeText={setNombre}
            placeholder="Ingrese monto"
            placeholderTextColor="#D3D3D3"
            textAlignVertical="top"
          />

          <TouchableOpacity style={styles.button}>
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
