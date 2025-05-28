// SignIn.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "react-native";

export default function SignIn({ navigation }) {
  const [name, setName] = useState("");
  const [Senha, setSenha] = useState("");

  const vaiParaCadastro = () => {
    navigation.navigate("Cadastro");
  };

  const login = async () => {
    if (!name || !Senha) {
      return Alert.alert("Erro", "Preencha usuário e senha");
    }

    try {
      const res = await fetch("http://10.0.2.2:3000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: name, password: Senha }),
      });

      if (!res.ok) {
        return Alert.alert("Falha no login", "Credenciais inválidas");
      }

      const user = await res.json();
      await AsyncStorage.setItem("isLoggedIn", "true");
      await AsyncStorage.setItem("userData", JSON.stringify(user));

      navigation.replace("App");
    } catch (err) {
      console.error(err);
      Alert.alert("Erro", "Não foi possível conectar ao servidor");
    }
  };

  return (

    
    <View style={styles.container}>

  <Text style={styles.title}>Login</Text>

     <View style={{ backgroundColor: "#fff", borderRadius: 8, padding: 20, elevation: 3 }}>
  <Text style={styles.label}>Email</Text>
  <TextInput style={styles.input} />

  <Text style={styles.label}>Senha</Text>
  <TextInput style={styles.input} secureTextEntry />

  <TouchableOpacity style={styles.button}>
    <Text style={styles.buttonText}>Entrar</Text>
  </TouchableOpacity>

  <Text style={styles.textLinkCadastro} onPress={vaiParaCadastro}>
    Cadastrar uma conta
  </Text>
</View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F2F5",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderColor: "#D0D0D0",
    borderWidth: 1,
    fontSize: 16,
    color: "#333",
  },
  label: {
    fontSize: 16,
    color: "#2C3E50",
    marginBottom: 5,
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#1A237E",
    paddingVertical: 15,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  textLinkCadastro: {
    fontSize: 14,
    color: "#1A237E",
    marginTop: 10,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
