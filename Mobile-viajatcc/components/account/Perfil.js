// ProfileScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // carrega os dados salvos após o login
    AsyncStorage.getItem("userData")
      .then((raw) => {
        if (raw) {
          setUser(JSON.parse(raw));
        }
      })
      .catch((err) => console.error("Erro ao ler userData:", err));
  }, []);

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("isLoggedIn");
      await AsyncStorage.removeItem("userData");
      console.log("Logout realizado!");
      // volta ao fluxo de autenticação
      navigation.replace("Auth");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#132166" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: "https://randomuser.me/api/portraits/men/75.jpg" }} style={styles.avatar} />
      <Text style={styles.name}>{user.nome}</Text>
      <Text style={styles.senha}>{user.cpf}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <Text style={styles.idade}>Idade: {user.idade}</Text>

      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    fontSize: 16,
    backgroundColor: "lightblue",
    padding: 10,
    borderRadius: 5,
    width: "50%",
    margin: "auto",
    marginTop: 20,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 60,
    backgroundColor: "#fff",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  senha: {
    fontSize: 16,
    color: "#666",
    marginTop: 8,
  },
  email: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
  idade: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
});
