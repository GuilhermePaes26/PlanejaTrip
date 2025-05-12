import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Viagens from "./viagem/viagens";
import DetalhesViagem from "./viagem/DetalhesViagem";
import MinhasViagens from "./viagem/MinhasViagens";
import ProfileScreen from "./account/Perfil";

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: true }}>
      <HomeStack.Screen name="Viagens" component={Viagens} options={{ headerShown: false }} />
      <HomeStack.Screen name="DetalhesViagem" component={DetalhesViagem} options={{ headerShown: false }} />
    </HomeStack.Navigator>
  );
}

export default function AppTabs() {
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={{ tabBarActiveTintColor: "#b94646" }}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="MinhasViagens"
        component={MinhasViagens}
        options={{
          headerShown: false,
          tabBarLabel: "Minhas Viagens",
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="map" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Minha Conta",
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="account-circle" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}
