import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Image, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import HomeScreen from "./src/forms/HomeScreen";
import ClienteScreen from "./src/forms/ClienteScreen";
import PrestamoScreen from "./src/forms/PrestamoScreen";
import PagoScreen from "./src/forms/PagoScreen";
import CierreScreen from "./src/forms/CierreScreen";
import FlexScreen from "./src/forms/FlexScreen";
import ImprimirScreen from "./src/forms/ImprimirScreen";
import ConfiguracionScreen from "./src/forms/ConfiguracionScreen";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            drawerIcon: ({ focused, color, size }) => (
              <Icon name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Cliente"
          component={ClienteScreen}
          options={{
            drawerIcon: ({ focused, color, size }) => (
              <Icon name="person-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Prestamo"
          component={PrestamoScreen}
          options={{
            drawerIcon: ({ focused, color, size }) => (
              <Icon name="cash-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Pago"
          component={PagoScreen}
          options={{
            drawerIcon: ({ focused, color, size }) => (
              <Icon name="card-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Cierre"
          component={CierreScreen}
          options={{
            drawerIcon: ({ focused, color, size }) => (
              <Icon name="lock-closed-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Flex"
          component={FlexScreen}
          options={{
            drawerIcon: ({ focused, color, size }) => (
              <Icon name="calculator-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Imprimir"
          component={ImprimirScreen}
          options={{
            drawerIcon: ({ focused, color, size }) => (
              <Icon name="print-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Configuracion"
          component={ConfiguracionScreen}
          options={{
            drawerIcon: ({ focused, color, size }) => (
              <Icon name="settings-outline" size={size} color={color} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
