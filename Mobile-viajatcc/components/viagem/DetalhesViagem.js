import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity, ImageBackground, Dimensions, ScrollView, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

const SCREEN_WIDTH = Dimensions.get("window").width;
const HEADER_HEIGHT = 250;

export default function DetalhesViagem({ route, navigation }) {
  const { tripId } = route.params;
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  const [descExpanded, setDescExpanded] = useState(false);

  const [number, setNumber] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [cvc, setCvc] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`https://planejatrip.onrender.com/trips/${tripId}`);
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
      return Alert.alert("Erro", "Preencha todos os campos do cartão.");
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
      const res = await fetch("https://planejatrip.onrender.com/payments/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      setCvc("");
      setNumber("");
      setExpMonth("");
      setExpYear("");
      setDescExpanded(false);
      setProcessing(false);
      Alert.alert("Sucesso", "Pagamento realizado!", [{ text: "OK", onPress: () => navigation.navigate("MinhasViagens") }]);
    } catch (err) {
      console.error(err);
      Alert.alert("Erro", "Não foi possível processar o pagamento.");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0288D1" />
      </View>
    );
  }
  if (!trip) return null;

  const distance = trip.distance || "Viaje";
  const daysRemain = trip.daysRemain || "Descanse";
  const weather = trip.weather || "Relaxe";
  const rating = 5;

  const MAX_DESC_LINES = 3;

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined} keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}>
      <ImageBackground source={{ uri: trip.imgLink }} style={styles.headerImage} resizeMode="cover">
        <View style={styles.headerOverlay} />

        <TouchableOpacity style={[styles.headerButton, { left: 16 }]} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#FFF" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.headerButton, { right: 16 }]}>
          <FontAwesome name="heart-o" size={24} color="#FFF" />
        </TouchableOpacity>
      </ImageBackground>

      <View style={styles.mainCard}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.tripName}>{trip.nome}</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location-sharp" size={16} color="#666" />
            <Text style={styles.locationText}>{trip.nome || "Localização não informada"}</Text>
          </View>

          <View style={styles.priceRatingRow}>
            <Text style={styles.priceText}>R${trip.preco}/Pessoa</Text>
            <View style={styles.starsRow}>
              {[...Array(5)].map((_, i) => (
                <FontAwesome key={i} name={i < rating ? "star" : "star-o"} size={16} color="#FFC529" style={{ marginRight: 4 }} />
              ))}
            </View>
          </View>

          <View style={styles.infoBar}>
            <View style={styles.infoItem}>
              <MaterialCommunityIcons name="map-marker-distance" size={20} color="#0288D1" />
              <Text style={styles.infoItemText}>{distance}</Text>
              <Text style={styles.infoItemLabel}>Aproveite</Text>
            </View>
            <View style={styles.infoItem}>
              <FontAwesome name="clock-o" size={20} color="#0288D1" />
              <Text style={styles.infoItemText}>{daysRemain}</Text>
              <Text style={styles.infoItemLabel}>Repouse</Text>
            </View>
            <View style={styles.infoItem}>
              <FontAwesome name="sun-o" size={20} color="#0288D1" />
              <Text style={styles.infoItemText}>{weather}</Text>
              <Text style={styles.infoItemLabel}>Lazer</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Descrição</Text>
          <Text style={styles.descriptionText} numberOfLines={descExpanded ? null : MAX_DESC_LINES}>
            {trip.descricao || "Ainda não há descrição disponível para este destino."}
          </Text>
          {!descExpanded && trip.descricao && (
            <TouchableOpacity onPress={() => setDescExpanded(true)} style={styles.readMoreButton}>
              <Text style={styles.readMoreText}>Ler mais</Text>
            </TouchableOpacity>
          )}

          <View style={{ height: 20 }} />

          <Text style={[styles.sectionTitle, { marginTop: 0 }]}>Dados do Cartão</Text>
          <TextInput
            style={styles.input}
            placeholder="Número (XXXX XXXX XXXX XXXX)"
            placeholderTextColor="#999"
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
            <TextInput
              style={[styles.input, { flex: 1, marginRight: 8 }]}
              placeholder="MM"
              placeholderTextColor="#999"
              keyboardType="number-pad"
              value={expMonth}
              onChangeText={setExpMonth}
              maxLength={2}
            />
            <TextInput
              style={[styles.input, { flex: 1, marginRight: 8 }]}
              placeholder="YY"
              placeholderTextColor="#999"
              keyboardType="number-pad"
              value={expYear}
              onChangeText={setExpYear}
              maxLength={2}
            />
            <TextInput style={[styles.input, { flex: 1 }]} placeholder="CVC" placeholderTextColor="#999" keyboardType="number-pad" value={cvc} onChangeText={setCvc} maxLength={4} />
          </View>

          <TouchableOpacity style={[styles.payButton, processing && styles.buttonDisabled]} onPress={handlePayment} disabled={processing}>
            <Text style={styles.payButtonText}>{processing ? "Processando..." : `Pagar R$${trip.preco}`}</Text>
          </TouchableOpacity>

          <View style={{ height: 60 }} />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const CARD_TOP_RADIUS = 24;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5F1FF",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E5F1FF",
  },
  headerImage: {
    width: SCREEN_WIDTH,
    height: HEADER_HEIGHT,
    justifyContent: "space-between",
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  headerButton: {
    position: "absolute",
    top: 40,
    backgroundColor: "rgba(0,0,0,0.4)",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  mainCard: {
    flex: 1,
    backgroundColor: "#FFF",
    borderTopLeftRadius: CARD_TOP_RADIUS,
    borderTopRightRadius: CARD_TOP_RADIUS,
    marginTop: -CARD_TOP_RADIUS,
    paddingTop: 20,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  tripName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#132166",
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  locationText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#666",
  },
  priceRatingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  priceText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0288D1",
  },
  starsRow: {
    flexDirection: "row",
  },

  infoBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  infoItem: {
    flex: 1,
    backgroundColor: "#F8FAFF",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    marginHorizontal: 4,
  },
  infoItemText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#132166",
    marginTop: 6,
  },
  infoItemLabel: {
    fontSize: 11,
    color: "#888",
    marginTop: 2,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#132166",
    marginBottom: 6,
  },
  descriptionText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
  readMoreButton: {
    marginTop: 4,
  },
  readMoreText: {
    fontSize: 14,
    color: "#0288D1",
    fontWeight: "600",
  },

  input: {
    width: "100%",
    height: Platform.select({ ios: 44, android: 48 }),
    backgroundColor: "#E3F2FD",
    borderRadius: 6,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#333",
    marginTop: 8,
  },
  row: {
    flexDirection: "row",
    marginTop: 8,
  },
  payButton: {
    backgroundColor: "#0288D1",
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 20,
  },
  payButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
  },
  buttonDisabled: {
    backgroundColor: "#A5D6A7",
  },
});
