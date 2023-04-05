import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import DrawerScreen from "./src/forms/Home/DrawerScreen";
import RegistroScreen from "./src/forms/ClienteScreen/FrmRegistroCliente";

import PrestamoScreen from "./src/forms/Creditos/Creditos_Screen";
import ListarClienteScreen from "./src/forms/ClienteScreen/ListarClienteScreen";
import FrmRegistroCliente from "./src/forms/ClienteScreen/FrmRegistroCliente";
import ModificarCliente from "./src/forms/ClienteScreen/FrmRegistroCliente";
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
	ListarPersonas: { opcion: any };
	ModificarPersona: { item: any } | undefined;
	ListarCronograma: undefined;
	ReporteCreditos: undefined;
	ReportePagos: undefined;
	ReporteClientes: undefined;

	Configuracion_Screen: undefined;
	RegConfigCliente_Screen: {item: any} | undefined;
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
				<Stack.Screen name="Configuracion_Screen" component={Configuracion_Screen} />
				<Stack.Screen name="RegConfigCliente_Screen" component={RegConfigCliente_Screen} />
				
				<Stack.Screen name="Prestamos" component={PrestamoScreen} />
				<Stack.Screen name="RegistrarPrestamo" component={FrmRegistrarPrestamo} />
				<Stack.Screen name="PagarPrestamo" component={PagarPrestamo} />
				<Stack.Screen name="VoucherPago" component={FrmVoucherPago} />

				

				<Stack.Screen name="ListarPersonas" component={ListarClienteScreen} />
				<Stack.Screen
					name="RegistroPersona"
					component={FrmRegistroCliente}
					options={{ title: "Registro de Persona" }}
				/>
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
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;
