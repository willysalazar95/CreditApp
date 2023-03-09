import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import axios from "axios";

const PrestamoScreen = () => {
  const [data, setData] = useState([]);
  axios
    .get("http://aagc.somee.com/api/Credito/ListarCreditos", {
      params: {
        nIdPers: 0
      },
    })
    .then((response) => {
      const Resp = response.data.code;
      setData(response.data.data);
      //Lista = response.data.data;
      //console.log(Lista);
      /*data.forEach((v,i) => {
        console.log(v);
      });*/
    })
    .catch((error) => {
      //Alert.alert("ERROR", error);
      //setIsLoading(false);
    });
  const renderItem = ({ item }) => (
    <TouchableOpacity>
      <View style={styles.cardBorder}>
        <Text style={styles.cardTitle}>{item.cPersNombre}</Text>
        <Text>S/{item.nMonto} | {item.dFechaFin}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <FlatList
        style={{flex:1, width:'100%'}}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.nIdPrestamo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cardBorder: {
    flex: 1,
    margin: 5,
    borderRadius:10,
    padding:10,
    backgroundColor: '#fff'
  },
  cardTitle: {
    textTransform: 'uppercase',
    fontWeight: 'bold'
  }
});

export default PrestamoScreen;

