import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TextInput, FlatList, TouchableOpacity, Alert } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Cliente } from "../../clases/Cliente";
import { Ionicons } from 'react-native-vector-icons';

const ListarPersonaScreen = ({ route }) => {
  const [personas, setPersonas] = useState([]);
  const [query, setQuery] = useState('');
  const [personaSeleccionada, setPersonaSeleccionada] = useState(null);
  const [isClienteCredito, setClienteCredito] = useState(false);
  const navigation = useNavigation();


  const ListarPersonas = async () => {
    const DatCliente = new Cliente();
    const response = await DatCliente.ListarPersonas();
    setPersonas(response.data);
  }

  const BuscarPersonas = async () => {
    const DatCliente = new Cliente();
    const response = await DatCliente.ListarPersonas();
    const filteredData = response.data.filter((item) => {
      return item.cPersNombres.toLowerCase().includes(query.toLowerCase())
    });
    setPersonas(filteredData);
  }

  useEffect(() => {
    if (route.params) {
      // console.log("Seleccionar Persona");
      setClienteCredito(true);
    } else {
      ListarPersonas();
      setClienteCredito(false);
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      ListarPersonas();
    }, [])
  );

  const renderItem = ({ item }) => {
    const handleModificar = () => {
      navigation.navigate('ModificarPersona', { persona: item });
    }

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

    const handleSeleccionCliente = (persona) => {
      if (isClienteCredito) {
        navigation.navigate('RegistrarPrestamo', { persona: persona });
        // navigation.goBack();
      }
    }

    return (
      <TouchableOpacity onPress={() => handleSeleccionCliente(item)}>
        <View style={styles.cardBorder} >
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
  // {isClienteCredito ? "Seleccione al cliente para el credito" : ""}
  return (
    <View style={styles.container}>
      {isClienteCredito ?
        <View>
          <Text style={styles.label}>
            Seleccione al Cliente para el credito!
          </Text>
        </View>
        :
        <>
        </>
      }
      <FlatList
        style={{ width: '100%' }}
        data={personas}
        renderItem={renderItem}
        keyExtractor={(item) => item.nIdPers}
        ListHeaderComponent={
          <View style={styles.inputContainer}>
            <Ionicons name="ios-search" size={24} color="#aaa" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Buscar"
              value={query}
              onChangeText={setQuery}
            />
            <TouchableOpacity style={styles.buttonSearch} onPress={BuscarPersonas}>
              <Ionicons name="search-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
        }
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
  inputContainer: {
    backgroundColor: '#eee',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    padding: 5
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
  buttonSearch: {
    backgroundColor: '#007299',
    borderRadius: 5,
    padding: 5,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSearchText: {
    color: '#fff',
    fontWeight: 'bold',
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
