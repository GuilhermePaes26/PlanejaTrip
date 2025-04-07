import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MinhasViagens from './viagem/MinhasViagens';
import Viagens from './viagem/viagens';
import Login from './account/Login';

const tab = createBottomTabNavigator();

const Rotas = () => {
    return (
        <tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                activeTintColor: '#b94646',
            }}
        >

            <tab.Screen
                name="Home"
                component={Viagens}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                }}
            />

            <tab.Screen
                name="MinhasViagens"
                component={MinhasViagens}
                options={{
                    tabBarLabel: 'Minhas Viagens',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="map" color={color} size={size} />
                    ),
                }}
            />

            <tab.Screen
                name="Conta"
                component={Login}
                options={{
                    tabBarLabel: 'Minha conta',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account-circle" color={color} size={size} />
                    ),
                }}
            />
        </tab.Navigator>
    )
}
export default Rotas;