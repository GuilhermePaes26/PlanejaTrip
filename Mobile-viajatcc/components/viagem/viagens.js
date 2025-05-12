import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";

const placeholderImage = require("../../assets/IlhaComprida.jpg");

const Viagens = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [trips, setTrips] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        try {
          const value = await AsyncStorage.getItem("isLoggedIn");
          setIsLoggedIn(!!value);
        } catch (error) {
          console.error("Erro ao verificar login", error);
        }
      })();
    }, [])
  );

  // 2) Busca trips do servidor
  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        try {
          const res = await fetch("http://10.0.2.2:3000/trips");
          if (!res.ok) throw new Error(`Status ${res.status}`);
          const data = await res.json();
          setTrips(data);
        } catch (error) {
          console.error("Erro ao buscar viagens", error);
          Alert.alert("Erro", "Não foi possível carregar viagens.");
        }
      })();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Viagens Disponíveis</Text>
      <FlatList
        data={trips}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.viagemItem}>
            <Image source={placeholderImage} style={styles.imagem} />
            <Text style={styles.destino}>{item.nome}</Text>
            <Text style={styles.data}>Data: {item.data}</Text>
            <Text style={styles.valor}>Valor: R${item.preco}</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Comprar</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={{ textAlign: "center", marginTop: 20 }}>Nenhuma viagem encontrada.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#A3CDFF",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  viagemItem: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: "center",
  },
  imagem: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  destino: {
    fontSize: 18,
    fontWeight: "bold",
  },
  data: {
    fontSize: 16,
    color: "#555",
  },
  valor: {
    fontSize: 16,
    color: "green",
  },
  button: {
    backgroundColor: "lightblue",
    padding: 10,
    borderRadius: 5,
    width: "100%",
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default Viagens;
