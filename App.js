import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/forms/Login/LoginScreen";
import DrawerScreen from "./src/forms/Home/DrawerScreen";
import RegistroScreen from "./src/forms/Registro/RegistroScreen";
import PrestamoScreen from "./src/forms/Creditos/Prestamo_Screen";
import ListarClienteScreen from "./src/forms/ClienteScreen/ListarClienteScreen";
import FrmRegistroCliente from "./src/forms/ClienteScreen/FrmRegistroCliente"
import ModificarCliente from "./src/forms/ClienteScreen/FrmRegistroCliente";
import FrmRegistrarPrestamo from "./src/forms/Creditos/RegistrarPrestamo_Screen";
import PagarPrestamo from "./src/forms/Creditos/PagarPrestamo_Screen";
import ListarCronogramaScreen from "./src/forms/Creditos/ListarCronograma_Screen";
import FrmVoucherPago from "./src/forms/Reportes/FrmVoucherPago";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="register" component={RegistroScreen} />
        <Stack.Screen
          name="DrawerScreen"
          component={DrawerScreen}
          options={{
            headerLeft: null, // establece el botón de retroceso como nulo
            headerShown: false,
          }}
        />
        <Stack.Screen name="prestamos" component={PrestamoScreen} />
        <Stack.Screen name="RegistrarPrestamo" component={FrmRegistrarPrestamo} />
        <Stack.Screen name="PagarPrestamo" component={PagarPrestamo} />
        <Stack.Screen name="VoucherPago" component={FrmVoucherPago} />

        <Stack.Screen name="ListarPersonas" component={ListarClienteScreen} />
        <Stack.Screen name="RegistroPersona" component={FrmRegistroCliente} />
        <Stack.Screen name="ModificarPersona" component={ModificarCliente} />
        <Stack.Screen name="ListarCronograma" component={ListarCronogramaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
