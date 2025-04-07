import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Cadastro from './Cadastro';

const Stack = createStackNavigator();

const SignIn = ({ navigation }) => {
    const [name, setName] = useState('');
    const [Senha, setSenha] = useState('');
    
    let vaiParaCadastro = () => {
        navigation.navigate("Cadastro");
      };

    return (

        <View style={styles.container}>
            

            
            <Text style={styles.title}>Login</Text>
            
                <View style={styles.decoration}>

                <View style={styles.alinhamento}>
                    <Text style={styles.label}>Usuário</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                    />

                    <Text style={styles.label}>Senha</Text>

                    <TextInput
                        style={styles.input}
                        value={Senha}
                        onChangeText={setSenha}
                    />

                    <Text style={styles.textLinkCadastro} onPress={vaiParaCadastro}>Cadastrar uma conta</Text>
                    
                    <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Entrar</Text></TouchableOpacity> 

                </View>
                </View>        
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#A3CDFF',
        alignItems: 'center',
        justifyContent: 'center',
        // marginVertical: '%'
    },
    input: {
        width: '70%',
        minHeight: ' 5%',
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 3,
        backgroundColor: '#fff',
        color: 'grey',
        alignItems: 'center',
        display: 'flex',

    },
    title: {
        display: 'flex',
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        backgroundColor: '#132166',
        paddingVertical: 10,
        paddingHorizontal: 80,
        borderRadius: 5,
        color: '#A3CDFF'
    },
    label: {
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
        width: '50%',
        margin: 'auto',
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18
    },
    textLinkCadastro: {
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5,
        fontSize: 15,
        color: "#FFBB12",
        textDecorationLine: "underline",

      },
      decoration: {
        backgroundColor: "blue",
        width: 650,
        height: 650,
        borderRadius: '100%',
        marginRight: 300,

      },
      alinhamento: {
        display: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '300',
        marginVertical: 'auto'
        
      }
})

export default SignIn