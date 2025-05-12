import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StripeProvider } from "@stripe/stripe-react-native";

import Rotas from "./components/Rotas";

// const route = createStackNavigator()

export default function App() {
  return (
    <StripeProvider>
      <NavigationContainer>
        <Rotas />
      </NavigationContainer>
    </StripeProvider>
  );
}
