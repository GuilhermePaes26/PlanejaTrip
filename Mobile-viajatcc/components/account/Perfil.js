import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function ProfileScreen({navigation}) {
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('isLoggedIn');
      console.log('Logout fake realizado!');
      navigation.navigate("Home"); // ou qualquer tela principal
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://randomuser.me/api/portraits/men/75.jpg' }}
        style={styles.avatar}
      />
      <Text style={styles.name}>Poderoso Fodão da Silva</Text>
      <Text style={styles.senha}>696.696.696-69</Text>
      <TouchableOpacity style={styles.button} onPress={logout}><Text style={styles.buttonText}>Sair</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  senha: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
});