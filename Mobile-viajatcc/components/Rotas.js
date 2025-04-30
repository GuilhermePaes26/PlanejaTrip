// import * as React from 'react';
import React, { useState, useEffect } from 'react';
// import { Text, View } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MinhasViagens from './viagem/MinhasViagens';
import Viagens from './viagem/viagens';
import Login from './account/Login';
import Perfil from './account/Perfil';
// import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // ✅ CORRETO


const tab = createBottomTabNavigator();

// controle de login
export default function Rotas() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); 

    useFocusEffect(
        React.useCallback(() => {
          const checkLoginStatus = async () => {
            try {
              const value = await AsyncStorage.getItem('isLoggedIn');
              console.log(value);
              
              setIsLoggedIn(value);
            } catch (error) {
              console.error('Erro ao verificar login fake', error);
            }
          };
      
          checkLoginStatus();
        }, [])
      );

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
                    headerShown: false, 
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
                    headerShown: false, 
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
                        headerShown: false, 
                        tabBarLabel: 'Minha conta',
                        tabBarIcon: ({ color, size }) => (

                            
                            <MaterialCommunityIcons name="account-circle" color={color} size={size} />
                        ),
                    }}
                /> 
        </tab.Navigator>
    )
}
                // screenOptions={({ route }) => ({
                //     tabBarIcon: ({ color, size }) => {
                //       let iconName = route.name === 'Início' ? 'home-outline' : 'person-outline';
                //       return <Ionicons name='' size={size} color={color} />;
                //     },
                //     tabBarActiveTintColor: '#6200ea',
                //     tabBarInactiveTintColor: 'gray',
                // })}
    
// export default { Rotas };