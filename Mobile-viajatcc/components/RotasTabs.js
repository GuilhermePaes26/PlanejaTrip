import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Viagens from "./viagem/viagens";
import MinhasViagens from "./viagem/MinhasViagens";
import ProfileScreen from "./account/Perfil";

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator initialRouteName="Home" tabBarOptions={{ activeTintColor: "#b94646" }}>
      <Tab.Screen
        name="Home"
        component={Viagens}
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
