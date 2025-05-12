// screens/viagem/DetalhesViagem.js
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, ActivityIndicator, Alert, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DetalhesViagem({ route, navigation }) {
  const { tripId } = route.params;
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  // campos do cartão
  const [number, setNumber] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [cvc, setCvc] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`http://10.0.2.2:3000/trips/${tripId}`);
        if (!res.ok) throw new Error();
        setTrip(await res.json());
      } catch {
        Alert.alert("Erro", "Não foi possível carregar detalhes.");
      } finally {
        setLoading(false);
      }
    })();
  }, [tripId]);

  const handlePayment = async () => {
    if (!number || !expMonth || !expYear || !cvc) {
      return Alert.alert("Preencha todos os campos do cartão");
    }
    setProcessing(true);
    try {
      const user = JSON.parse(await AsyncStorage.getItem("userData"));
      const payload = {
        usuario_id: user._id,
        viagem_id: tripId,
        valor: trip.preco,
        card: {
          number: number.replace(/\s+/g, ""),
          exp_month: Number(expMonth),
          exp_year: Number(expYear),
          cvc,
        },
      };
      const res = await fetch("http://10.0.2.2:3000/payments/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      Alert.alert("Sucesso", "Pagamento realizado!", [{ text: "OK", onPress: () => navigation.navigate("MinhasViagens") }]);
    } catch (err) {
      console.error(err);
      Alert.alert("Erro", "Não foi possível processar o pagamento.");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;
  if (!trip) return null;

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{trip.nome}</Text>
        <Text style={styles.label}>Descrição:</Text>
        <Text style={styles.text}>{trip.descricao || "—"}</Text>
        <Image source={require("../../assets/IlhaComprida.jpg")} style={styles.image} />
        <Text style={styles.label}>Data:</Text>
        <Text style={styles.text}>{trip.data}</Text>
        <Text style={styles.label}>Preço:</Text>
        <Text style={styles.text}>R${trip.preco}</Text>

        <Text style={[styles.label, { marginTop: 20 }]}>Dados do Cartão</Text>
        <TextInput
          style={styles.input}
          placeholder="Número (4242 4242 4242 4242)"
          keyboardType="number-pad"
          value={number}
          onChangeText={(t) =>
            setNumber(
              t
                .replace(/\D/g, "")
                .match(/.{1,4}/g)
                ?.join(" ") || ""
            )
          }
          maxLength={19}
        />
        <View style={styles.row}>
          <TextInput style={[styles.input, { flex: 1, marginRight: 8 }]} placeholder="MM" keyboardType="number-pad" value={expMonth} onChangeText={setExpMonth} maxLength={2} />
          <TextInput style={[styles.input, { flex: 1, marginRight: 8 }]} placeholder="YY" keyboardType="number-pad" value={expYear} onChangeText={setExpYear} maxLength={2} />
          <TextInput style={[styles.input, { flex: 1 }]} placeholder="CVC" keyboardType="number-pad" value={cvc} onChangeText={setCvc} maxLength={4} />
        </View>

        <TouchableOpacity style={[styles.button, processing && styles.buttonDisabled]} onPress={handlePayment} disabled={processing}>
          <Text style={styles.buttonText}>{processing ? "Processando..." : `Pagar R$${trip.preco}`}</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  label: { fontSize: 16, fontWeight: "600", marginTop: 12 },
  text: { fontSize: 14, color: "#333" },
  image: { width: "100%", height: 150, borderRadius: 8, marginVertical: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginTop: 8,
  },
  row: { flexDirection: "row", marginTop: 8 },
  button: {
    backgroundColor: "#4CAF50",
    padding: 14,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 20,
  },
  buttonDisabled: { backgroundColor: "#A5D6A7" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
