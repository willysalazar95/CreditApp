import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import ListarPersonaScreen from "../PersonaScreen/ListarPersonaScreen";

const PrestamoScreen = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  axios
    .get("http://aagc.somee.com/api/Credito/ListarCreditos", {
      params: {
        nIdPers: 0,
      },
    })
    .then((response) => {
      const Resp = response.data.code;
      setData(response.data.data);
    })
    .catch((error) => {});

  const renderItem = ({ item }) => {
    const PagarCredito = () => {
      navigation.navigate("PagarPrestamo", { credito: item });
    };

    return (
      <TouchableOpacity>
        <View style={styles.cardBorder}>
          <Text style={styles.cardTitle}>{item.cPersNombre}</Text>
          <Text>
            S/ {item.nMonto} | {item.dFechaFin}
          </Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.buttonEdit}>
              <Text style={styles.buttonText}>Ver Datos</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonDelete}
              onPress={PagarCredito}
            >
              <Text style={styles.buttonText}>Realizar Pago</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const SelecClienteNuevoCredito = () => {
    navigation.navigate("ListarPersonas", { Opcion: 2 });
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.nIdPrestamo}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={SelecClienteNuevoCredito}
      >
        <Text style={styles.text}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardBorder: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#fff",
  },
  cardTitle: {
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: "#5cb85c",
    borderRadius: 30,
    width: 60,
    height: 60,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    position: "absolute",
    bottom: 10,
    right: 10,
    zIndex: 1,
  },
  text: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  buttonEdit: {
    backgroundColor: "rgb(12,177,234)",
    borderRadius: 5,
    padding: 5,
    marginRight: 10,
  },
  buttonDelete: {
    backgroundColor: "#f00",
    borderRadius: 5,
    padding: 5,
  },
  buttonText: {
    color: "#FFF",
  },
});

export default PrestamoScreen;
