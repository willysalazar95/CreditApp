import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";

const ListarPersonaScreen = () => {
  const [personas, setPersonas] = useState([]);

  useEffect(() => {
    fetch("http://aagc.somee.com/api/personas/ListarPersonas")
      .then((response) => response.json())
      .then((data) => setPersonas(data));
  }, []);

  const renderItem = ({ item }) => (
    <View style={{ padding: 10 }}>
      <Text>{`Nombre: ${item.cPersNombres} ${item.cPersApellidos}`}</Text>
      <Text>{`Dirección: ${item.cPersDireccion}`}</Text>
      <Text>{`Teléfono: ${item.cPersTelefono}`}</Text>
    </View>
  );

  return (
    <FlatList
      data={personas}
      renderItem={renderItem}
      keyExtractor={(item) => item.nIdPers.toString()}
    />
  );
};

export default ListarPersonaScreen;
