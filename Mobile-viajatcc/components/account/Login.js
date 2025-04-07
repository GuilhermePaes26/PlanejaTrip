import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Cadastro from './Cadastro';
import SignIn from './signin';

const Stack = createStackNavigator();

const Login = ({ navigation }) => {
    const [name, setName] = useState('');
    const [Senha, setSenha] = useState('');

    return (
        <NavigationIndependentTree>
            <Stack.Navigator initialRouteName="SignIn">
                <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
                <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationIndependentTree>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: '30%'
    },
    input: {
        width: '100%',
        minHeight: ' 5%',
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 3,
        backgroundColor: '#fff',
        color: 'grey',
    },
    title: {
        display: 'flex',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    button: {
        fontSize: 16,
        backgroundColor: 'lightblue',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        margin: 'auto',
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18
    }
})

export default Login;