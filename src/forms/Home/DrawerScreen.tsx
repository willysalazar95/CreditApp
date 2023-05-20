import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/Ionicons";
import HomeScreen from "./HomeScreen";
import Creditos_Screen from "../Creditos/Creditos_Screen";
import PagoScreen from "../Pagos/PagoScreen";
import CierreScreen from "../Cierre/CierreScreen";
import CajaScreen from "../Caja/Caja_Screen";
import ImprimirScreen from "../Impresion/ImprimirScreen";
import ConfiguracionScreen from "../Configuracion/ConfiguracionScreen";
import ListarClienteScreen from "../ClienteScreen/ListarCliente_Screen";

import ListarUsuarioScreen from "../Usuarios/ListarUsuarios_Screen";
import { CerrarSesion } from "../Login/CerrarSesion";
import { CambiarContrasenia_Screen } from "../Usuarios/CambiarContrasenia_Screen";
import { configData } from "../../../config";
import SimularCredito_Screen from "../Creditos/SimularCredito_Screen";
import OtrosIngresos_Screen from "../Ingresos/OtrosIngresos_Screen";

const Drawer = createDrawerNavigator();

export default function DrawerScreen() {
	return (
		<Drawer.Navigator initialRouteName="Home" >
			<Drawer.Screen name="Home" component={HomeScreen}
				options={{ title:'Inicio',
					drawerIcon: ({ focused, color, size }) => (
						<Icon name="home-outline" size={size} color={color} />
					),
				}}
			/>
			<Drawer.Screen name="Clientes" component={ListarClienteScreen}
				options={{title:'Clientes',
					drawerIcon: ({ focused, color, size }) => (
						<Icon name="person-outline" size={size} color={color} />
					),
				}}
			/>
			<Drawer.Screen name="Creditos" component={Creditos_Screen}
				options={{title:'Credito',
					drawerIcon: ({ focused, color, size }) => (
						<Icon name="cash-outline" size={size} color={color} />
					),
				}}
			/>
			<Drawer.Screen name="Simular Crédito" component={SimularCredito_Screen}
				options={{
					drawerIcon: ({ focused, color, size }) => (
						<Icon name="card-outline" size={size} color={color} />
					),
				}}
			/>
			{configData.nUsuTipo == 1 ? (
				<Drawer.Screen name="Usuarios" component={ListarUsuarioScreen}
					options={{
						drawerIcon: ({ focused, color, size }) => (
							<Icon name="person-circle-outline" size={size} color={color} />
						),
					}}
				/>
			) : (
				<></>
			)}
			<Drawer.Screen name="Caja" component={CajaScreen}
				options={{
					drawerIcon: ({ focused, color, size }) => (
						<Icon name="calculator-outline" size={size} color={color} />
					),
				}}
			/>
			<Drawer.Screen name="Otros Ingresos" component={OtrosIngresos_Screen}
				options={{title:'Otros Ingresos',
					drawerIcon: ({ focused, color, size }) => (
						<Icon name="cash-outline" size={size} color={color} />
					),
				}}
			/>
			<Drawer.Screen name="Reportes" component={ImprimirScreen}
				options={{
					drawerIcon: ({ focused, color, size }) => (
						<Icon name="print-outline" size={size} color={color} />
					),
				}}
			/>
			<Drawer.Screen name="Configuracion" component={ConfiguracionScreen}
				options={{
					drawerIcon: ({ focused, color, size }) => (
						<Icon name="settings-outline" size={size} color={color} />
					),
				}}
			/>
			<Drawer.Screen name="Cambiar Contraseña" component={CambiarContrasenia_Screen}
				options={{
					drawerIcon: ({ focused, color, size }) => (
						<Icon name="lock-closed-outline" size={size} color={color} />
					),
				}}
			/>
			<Drawer.Screen name="Cerrar Sesion" component={CerrarSesion}
				options={{
					drawerIcon: ({ focused, color, size }) => (
						<Icon name="close-outline" size={size} color={color} />
					),
				}}
			/>
		</Drawer.Navigator>
	);
}
