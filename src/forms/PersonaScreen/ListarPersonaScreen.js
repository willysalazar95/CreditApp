import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Cliente } from "../../clases/Cliente";
import { Ionicons } from "react-native-vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";

const ListarPersonaScreen = ({ route }) => {
  const [personas, setPersonas] = useState([]);
  const [query, setQuery] = useState("");
  const [personaSeleccionada, setPersonaSeleccionada] = useState(null);
  const [isClienteCredito, setClienteCredito] = useState(false);
  const navigation = useNavigation();

  const ListarPersonas = async () => {
    const DatCliente = new Cliente();
    const response = await DatCliente.ListarPersonas();
    setPersonas(response.data);
  };

  const BuscarPersonas = async () => {
    const DatCliente = new Cliente();
    const response = await DatCliente.ListarPersonas();
    const filteredData = response.data.filter((item) => {
      return item.cPersNombres.toLowerCase().includes(query.toLowerCase());
    });
    setPersonas(filteredData);
  };

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
      navigation.navigate("ModificarPersona", { persona: item });
    };

    const handleEliminar = (persona) => {
      setPersonaSeleccionada(persona);
      Alert.alert(
        "Eliminar persona",
        `¿Está seguro de que desea eliminar a ${persona.cPersNombres} ${persona.cPersApellidos}?`,
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Eliminar",
            style: "destructive",
            onPress: async () => {
              const DatCliente = new Cliente();
              const response = await DatCliente.EliminarPersona(
                persona.nIdPers
              );

              if (response.success) {
                Alert.alert("OK", "Eliminado " + "!!");
                ListarPersonas();
              } else {
                Alert.alert("ERROR", response.error);
              }
            },
          },
        ]
      );
    };

    const handleSeleccionCliente = (persona) => {
      if (isClienteCredito) {
        navigation.navigate("RegistrarPrestamo", { persona: persona });
        // navigation.goBack();
      }
    };

    return (
      <TouchableOpacity onPress={() => handleSeleccionCliente(item)}>
        <View style={styles.cardBorder}>
          <Text
            style={styles.cardTitle}
          >{`Nombre: ${item.cPersNombres} ${item.cPersApellidos}`}</Text>
          <Text>{`Dirección: ${item.cPersDireccion}`}</Text>
          <Text>{`Teléfono: ${item.cPersTelefono}`}</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.buttonEdit}
              onPress={handleModificar}
            >
              <Icon name="pencil" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonDelete}
              onPress={() => handleEliminar(item)}
            >
              <Icon name="trash" size={20} color="white" />
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
      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Buscar"
            value={query}
            onChangeText={setQuery}
          />
        </View>
        <TouchableOpacity style={styles.buttonSearch} onPress={BuscarPersonas}>
          <Ionicons name="search-outline" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <FlatList
        style={{ width: "100%" }}
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
    paddingRight: 10, // Agregar paddingRight para separación
  },
  buttonEdit: {
    backgroundColor: "rgb(12,177,234)",
    width: 50,
    height: 40,
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDelete: {
    backgroundColor: "red",
    width: 50,
    height: 40,
    padding: 5,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  searchContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 5,
  },
  inputContainer: {
    flex: 1,
    marginRight: 5,
    borderRadius: 10,
    backgroundColor: "#FFF",
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
  },
  buttonSearch: {
    backgroundColor: "#5cb85c",
    width: 50,
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ListarPersonaScreen;
