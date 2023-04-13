import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import DrawerScreen from "./src/forms/Home/DrawerScreen";
import RegistroScreen from "./src/forms/ClienteScreen/RegistroCliente_Screen";

import PrestamoScreen from "./src/forms/Creditos/Creditos_Screen";
import ListarClienteScreen from "./src/forms/ClienteScreen/ListarCliente_Screen";
import ModificarCliente from "./src/forms/ClienteScreen/RegistroCliente_Screen";
import FrmRegistrarPrestamo from "./src/forms/Creditos/RegistrarCredito_Screen";
import PagarPrestamo from "./src/forms/Creditos/PagarCredito_Screen";
import ListarCronogramaScreen from "./src/forms/Creditos/ListarCronograma_Screen";
import FrmVoucherPago from "./src/forms/Reportes/FrmVoucherPago";
import { ReporteCreditos } from "./src/forms/Impresion/ReporteCreditos";
import { LoginScreen } from "./src/forms/Login/LoginScreen";
import { ReportePagos } from "./src/forms/Impresion/ReportePagos";
import { ReporteClientes } from "./src/forms/Impresion/ReporteClientes";

import Configuracion_Screen from "./src/forms/Configuracion/Configuracion_Screen";
import RegConfigCliente_Screen from "./src/forms/Configuracion/RegConfigCliente_Screen";
import RegistroUsuarioConfig_Screen from "./src/forms/Usuarios/RegistroUsuarioConfig_Screen";
import ListarUsuarioScreen from "./src/forms/Usuarios/ListarUsuarios_Screen";
import RegistroUsuario_Screen from "./src/forms/Usuarios/RegistrarUsuarios_Screen";
import Creditos_Screen from "./src/forms/Creditos/Creditos_Screen";
import PagoScreen from "./src/forms/Pagos/PagoScreen";
import ImprimirScreen from "./src/forms/Impresion/ImprimirScreen";
import CierreScreen from "./src/forms/Cierre/CierreScreen";

export type RootStackParamList = {
	Login: undefined;
	Register: undefined;
	DrawerScreen: undefined;
	Prestamos: undefined;
	// RegistrarPersona: { item: any };
	RegistrarPrestamo: { item: any };
	RegistroPersona: undefined;
	PagarPrestamo: { credito: any };
	VoucherPago: {
		userNombres: any;
		userMontoPagar: any;
		MontPagar: any;
	};
	ListarPersonas: { pantalla?: string; onSelect?: (cliente: any) => void };
	ModificarPersona: { item: any } | undefined;
	ListarCronograma: undefined;
	ListarCreditos: undefined;
	ReporteCreditos: undefined;
	ListarPagos: undefined;
	ReportePagos: undefined;
	ReporteClientes: undefined;
	ListarCierre: undefined;
	Configuracion_Screen: undefined;
	RegConfigCliente_Screen: { item: any } | undefined;
	RegistroUsuarioConfig_Screen: { item: any } | undefined;
	ListarUsuarios: undefined;
	RegistrarUsuarios: { item: any } | undefined;
	ListarImprimir: undefined;
	// Profile: { userId: string };
	// Feed: { sort: 'latest' | 'top' } | undefined;
};

// const Stack = createStackNavigator();
const Stack = createStackNavigator<RootStackParamList>();

function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Login"
					component={LoginScreen}
					options={{ title: "Login" }}
				/>
				<Stack.Screen name="Register" component={RegistroScreen} />
				<Stack.Screen
					name="DrawerScreen"
					component={DrawerScreen}
					options={{
						// headerLeft?, // establece el botón de retroceso como nulo
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="Configuracion_Screen"
					component={Configuracion_Screen}
				/>
				<Stack.Screen
					name="RegConfigCliente_Screen"
					component={RegConfigCliente_Screen}
				/>

				<Stack.Screen name="Prestamos" component={PrestamoScreen} />
				<Stack.Screen name="RegistrarPrestamo" component={FrmRegistrarPrestamo} />
				<Stack.Screen name="PagarPrestamo" component={PagarPrestamo} />
				<Stack.Screen name="VoucherPago" component={FrmVoucherPago} />

				<Stack.Screen
					name="RegistroUsuarioConfig_Screen"
					component={RegistroUsuarioConfig_Screen}
				/>

				<Stack.Screen name="ListarPersonas" component={ListarClienteScreen} />

				<Stack.Screen
					name="ModificarPersona"
					component={ModificarCliente}
					options={{ title: "Modifica Persona" }}
				/>
				<Stack.Screen name="ListarCronograma" component={ListarCronogramaScreen} />
				<Stack.Screen
					name="ReporteCreditos"
					component={ReporteCreditos}
					options={{ title: "Reporte de Créditos" }}
				/>
				<Stack.Screen
					name="ReportePagos"
					component={ReportePagos}
					options={{ title: "Reporte de Pagos" }}
				/>

				<Stack.Screen
					name="ReporteClientes"
					component={ReporteClientes}
					options={{ title: "Reporte de Clientes" }}
				/>

				<Stack.Screen
					name="ListarUsuarios"
					component={ListarUsuarioScreen}
					options={{ title: "Usuarios" }}
				/>

				<Stack.Screen
					name="RegistrarUsuarios"
					component={RegistroUsuario_Screen}
					options={{ title: "Modificar Usuarios" }}
				/>

				<Stack.Screen
					name="ListarCreditos"
					component={Creditos_Screen}
					options={{ title: "Listar Créditos" }}
				/>

				<Stack.Screen
					name="ListarCierre"
					component={CierreScreen}
					options={{ title: "Listar Cierre" }}
				/>

				<Stack.Screen
					name="ListarPagos"
					component={PagoScreen}
					options={{ title: "Listar Pagos" }}
				/>

				<Stack.Screen
					name="ListarImprimir"
					component={ImprimirScreen}
					options={{ title: "Listar Imprimir" }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;
