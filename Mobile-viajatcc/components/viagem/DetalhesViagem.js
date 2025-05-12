import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";

const DetalhesViagem = ({ route }) => {
  const { tripId } = route.params;
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

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
      {/* Exiba outros campos: onibus, passageiros, startpoint, etc. */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  label: { fontSize: 16, marginTop: 5 },
  value: { fontWeight: "600" },
});

export default DetalhesViagem;
