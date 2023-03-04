import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

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

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  const handleLogin = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const user = await db.getUsuarioByUserPass(username, password);
      if (user.length > 0) {
        Alert.alert("OK", "Bienvenido!!");
        navigation.navigate("DrawerScreen");
      } else {
        Alert.alert("ERROR", "Datos incorrectos");
        setPassword("");
      }
    } catch (error) {
      console.log("Ha ocurrido un error al obtener los datos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const goToRegister = async () => {
    navigation.navigate("register");
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
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? "Cargando..." : "Iniciar sesión"}
          </Text>
        </TouchableOpacity>

        <Text style={styles.createAccountTitle}>
          ¿No tienes cuenta? Crea una
          <TouchableOpacity
            style={styles.createAccountTitleTouchable}
            onPress={goToRegister}
          >
            <Text style={styles.createAccountTitleButton}> aquí</Text>
          </TouchableOpacity>
          .
        </Text>
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
  createAccountTitle: {
    color: "white",
    textAlign: "center",
    top: 20,
  },
  createAccountTitleTouchable: {
    justifyContent: "center",
  },
  createAccountTitleButton: {
    color: "#5cb85c",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default LoginScreen;
