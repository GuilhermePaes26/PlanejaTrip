import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "./signin";
import Cadastro from "./Cadastro";

const Stack = createStackNavigator();

export default function RotasAuth() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="Cadastro" component={Cadastro} />
    </Stack.Navigator>
  );
}
