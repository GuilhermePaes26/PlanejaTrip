import { NavigationContainer, NavigationIndependentTree, useFocusEffect } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView, TextInput, Button } from "react-native";
import Cadastro from "./Cadastro";
import SignIn from "./signin";
import Perfil from "./Perfil";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

const Login = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [initialRoute, setInitialRoute] = useState(null);
  let value = "";
  useFocusEffect(
    React.useCallback(() => {
      const checkLoginStatus = async () => {
        try {
          const value = await AsyncStorage.getItem("isLoggedIn");
          console.log("Login:", value);
          setInitialRoute(value === "true" ? "perfil" : "SignIn");
        } catch (error) {
          console.error("Erro ao verificar login fake", error);
          setInitialRoute("SignIn");
        }
      };

      checkLoginStatus();
    }, []) // ✅ dependências vazias aqui
  );
  console.log(initialRoute);

  if (initialRoute == "perfil") {
    return (
      <NavigationIndependentTree>
        <Stack.Navigator initialRouteName={initialRoute}>
          <Stack.Screen name="perfil" component={Perfil} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationIndependentTree>
    );
  } else {
    return (
      <NavigationIndependentTree>
        <Stack.Navigator initialRouteName={initialRoute}>
          <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
          <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationIndependentTree>
    );
  }

  return (
    <NavigationIndependentTree>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="perfil" component={Perfil} options={{ headerShown: false }} />
        <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
        <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationIndependentTree>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: "30%",
  },
  input: {
    width: "100%",
    minHeight: " 5%",
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 3,
    backgroundColor: "#fff",
    color: "grey",
  },
  title: {
    display: "flex",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  button: {
    fontSize: 16,
    backgroundColor: "lightblue",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    margin: "auto",
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default Login;
