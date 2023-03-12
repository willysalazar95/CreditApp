import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const FrmVerDatosPrestamo = () => {

  return (
    <View style={styles.container}>

        <Text> VER DATOS PRESTAMO </Text>

    </View>
  );
}

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
});

export default FrmVerDatosPrestamo;

