// SignIn.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const vaiParaCadastro = () => {
    navigation.navigate("Cadastro");
  };

  const login = async () => {
    if (!email || !senha) {
      return Alert.alert("Erro", "Preencha usuário e senha");
    }

    try {
      const res = await fetch("http://10.0.2.2:3000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: senha }),
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
    <ImageBackground source={require("../../assets/fundo-Login.jpg")} style={styles.background} resizeMode="cover">
      <View style={styles.overlay} />

      <View style={styles.header}>
        <Text style={styles.title}>WELCOME{"\n"}BACK</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardSubtitle}>Por favor, faça seu login</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Digite seu email" placeholderTextColor="#666" keyboardType="email-address" autoCapitalize="none" />

        <Text style={styles.label}>Senha</Text>
        <TextInput style={styles.input} value={senha} onChangeText={setSenha} placeholder="Digite sua senha" placeholderTextColor="#666" secureTextEntry />

        <TouchableOpacity onPress={vaiParaCadastro}>
          <Text style={styles.linkCadastro}>Cadastrar uma conta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={login}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  header: {
    width: "100%",
    alignItems: "center",
    marginTop: Platform.select({ ios: 100, android: 80 }),
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    // fontFamily: "Montserrat-Bold",
    lineHeight: 42,
  },
  card: {
    width: "85%",
    maxWidth: 360,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 24,
    paddingHorizontal: 20,
    marginTop: 30,
    alignItems: "stretch",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 6,
  },
  cardSubtitle: {
    fontSize: 16,
    color: "#444",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#132166",
    marginBottom: 6,
    marginTop: 8,
    marginLeft: 4,
  },
  input: {
    width: "100%",
    height: Platform.select({ ios: 44, android: 48 }),
    backgroundColor: "#E3F2FD",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
  linkCadastro: {
    alignSelf: "center",
    marginTop: 8,
    marginBottom: 18,
    fontSize: 15,
    color: "#0288D1",
    textDecorationLine: "underline",
  },
  button: {
    width: "100%",
    height: Platform.select({ ios: 50, android: 52 }),
    backgroundColor: "#0288D1",
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
    // Caso queira outra fonte, adicione fontFamily aqui também:
    // fontFamily: "Montserrat-SemiBold",
  },
});
