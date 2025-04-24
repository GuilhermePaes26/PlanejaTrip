import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MinhasViagens from './viagem/MinhasViagens';
import Viagens from './viagem/viagens';
import Login from './account/Login';
import { AsyncStorage } from 'react-native';

const tab = createBottomTabNavigator();

// controle de login
export default function Rotas() {
    const [isLoggedIn, setIsLoggedIn] = userState(false); 

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                setIsLoggedIn(!!token);
            } catch (error) {
                console.error('Erro ao verificar o status de login', error);
            }
        };

        checkLoginStatus();

    }, []);

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
            
            {isLoggedIn ? (
                <tab.Screen 
                name="Perfil"
                component={Perfil}
                options={{
                    tabBarLabel: 'Perfil',
                    tabBarIcon: ({ color, size }) => (

                        
                        <MaterialCommunityIcons name="profile-circle" color={color} size={size} />
                    ),
                }}
                /> ) : (
                <tab.Screen
                    name="Conta"
                    component={Login}
                    options={{
                        tabBarLabel: 'Minha conta',
                        tabBarIcon: ({ color, size }) => (

                            
                            <MaterialCommunityIcons name="account-circle" color={color} size={size} />
                        ),
                    }}
                /> )
                }
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