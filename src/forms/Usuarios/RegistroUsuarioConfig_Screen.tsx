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

import { Usuario } from "../../clases/Usuario";
//CREADO POR AAGC
const RegistroUsuarioConfig_Screen = ({ route }: any) => {
  const navigation = useNavigation();
  const [nClienId, SETnClienId] = useState(0);
  const [nConfiguracionID, SETnConfiguracionID] = useState("");

  const [cUsuUsuario, SETcUsuUsuario] = useState("");
  const [cUsuClave, SETcUsuClave] = useState("");

  useEffect(() => {
    if (nConfiguracionID && nClienId) {

      SETnClienId(nClienId);
      SETnConfiguracionID(nConfiguracionID);
      // setFechaNacimiento(persona.cPersFechNac);

    } else {

    }
  }, [route.params]);

  const handleEnviar = async () => {
    const dat = new Usuario(
      0,
      cUsuUsuario,
      cUsuClave,
      1,
      1,
      nClienId,
      parseInt(nConfiguracionID),
      0
    );
    const response = await dat.RegistrarUsuario_Config();
    if (response.success) {
      Alert.alert("OK", "Registrado Correctamente ");
      // navigation.goBack();
    } else {
      Alert.alert("ERROR", response.error);
    }
  };

  return (
    <View style={styles.ContenedorPrincipal}>
      <ScrollView>
        <Text style={styles.TituloContenedor}>
          Crea tu usuario
        </Text>
        <View style={styles.TextInputContenedor}>
          <Text style={styles.TextLabel}>Usuario</Text>
          <TextInput
            style={styles.TextInput}
            value={cUsuUsuario}
            onChangeText={SETcUsuUsuario}
            placeholder="Ingrese usuario"
            placeholderTextColor="#D3D3D3"
            textAlignVertical="top"
          />
        </View>
        <View style={styles.TextInputContenedor}>
          <Text style={styles.TextLabel}>Contraseña:</Text>
          <TextInput
            style={styles.TextInput}
            value={cUsuClave}
            onChangeText={SETcUsuClave}
            placeholder="Ingrese contraseña"
            placeholderTextColor="#D3D3D3"
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleEnviar}>
          <Text style={styles.buttonText}>Finalizar Registro</Text>
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
export default RegistroUsuarioConfig_Screen;
