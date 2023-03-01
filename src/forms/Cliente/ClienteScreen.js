import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";

import Database from "../../../BdCrediApp/BdCrediApp.js";
const db = new Database();

const ClienteScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Formulario de Registro</Text>
      <Formik
        initialValues={{
          dni: "",
          nombre: "",
          apellido: "",
          telefono: "",
          direccion: "",
          referencia: "",
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
        validate={(values) => {
          const errors = {};
          if (!values.dni) {
            errors.dni = "Este campo es requerido";
          } else if (!/^\d{8}$/.test(values.dni)) {
            errors.dni = "DNI inválido";
          }
          return errors;
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>DNI:</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("dni")}
                onBlur={handleBlur("dni")}
                value={values.dni}
                keyboardType="numeric"
              />
              {errors.dni && <Text style={styles.error}>{errors.dni}</Text>}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nombre:</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("nombre")}
                onBlur={handleBlur("nombre")}
                value={values.nombre}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Apellido:</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("apellido")}
                onBlur={handleBlur("apellido")}
                value={values.apellido}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Teléfono:</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("telefono")}
                onBlur={handleBlur("telefono")}
                value={values.telefono}
                keyboardType="phone-pad"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Dirección:</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("direccion")}
                onBlur={handleBlur("direccion")}
                value={values.direccion}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Referencia:</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("referencia")}
                onBlur={handleBlur("referencia")}
                value={values.referencia}
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
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
