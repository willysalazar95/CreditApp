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
    <View style={styles.container}>
      <FlatList
        style={{width:'100%'}}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.nIdPrestamo}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>+</Text>
      </TouchableOpacity>
      
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
  },
  container: {
    flex:1,
  },
  button: {
    backgroundColor: '#007299',
    borderRadius: 30,
    width: 60,
    height: 60,
    margin:10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    position: 'absolute',
    bottom: 10,
    right: 10,
    zIndex: 1,
  },
  text: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PrestamoScreen;

