import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/Ionicons";
import HomeScreen from "./HomeScreen";
import Creditos_Screen from "../Creditos/Creditos_Screen";
import PagoScreen from "../Pagos/PagoScreen";
import CierreScreen from "../Cierre/CierreScreen";
import FlexScreen from "../Flex/FlexScreen";
import ImprimirScreen from "../Impresion/ImprimirScreen";
import ConfiguracionScreen from "../Configuracion/ConfiguracionScreen";
import ListarClienteScreen from "../ClienteScreen/ListarCliente_Screen";
import { LoginScreen } from "../Login/LoginScreen";
import ListarUsuarioScreen from "../Usuarios/ListarUsuarios_Screen";

const Drawer = createDrawerNavigator();

export default function DrawerScreen() {
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
				name="Clientes"
				component={ListarClienteScreen}
				options={{
					drawerIcon: ({ focused, color, size }) => (
						<Icon name="person-outline" size={size} color={color} />
					),
				}}
			/>
			<Drawer.Screen
				name="Creditos"
				component={Creditos_Screen}
				options={{
					drawerIcon: ({ focused, color, size }) => (
						<Icon name="cash-outline" size={size} color={color} />
					),
				}}
			/>
			<Drawer.Screen
				name="Usuarios"
				component={ListarUsuarioScreen}
				options={{
					drawerIcon: ({ focused, color, size }) => (
						<Icon name="person-circle-outline" size={size} color={color} />
					),
				}}
			/>
			{/* <Drawer.Screen
				name="Pago"
				component={PagoScreen}
				options={{
					drawerIcon: ({ focused, color, size }) => (
						<Icon name="card-outline" size={size} color={color} />
					),
				}}
			/> */}
			{/* <Drawer.Screen
				name="Cierre"
				component={CierreScreen}
				options={{
					drawerIcon: ({ focused, color, size }) => (
						<Icon name="lock-closed-outline" size={size} color={color} />
					),
				}}
			/> */}
			<Drawer.Screen
				name="Caja"
				component={FlexScreen}
				options={{
					drawerIcon: ({ focused, color, size }) => (
						<Icon name="calculator-outline" size={size} color={color} />
					),
				}}
			/>
			<Drawer.Screen
				name="Reportes"
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

			<Drawer.Screen
				name="Cerrar Sesion"
				component={LoginScreen}
				options={{
					drawerIcon: ({ focused, color, size }) => (
						<Icon name="close-outline" size={size} color={color} />
					),
				}}
			/>
		</Drawer.Navigator>
	);
}
