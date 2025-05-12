import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StripeProvider } from "@stripe/stripe-react-native";

import Rotas from "./components/Rotas";

// const route = createStackNavigator()

export default function App() {
  return (
    <StripeProvider publishableKey="pk_test_51RO3m2Pl2DwyQUxPW4aWMXiRoJtgtbrgAmcsOl7myKI5KVJA05EdM7Pl62CKCKNpzV1mdAEoetQNB6hHHgdJyJaq00zc0MR6ne">
      <NavigationContainer>
        <Rotas />
      </NavigationContainer>
    </StripeProvider>
  );
}
