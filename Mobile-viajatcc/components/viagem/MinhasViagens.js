import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const route = createStackNavigator()

const viagens = [
  { id: '1', destino: 'Rio de Janeiro', data: '12/04/2024' },
  { id: '2', destino: 'São Paulo', data: '18/05/2024' },
  { id: '3', destino: 'Salvador', data: '22/06/2024' },
];

const MinhasViagens = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Viagens</Text>
      <FlatList
        data={viagens}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.viagemItem} onPress={() => navigation.navigate(`Viagens`)}>
            <Text style={styles.destino}>{item.destino}</Text>
            <Text style={styles.data}>Data: {item.data}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.butt}>
      <Text>Ver mais</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#A3CDFF',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  viagemItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  destino: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  data: {
    fontSize: 16,
    color: '#555',
  },
  botaomais: {
    height: 12,
    width: 10,
  },  
  button: {
    fontSize: 16,
    backgroundColor: 'lightblue',
    padding:10,
    borderRadius:5,
    width: '100%',
  },
});

export default MinhasViagens
