import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { useNavigation, useFocusEffect  } from "@react-navigation/native";
import { Cliente } from "../../clases/Cliente";

const ListarPersonaScreen = () => {
  const [personas, setPersonas] = useState([]);
  const [personaSeleccionada, setPersonaSeleccionada] = useState(null);
  const navigation = useNavigation();

  const ListarPersonas = async () => {
    const DatCliente = new Cliente();
    const response = DatCliente.ListarPersonas();
    // console.log((await response).data);
    setPersonas((await response).data);
  }
  useEffect(() => {
    ListarPersonas();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      ListarPersonas();
    }, [])
  );

  // useEffect(() => {
  //   fetch("http://aagc.somee.com/api/personas/ListarPersonas")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setPersonas(data.data);
  //     });
  // }, []);

  const renderItem = ({ item }) => {
    const handleModificar = () => {
      navigation.navigate('ModificarPersona', { persona: item });
    };

    const handleEliminar = (persona) => {
      setPersonaSeleccionada(persona);
      Alert.alert(
        'Eliminar persona',
        `¿Está seguro de que desea eliminar a ${persona.cPersNombres} ${persona.cPersApellidos}?`,
        [
          {
            text: 'Cancelar',
            style: 'cancel'
          },
          {
            text: 'Eliminar',
            style: 'destructive',
            onPress: async () => {
              const DatCliente = new Cliente();
              const response = await DatCliente.EliminarPersona(persona.nIdPers)

              if (response.success) {
                Alert.alert("OK", "Eliminado " + "!!");
                ListarPersonas();
              } else {
                Alert.alert("ERROR", response.error);
              }
            }
          }
        ]
      );
    }

    return (
      <TouchableOpacity>
        <View style={styles.cardBorder}>
          <Text style={styles.cardTitle}>{`Nombre: ${item.cPersNombres} ${item.cPersApellidos}`}</Text>
          <Text>{`Dirección: ${item.cPersDireccion}`}</Text>
          <Text>{`Teléfono: ${item.cPersTelefono}`}</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.buttonEdit} onPress={handleModificar}>
              <Text style={styles.buttonText}>Modificar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonDelete} onPress={() => handleEliminar(item)}>
              <Text style={styles.buttonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const goToRegister = () => {
    navigation.navigate("RegistroPersona");
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: '100%' }}
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
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff'
  },
  cardTitle: {
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: '#007299',
    borderRadius: 30,
    width: 60,
    height: 60,
    margin: 10,
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
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  buttonEdit: {
    backgroundColor: '#007299',
    borderRadius: 5,
    padding: 5,
    marginRight: 10,
  },
  buttonDelete: {
    backgroundColor: '#f00',
    borderRadius: 5,
    padding: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ListarPersonaScreen;
