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
    <View style={{ padding: 10 }}>
      <Text>{`Nombre: ${item.cPersNombres} ${item.cPersApellidos}`}</Text>
      <Text>{`Dirección: ${item.cPersDireccion}`}</Text>
      <Text>{`Teléfono: ${item.cPersTelefono}`}</Text>
    </View>
  );

  const goToRegister = () => {
		navigation.navigate("RegistroPersona");
	};

  return (
    <View>
      <FlatList
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
