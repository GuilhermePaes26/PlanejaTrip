// screens/viagem/DetalhesViagem.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DetalhesViagem = ({ route, navigation }) => {
  const { tripId } = route.params;
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);

  // 1) Carrega detalhes da viagem
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`http://10.0.2.2:3000/trips/${tripId}`);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        setTrip(data);
      } catch (error) {
        console.error("Erro ao carregar detalhes", error);
        Alert.alert("Erro", "Não foi possível carregar detalhes da viagem.");
      } finally {
        setLoading(false);
      }
    })();
  }, [tripId]);

  // 2) Função para simular pagamento e enviar POST /payments
  const handlePayment = async () => {
    if (!trip) return;
    setPaying(true);
    try {
      // 2.1) Simula chamada a gateway de pagamento
      await new Promise((res) => setTimeout(res, 1500));
      const approved = true;

      if (!approved) {
        Alert.alert("Pagamento", "Pagamento não aprovado.");
        return;
      }

      // 2.2) Monta payload conforme seu schema
      const user = await AsyncStorage.getItem("userData");
      // certifique-se de salvar userId ao logar
      const userId = JSON.parse(user)._id;
      const paymentPayload = {
        usuario_id: userId,
        viagem_id: tripId,
        valor: trip.preco,
        metodo: "credit_card", // aqui você pode parametrizar ou exibir opções
        data_pagamento: new Date().toISOString(),
      };

      // 2.3) Envia para seu backend
      const res = await fetch("http://10.0.2.2:3000/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentPayload),
      });

      if (!res.ok) throw new Error(`Status ${res.status}`);

      Alert.alert("Sucesso", "Pagamento realizado com sucesso!", [{ text: "OK", onPress: () => navigation.navigate("MinhasViagens") }]);
    } catch (error) {
      console.error("Erro no pagamento", error);
      Alert.alert("Erro", "Não foi possível processar o pagamento.");
    } finally {
      setPaying(false);
    }
  };

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }
  if (!trip) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{trip.nome}</Text>
      <Text style={styles.label}>
        Data: <Text style={styles.value}>{trip.data}</Text>
      </Text>
      <Text style={styles.label}>
        Preço: <Text style={styles.value}>R${trip.preco}</Text>
      </Text>
      <Text style={styles.label}>
        Descrição: <Text style={styles.value}>{trip.descricao || "Sem descrição disponível."}</Text>
      </Text>
      <Text style={styles.label}>
        Ponto de Partida: <Text style={styles.value}>{trip.startPoint?.namePoint}</Text>
      </Text>

      <TouchableOpacity style={[styles.payButton, paying && styles.payButtonDisabled]} onPress={handlePayment} disabled={paying}>
        <Text style={styles.payButtonText}>{paying ? "Processando..." : "Efetuar Pagamento"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  label: { fontSize: 16, marginTop: 5 },
  value: { fontWeight: "600" },
  payButton: {
    marginTop: 30,
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  payButtonDisabled: {
    backgroundColor: "#A5D6A7",
  },
  payButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DetalhesViagem;
