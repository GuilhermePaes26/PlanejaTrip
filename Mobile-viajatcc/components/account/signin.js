// SignIn.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

      <View style={styles.decoration}>
        <View style={styles.alinhamento}>
          <Text style={styles.label}>Email de Usuário</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />

          <Text style={styles.label}>Senha</Text>
          <TextInput style={styles.input} value={Senha} onChangeText={setSenha} secureTextEntry />

          <Text style={styles.textLinkCadastro} onPress={vaiParaCadastro}>
            Cadastrar uma conta
          </Text>

          <TouchableOpacity style={styles.button} onPress={login}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ACD2FF",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "70%",
    minHeight: " 5%",
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 3,
    backgroundColor: "#fff",
    color: "grey",
    alignItems: "center",
    display: "flex",
  },
  title: {
    display: "flex",
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#FFFFFF",
    textAlign: "center",
    backgroundColor: "#132166",
    paddingVertical: 10,
    paddingHorizontal: 80,
    borderRadius: 5,
  },
  label: {
    display: "flex",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#FFFFFF",
  },
  button: {
    fontSize: 16,
    backgroundColor: "lightblue",
    padding: 10,
    borderRadius: 5,
    width: "50%",
    margin: "auto",
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
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
    borderRadius: "100%",
    marginRight: 300,
  },
  alinhamento: {
    display: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "300",
    marginVertical: "auto",
  },
});
