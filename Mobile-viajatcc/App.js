// App.js
import React from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { StripeProvider } from "@stripe/stripe-react-native";
import { useFonts } from "expo-font";

import Rotas from "./components/Rotas";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#E5F1FF",
        }}
      >
        <ActivityIndicator size="large" color="#0288D1" />
      </View>
    );
  }
  return (
    <StripeProvider publishableKey="pk_test_51RO3m2Pl2DwyQUxPW4aWMXiRoJtgtbrgAmcsOl7myKI5KVJA05EdM7Pl62CKCKNpzV1mdAEoetQNB6hHHgdJyJaq00zc0MR6ne">
      <NavigationContainer>
        <Rotas />
      </NavigationContainer>
    </StripeProvider>
  );
}
