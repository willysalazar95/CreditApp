import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert,
} from "react-native";

import Database from "../../../BdCrediApp/BdCrediApp";
const db = new Database();

const RegistroScreen = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleRegister = async () => {
    try {
        const user = await db.insertUsuario(
            name,
            username,
            password
        );
        Alert.alert("OK","REGISTRO CORRECTO");
        navigation.navigate('login');
    } catch (error) {
        console.log("Ha ocurrido un error al guardar los datos:", error);
    }
  };

  return (
    <ImageBackground
      source={{
        uri: "https://i.pinimg.com/564x/ff/e3/3b/ffe33b2637617938d8c5728f3d3fed28.jpg",
      }}
      style={styles.background}
    >
      <View style={styles.container}>
        <Image
          //source={{ uri: "https://i.pinimg.com/564x/98/fb/de/98fbde4424c0df8383e931dfa5d3fca3.jpg" }}
          style={styles.logo}
        />
        <Text style={styles.title}>Crea tu cuenta</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Primer nombre"
            placeholderTextColor="#FFF"
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nombre de usuario"
            placeholderTextColor="#FFF"
            value={username}
            onChangeText={setUsername}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#FFF"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    //backgroundColor: "rgba(0,0,0,0.6)",
    padding: 20,
    borderRadius: 10,
  },
  logo: {
    height: 100,
    width: 100,
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FFF",
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#FFF",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: "#FFF",
  },
  button: {
    backgroundColor: "#5cb85c",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default RegistroScreen;
