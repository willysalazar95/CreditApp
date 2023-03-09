import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/forms/Login/LoginScreen";
import DrawerScreen from "./src/forms/Home/DrawerScreen";
import RegistroScreen from "./src/forms/Registro/RegistroScreen";
import PrestamoScreen from "./src/forms/Prestamo/PrestamoScreen";

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
