import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/Ionicons";
//import { useRoute } from "@react-navigation/native"; //aguego

import HomeScreen from "./HomeScreen";
import PrestamoScreen from "../Prestamo/PrestamoScreen";
import PagoScreen from "../Pagos/PagoScreen";
import CierreScreen from "../Cierre/CierreScreen";
import FlexScreen from "../Flex/FlexScreen";
import ImprimirScreen from "../Impresion/ImprimirScreen";
import ConfiguracionScreen from "../Configuracion/ConfiguracionScreen";
import ListarPersonaScreen from "../PersonaScreen/ListarPersonaScreen";

const Drawer = createDrawerNavigator();

export default function DrawerScreen() {
  // const route = useRoute(); //aguego
  //const cUsuario = route.params?.cUsuario; //aguego
  return (
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
        name="Persona"
        component={ListarPersonaScreen}
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
  );
}
