import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ListarPersonaScreen = () => {
  const [personas, setPersonas] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetch("http://aagc.somee.com/api/personas/ListarPersonas")
    .then((response) => response.json())
    .then((data) => {

      setPersonas(data.data);
    });
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity>
      <View style={styles.cardBorder}>
        <Text style={styles.cardTitle}>{`Nombre: ${item.cPersNombres} ${item.cPersApellidos}`}</Text>
        <Text>{`Dirección: ${item.cPersDireccion}`}</Text>
        <Text>{`Teléfono: ${item.cPersTelefono}`}</Text>
      </View>
    </TouchableOpacity>
  );

  const goToRegister = () => {
		navigation.navigate("RegistroPersona");
	};

  return (
    <View style={styles.container}>
      <FlatList
        style={{width:'100%'}}
        data={personas}
        renderItem={renderItem}
        keyExtractor={(item) => item.nIdPers}
      />

      <TouchableOpacity style={styles.button} onPress={goToRegister}>
        <Text style={styles.text}>+</Text>
      </TouchableOpacity>
    </View>


  );
};

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

export default ListarPersonaScreen;
