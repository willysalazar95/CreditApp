import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { Cliente } from "../../clases/Cliente";
//CREADO POR AAGC
const FrmRegistroPersona = ({ route }) => {
  const navigation = useNavigation();
  const [nIdPers, setNidPers] = useState("");
  const [dni, setDni] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [fechaNac, SetFecha] = useState("");
  const [accionBoton, setAccionBoton] = useState("Guardar");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (route.params && route.params.persona) {
      const persona = route.params.persona;
      setNidPers(persona.nIdPers);
      setDni(persona.cPersDNI);
      setNombre(persona.cPersNombres);
      setApellido(persona.cPersApellidos);
      setDireccion(persona.cPersDireccion);
      setTelefono(persona.cPersTelefono);
      // setFechaNacimiento(persona.cPersFechNac);

      setIsEditing(true);
      setAccionBoton("Modificar");
    } else {
      setAccionBoton("Registrar");
    }
  }, [route.params]);

  const handleEnviar = async () => {
    const datCliente = new Cliente();
    const response = isEditing
      ? await datCliente.ActualizarPersona(
          nIdPers,
          dni,
          nombre,
          apellido,
          direccion,
          telefono,
          fechaNac
        )
      : await datCliente.RegistroPersona(
          dni,
          nombre,
          apellido,
          direccion,
          telefono,
          fechaNac
        );
    if (response.success) {
      if (isEditing) {
        Alert.alert("OK", "Modificado Correctamente " + "!!");
      } else {
        Alert.alert("OK", "Registrado Correctamente " + "!!");
      }
      navigation.goBack();
    } else {
      Alert.alert("ERROR", response.error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isEditing ? "Modificar " : "Nuevo"} Cliente
      </Text>
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
        <Text style={styles.label}>Tel??fono:</Text>
        <TextInput
          style={styles.input}
          value={telefono}
          onChangeText={setTelefono}
          keyboardType="phone-pad"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Direcci??n:</Text>
        <TextInput
          style={styles.input}
          value={direccion}
          onChangeText={setDireccion}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Fecha Nac:</Text>
        <TextInput
          style={styles.input}
          value={fechaNac}
          onChangeText={SetFecha}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleEnviar}>
        <Text style={styles.buttonText}>{accionBoton}</Text>
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
    textAlign: "center",
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
