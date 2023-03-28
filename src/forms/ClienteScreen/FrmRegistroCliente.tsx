import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { Cliente } from "../../clases/Cliente";
//CREADO POR AAGC
const FrmRegistroCliente = ({ route }: any) => {
  const navigation = useNavigation();
  const [nIdPers, setNidPers] = useState(0);
  const [dni, setDni] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [accionBoton, setAccionBoton] = useState("Guardar");
  const [isEditing, setIsEditing] = useState(false);

  const [fechaNac, setFechaNac] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (route.params && route.params.item) {
      // console.log(route);

      const persona = route.params.item;
      setNidPers(persona.nClieID);
      setDni(persona.cClieDNI);
      setNombre(persona.cClieNombres);
      setApellido(persona.cClieApellidos);
      setDireccion(persona.cClieDireccion);
      setTelefono(persona.cClieTelefono);
      // setFechaNacimiento(persona.cPersFechNac);

      setIsEditing(true);
      setAccionBoton("Modificar");
    } else {
      setAccionBoton("Registrar");
    }
  }, [route.params]);

  const handleEnviar = async () => {
    const datCliente = new Cliente(
      nIdPers,
      dni,
      nombre,
      apellido,
      direccion,
      telefono,
      fechaNac.toString(),
      "",
      0
    );
    const response = isEditing
      ? await datCliente.ActualizarCliente()
      : await datCliente.RegistrarCliente();
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
    <View style={styles.ContenedorPrincipal}>
      <ScrollView>
        <Text style={styles.TituloContenedor}>
          {isEditing ? "Modificar " : "Nuevo"} Cliente
        </Text>
        <View style={styles.TextInputContenedor}>
          <Text style={styles.TextLabel}>DNI:</Text>
          <TextInput
            style={styles.TextInput}
            value={dni}
            onChangeText={setDni}
            keyboardType="numeric"
            placeholder="Ingrese dni"
            placeholderTextColor="#D3D3D3"
            textAlignVertical="top"
          />
        </View>
        <View style={styles.TextInputContenedor}>
          <Text style={styles.TextLabel}>Nombre:</Text>
          <TextInput
            style={styles.TextInput}
            value={nombre}
            onChangeText={setNombre}
            placeholder="Iingrese nombre"
            placeholderTextColor="#D3D3D3"
            textAlignVertical="top"
          />
        </View>
        <View style={styles.TextInputContenedor}>
          <Text style={styles.TextLabel}>Apellido:</Text>
          <TextInput
            style={styles.TextInput}
            value={apellido}
            onChangeText={setApellido}
            placeholder="Ingrese apellido"
            placeholderTextColor="#D3D3D3"
            textAlignVertical="top"
          />
        </View>
        <View style={styles.TextInputContenedor}>
          <Text style={styles.TextLabel}>Teléfono:</Text>
          <TextInput
            style={styles.TextInput}
            value={telefono}
            onChangeText={setTelefono}
            keyboardType="phone-pad"
            placeholder="Ingrese telefono"
            placeholderTextColor="#D3D3D3"
            textAlignVertical="top"
          />
        </View>
        <View style={styles.TextInputContenedor}>
          <Text style={styles.TextLabel}>Dirección:</Text>
          <TextInput
            style={styles.TextInput}
            value={direccion}
            onChangeText={setDireccion}
            placeholder="Ingrese direccion"
            placeholderTextColor="#D3D3D3"
            textAlignVertical="top"
          />
        </View>

        <View style={styles.TextInputContenedor}>
          <Text style={styles.TextLabel}>Fecha Nac:</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text style={styles.TextInput}>
              {fechaNac.toLocaleDateString()}
            </Text>
            {showDatePicker && (
              <DateTimePicker
                value={fechaNac}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  const currentDate = selectedDate || fechaNac;
                  setShowDatePicker(false);
                  setFechaNac(currentDate);
                }}
              />
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleEnviar}>
          <Text style={styles.buttonText}>{accionBoton}</Text>
        </TouchableOpacity>
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
export default FrmRegistroCliente;
