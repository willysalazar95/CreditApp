import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, StyleSheet, Image } from "react-native";

import { captureScreen } from 'react-native-view-shot';
import CameraRoll from '@react-native-community/cameraroll';
import * as MediaLibrary from 'expo-media-library';
import Icon from 'react-native-vector-icons/FontAwesome';

function FrmVoucherPago({ route }) {

  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setCurrentDate(
      date + '/' + month + '/' + year
      + ' ' + hours + ':' + min + ':' + sec
    );
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', }}>
      <Image source={require('../../../assets/ok.png')} style={{ width: '50%', maxWidth: 400, maxHeight: 150, position: "absolute", marginTop: 10, marginLeft: "20%" }} resizeMode='contain' />
      <ScrollView style={{ marginVertical: 0, marginHorizontal: 16, flexDirection: 'column', top: "0%" }}>
        <View style={styles.boxResult}>
          <Text style={styles.tile}>!Pago Registrado!</Text>
          <View style={styles.value}>
            <Text style={styles.datomonto}>S/.{route.params.userMontoPagar}</Text>
            <Text style={styles.datonombre}>{route.params.userNombres}</Text>
            <Text style={styles.datofecha}>{currentDate}</Text>
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          flexDirection: 'row', flexWrap: "wrap",
          justifyContent: "flex-end",
          alignItems: "center",
          flex: 1,
          marginTop: 20,
          marginBottom: 30,
        }}
      >

        <View
          style={{

            position: "absolute",
            bottom: -30,
            width: "100%",
            paddingHorizontal: 40,
            paddingBottom: 5,
            paddingTop: 7,
            backgroundColor: "#fff",
            elevation: 12,
            marginTop: 10,
          }}
        >

          <View style={{ marginVertical: 1, marginHorizontal: 20, flexDirection: 'row', flexWrap: "wrap" }}>
            <Text style={styles.boton2} >
              <Icon name="reply" size={30} color="#fff" />
            </Text>
            <Text style={styles.boton1}>
              <Icon name="image" size={30} color="#fff" />
            </Text>
          </View>

          <View style={{ marginTop: 100 }} />
        </View>

      </View>
    </View>
  );
}
export default FrmVoucherPago;


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  },
  contenedor: {
    alignSelf: "center",
    height: "100%",

    width: "100%",

    bottom: 1,
    marginBottom: "100%",
  },
  boton0: {

    width: "50%",
    backgroundColor: "#387AC4",
    alignSelf: "center",

  },

  boton1: {
    textAlign: "center",
    width: "40%",
    height: "100%",
    backgroundColor: "#387AC4",
    marginLeft: "8%"
  },
  boton2: {
    textAlign: "center",
    width: "40%",
    height: "100%",
    backgroundColor: "#387AC4",
    marginLeft: "10%"
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
  },


  icon: {
    position: "absolute",
    top: '85%',
    right: 10,
    backgroundColor: "#1B4F72",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
  },
  item: {
    height: 0.2,
    width: '100%',
    backgroundColor: '#808080'
  },
  ListItemView: {

    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  Picker1: {
    width: '47%', bottom: 10, paddingHorizontal: 30, marginRight: 10,
    backgroundColor: '#ebebeb',
    padding: 20,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    color: "gray",
    paddingHorizontal: 30
  },

  Picker2: {
    width: '50 %', bottom: 10, paddingHorizontal: 30,
    backgroundColor: '#ebebeb',
    padding: 20,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    color: "gray",

  },

  PickerTexto: {

    paddingHorizontal: 30, marginRight: 10

  },
  boxResult: {
    top: "30%",
    alignContent: "center",
    left: "5%",
    width: "90%",
    height: 450,
    paddingVertical: 0,
    backgroundColor: '#ECECEC',

    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // elevation: 50,
    marginBottom: 70,
  },
  tile: {
    top: 55,
    color: "#195597",
    fontSize: 35,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20
  }
  ,

  tilecancelado: {
    top: 20,
    color: "black",
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    bottom: 20
  },

  datomonto: {
    color: "#195597",
    fontSize: 35,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10
  }
  ,

  datonombre: {
    color: "#195597",
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  }
  ,
  datofecha: {
    color: "#195597",
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'light',
  },

  value: {
    top: 55,
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
})