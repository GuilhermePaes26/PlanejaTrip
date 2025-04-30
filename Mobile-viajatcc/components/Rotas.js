// Rotas.js
import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import RotasAuth from "./account/RotasAuth";
import AppTabs from "./RotasTabs";

const Root = createStackNavigator();

export default function Rotas() {
  const [initial, setInitial] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("isLoggedIn")
      .then((val) => setInitial(val === "true" ? "App" : "Auth"))
      .catch(() => setInitial("Auth"));
  }, []);

  if (initial === null) {
    return null; // ou um loader
  }

  return (
    <Root.Navigator initialRouteName={initial} screenOptions={{ headerShown: false }}>
      <Root.Screen name="Auth" component={RotasAuth} />
      <Root.Screen name="App" component={AppTabs} />
    </Root.Navigator>
  );
}
