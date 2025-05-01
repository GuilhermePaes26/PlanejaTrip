import React, { useState } from "react";
import { SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
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
      // Trocar ip, ip etec: http://10.67.168.160:3000/users
      const res = await fetch("http://10.0.2.2:3000/users", {
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
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>Criar Conta</Text>
          <Field label="Nome" value={nome} onChange={setNome} />
          <Field label="Email" value={email} onChange={setEmail} keyboardType="email-address" />
          <View style={styles.field}>
            <Text style={styles.label}>Senha:</Text>
            <View style={styles.passwordContainer}>
              <TextInput style={styles.input} placeholder="••••••••" placeholderTextColor="#999" secureTextEntry={!senhaVisivel} value={senha} onChangeText={setSenha} />
              <Entypo name={senhaVisivel ? "eye-with-line" : "eye"} size={20} color="#666" style={styles.eyeIcon} onPress={() => setSenhaVisivel((v) => !v)} />
            </View>
          </View>
          <Field label="CPF" value={cpf} onChange={setCpf} keyboardType="numeric" />
          <Field label="Idade" value={idade} onChange={setIdade} keyboardType="numeric" />
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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// componente auxiliar para campo simples
function Field({ label, value, onChange, keyboardType }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}:</Text>
      <TextInput style={styles.input} placeholder={label} placeholderTextColor="#999" keyboardType={keyboardType || "default"} value={value} onChangeText={onChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#233DDF",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 30,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    color: "#fff",
    marginBottom: 6,
    fontSize: 16,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#F9F8F6",
    borderRadius: 5,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#000",
    borderWidth: 1,
    borderColor: "#D2CEC5",
  },
  passwordContainer: {
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    right: 12,
    top: 15,
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  checkbox: {
    marginLeft: 5,
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 3,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    width: 14,
    height: 14,
    backgroundColor: "#FFBB12",
  },
  termsText: {
    color: "#fff",
    fontSize: 14,
  },
  actionsContainer: {
    marginLeft: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    flex: 1,
    backgroundColor: "#FFBB12",
    borderRadius: 5,
    paddingVertical: 14,
    alignItems: "center",
    marginRight: 10,
  },
  buttonDisabled: {
    backgroundColor: "#AAA",
  },
  buttonText: {
    color: "#233DDF",
    fontSize: 16,
    fontWeight: "bold",
  },
  linkButton: {
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  linkButtonText: {
    color: "#FFF",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
