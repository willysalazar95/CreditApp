import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";

const ConfiguracionScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // implementa tu lógica de inicio de sesión aquí
  };

  return (
    <ImageBackground
      source={{
        uri: "https://i.pinimg.com/564x/22/00/4c/22004cadab50f32c99c30eecb113c3c5.jpg",
      }}
      style={styles.background}
    >
      <View style={styles.container}>
        <Image
          source={
            {
              //uri: "https://i.pinimg.com/564x/c0/01/e2/c001e252c5dc498e6a505fe559a5314a.jpg",
            }
          }
          style={styles.logo}
        />
        <Text style={styles.title}>Iniciar sesión</Text>
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
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
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

export default ConfiguracionScreen;
