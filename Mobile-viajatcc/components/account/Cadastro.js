import React, { useState } from "react";
import { SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground } from "react-native";
import { Entypo } from "@expo/vector-icons";

export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [cpf, setCpf] = useState("");
  const [idade, setIdade] = useState("");
  const [termos, setTermos] = useState(false);

  const handleRegister = async () => {
    if (!nome || !email || !senha || !cpf || !idade) {
      return Alert.alert("Erro", "Preencha todos os campos");
    }
    if (!termos) {
      return Alert.alert("Erro", "Você deve aceitar os termos");
    }
    try {
      const res = await fetch("https://planejatrip.onrender.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha, cpf, idade: Number(idade) }),
      });
      if (!res.ok) throw new Error();
      Alert.alert("Sucesso", "Conta criada!", [{ text: "OK", onPress: () => navigation.replace("SignIn") }]);
    } catch {
      Alert.alert("Erro", "Não foi possível cadastrar a conta");
    }
  };

  return (
    <SafeAreaView style={styles.fullContainer}>
      <ImageBackground source={require("../../assets/header-cadastro.webp")} style={styles.headerBackground} resizeMode="cover">
        <View style={styles.headerOverlay}>
          <Text style={styles.headerTitle}>Criar Conta</Text>
        </View>
      </ImageBackground>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.card}>
            <Text style={styles.label}>Nome</Text>
            <TextInput style={styles.input} placeholder="Digite seu nome" placeholderTextColor="#666" value={nome} onChangeText={setNome} autoCapitalize="words" />

            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} placeholder="Digite seu email" placeholderTextColor="#666" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />

            <Text style={styles.label}>Senha</Text>
            <View style={styles.passwordContainer}>
              <TextInput style={styles.input} placeholder="••••••••" placeholderTextColor="#666" secureTextEntry={!senhaVisivel} value={senha} onChangeText={setSenha} />
              <TouchableOpacity style={styles.eyeIcon} onPress={() => setSenhaVisivel((v) => !v)}>
                <Entypo name={senhaVisivel ? "eye-with-line" : "eye"} size={20} color="#666" />
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>CPF</Text>
            <TextInput style={styles.input} placeholder="Digite seu CPF" placeholderTextColor="#666" keyboardType="numeric" value={cpf} onChangeText={setCpf} />

            <Text style={styles.label}>Idade</Text>
            <TextInput style={styles.input} placeholder="Digite sua idade" placeholderTextColor="#666" keyboardType="numeric" value={idade} onChangeText={setIdade} />

            <View style={styles.termsContainer}>
              <TouchableOpacity style={styles.checkbox} onPress={() => setTermos((t) => !t)}>
                {termos && <View style={styles.checkboxChecked} />}
              </TouchableOpacity>
              <Text style={styles.termsText}>Concordo com os Termos e Condições</Text>
            </View>

            <View style={styles.actionsContainer}>
              <TouchableOpacity style={[styles.button, !termos && styles.buttonDisabled]} onPress={handleRegister} disabled={!termos}>
                <Text style={styles.buttonText}>Cadastrar Conta</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.linkButton} onPress={() => navigation.replace("SignIn")}>
                <Text style={styles.linkButtonText}>Já tenho conta</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: "#E5F1FF",
  },
  headerBackground: {
    width: "100%",
    height: 180,
    justifyContent: "center",
    alignItems: "center",
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
    paddingTop: -40,
  },
  card: {
    backgroundColor: "#FFF",
    marginTop: 20,
    borderRadius: 12,
    paddingVertical: 24,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#132166",
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    width: "100%",
    height: Platform.select({ ios: 44, android: 48 }),
    backgroundColor: "#E3F2FD",
    borderRadius: 6,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#333",
  },
  passwordContainer: {
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    right: 12,
    top: Platform.select({ ios: 12, android: 14 }),
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 24,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#132166",
    borderRadius: 4,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    width: 14,
    height: 14,
    backgroundColor: "#0288D1",
    borderRadius: 2,
  },
  termsText: {
    fontSize: 14,
    color: "#132166",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    flex: 1,
    backgroundColor: "#0288D1",
    borderRadius: 6,
    paddingVertical: 14,
    alignItems: "center",
    marginRight: 10,
  },
  buttonDisabled: {
    backgroundColor: "#AAA",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  linkButton: {
    paddingVertical: 14,
    paddingHorizontal: 8,
  },
  linkButtonText: {
    color: "#0288D1",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
