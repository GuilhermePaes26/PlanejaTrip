// screens/viagem/DetalhesViagem.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CardField, useStripe } from "@stripe/stripe-react-native";

const CARD_STYLE = {
  backgroundColor: "#efefef",
  textColor: "#000000",
  placeholderColor: "#888888",
};

const CARD_FIELD_CONTAINER_STYLE = {
  width: "100%",
  height: 50,
  marginVertical: 12,
};

const DetalhesViagem = ({ route, navigation }) => {
  const { tripId } = route.params;
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [cardDetails, setCardDetails] = useState(null);
  const { confirmPayment } = useStripe();

  const placeholderImage = require("../../assets/IlhaComprida.jpg");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`http://10.0.2.2:3000/trips/${tripId}`);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        setTrip(await res.json());
      } catch (err) {
        console.error(err);
        Alert.alert("Erro", "Não foi possível carregar detalhes.");
      } finally {
        setLoading(false);
      }
    })();
  }, [tripId]);

  const handlePayment = async () => {
    console.log(cardDetails);
    if (!trip || !cardDetails?.complete) {
      Alert.alert("Cartão inválido", "Preencha os dados do cartão corretamente.");
      return;
    }
    setPaying(true);

    try {
      // 1) Cria PaymentIntent
      const piRes = await fetch("http://10.0.2.2:3000/payments/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Math.round(trip.preco * 100),
          currency: "brl",
        }),
      });
      const { clientSecret } = await piRes.json();

      // 2) Efetua o pagamento
      const { error, paymentIntent } = await confirmPayment(clientSecret, {
        type: "Card",
        billingDetails: {},
      });
      if (error) {
        Alert.alert("Erro Stripe", error.message);
        setPaying(false);
        return;
      }

      // 3) Persiste no seu backend
      if (paymentIntent) {
        const user = JSON.parse(await AsyncStorage.getItem("userData"));
        const payload = {
          usuario_id: user._id,
          viagem_id: tripId,
          valor: trip.preco,
          metodo: "card",
          data_pagamento: new Date().toISOString(),
        };
        const saveRes = await fetch("http://10.0.2.2:3000/payments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!saveRes.ok) throw new Error("Falha ao salvar pagamento");

        Alert.alert("Sucesso", "Pagamento e reserva confirmados!", [
          {
            text: "OK",
            onPress: () => navigation.navigate("MinhasViagens"),
          },
        ]);
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Erro", "Ocorreu um problema no pagamento.");
    } finally {
      setPaying(false);
    }
  };

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;
  if (!trip) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{trip.nome}</Text>

      <Text style={styles.sectionTitle}>Descrição</Text>
      <Text style={styles.description}>{trip.descricao || "Sem descrição disponível."}</Text>

      <Image source={placeholderImage} style={styles.imagem} />

      <Text style={styles.sectionTitle}>Data</Text>
      <Text style={styles.value}>{trip.data}</Text>

      <Text style={styles.sectionTitle}>Preço</Text>
      <Text style={styles.value}>R${trip.preco}</Text>

      <Text style={styles.sectionTitle}>Ponto de Partida</Text>
      <Text style={styles.value}>{trip.startPoint?.namePoint || "Não informado"}</Text>

      <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Dados do Cartão</Text>
      <CardField
        postalCodeEnabled={false}
        placeholders={{ number: "4242 4242 4242 4242" }}
        cardStyle={CARD_STYLE}
        style={CARD_FIELD_CONTAINER_STYLE}
        onCardChange={(details) => {
          console.log("💳 onCardChange:", details);
          setCardDetails(details);
        }}
        onFocus={(field) => console.log("💳 onFocus:", field)}
      />

      <TouchableOpacity style={[styles.payButton, paying && styles.payButtonDisabled]} onPress={handlePayment} disabled={paying}>
        <Text style={styles.payButtonText}>{paying ? "Processando..." : `Pagar R$${trip.preco}`}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 12 },
  sectionTitle: { fontSize: 16, marginTop: 12, fontWeight: "600" },
  description: { fontSize: 14, color: "#444", marginBottom: 12 },
  value: { fontSize: 14, color: "#000" },
  imagem: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginVertical: 12,
  },
  payButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
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
