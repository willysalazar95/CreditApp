import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import {Calendar, CalendarList, Agenda, LocaleConfig} from 'react-native-calendars';
import axios from "axios";
import { Ionicons } from "react-native-vector-icons";
import { DatosCreditos } from "../../clases/DatosCreditos";

const ListarCronogramaScreen = () => {

  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const [query, setQuery] = useState("");

  const ListarCreditos = async () => {
    /*const _Dat = new DatosCreditos();
    const response = await _Dat.ListarCreditos();
    setData(response.data);*/
  };

  useEffect(() => {
    //ListarCreditos();
  }, []);

  return (
    <View style={styles.container}>
      <CalendarList
        markingType={'custom'}
        markedDates={{
          '2023-03-20': {
            customStyles: {
              container: {
                backgroundColor: 'green',
                elevation: 2
              },
              text: {
                color: 'white',
                fontWeight: 'bold'
              }
            }
          },
          '2023-03-29': {
            customStyles: {
              container: {
                backgroundColor: 'red',
                elevation: 2
              },
              text: {
                color: 'white',
                fontWeight: 'bold'
              }
            }
          },
          '2023-04-10': {
            customStyles: {
              container: {
                backgroundColor: 'yellow',
                elevation: 2
              },
              text: {
                color: 'black',
                fontWeight: 'bold'
              }
            }
          },
          '2023-04-15': {
            customStyles: {
              container: {
                backgroundColor: 'blue',
                elevation: 2
              },
              text: {
                color: 'white',
                fontWeight: 'bold'
              }
            }
          }
        }}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ListarCronogramaScreen;
