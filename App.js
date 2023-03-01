import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import RegistroScreen from "./src/forms/Registro/RegistroScreen";
import LoginScreen from "./src/forms/Login/LoginScreen";
import DrawerScreen from "./src/forms/Home/DrawerScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="register" component={RegistroScreen} />
        <Stack.Screen name="home" component={DrawerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
