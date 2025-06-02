import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Alert, Dimensions, ImageBackground } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SCREEN_WIDTH = Dimensions.get("window").width;

const categoriesData = [
  { id: "1", label: "Sonhos", icon: "star-outline", desc: "Realizar seus sonhos de viagem" },
  { id: "2", label: "Desejos", icon: "gift-outline", desc: "Explorar destinos de desejo" },
  { id: "3", label: "Objetivos", icon: "bullseye", desc: "Alcançar seus objetivos de viagem" },
  { id: "4", label: "Ideias", icon: "lightbulb-on-outline", desc: "Encontrar inspiração para suas viagens" },
  { id: "5", label: "Ônibus", icon: "bus-side", desc: "Descobrir rotas de ônibus" },
  { id: "6", label: "Praias", icon: "beach", desc: "Relaxar nas melhores praias" },
];

export default function Viagens({ navigation }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [trips, setTrips] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        try {
          const value = await AsyncStorage.getItem("isLoggedIn");
          setIsLoggedIn(!!value);
        } catch (error) {
          console.error("Erro ao verificar login", error);
        }
      })();
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        try {
          const res = await fetch("http://10.0.2.2:3000/trips");
          if (!res.ok) throw new Error(`Status ${res.status}`);
          const data = await res.json();
          setTrips(data);
        } catch (error) {
          console.error("Erro ao buscar viagens", error);
          Alert.alert("Erro", "Não foi possível carregar viagens.");
        }
      })();
    }, [])
  );

  const getCategoryBorderStyle = (index) => {
    switch (index) {
      case 0:
        return { borderTopLeftRadius: 6 };
      case 2:
        return { borderTopRightRadius: 6 };
      case 3:
        return { borderBottomLeftRadius: 6 };
      case 5:
        return { borderBottomRightRadius: 6 };
      default:
        return {};
    }
  };

  const renderCategoryItem = ({ item, index }) => (
    <TouchableOpacity
      style={[styles.categoryCardBase, getCategoryBorderStyle(index)]}
      onPress={() => {
        Alert.alert("Conosco você pode:", item.desc);
      }}
    >
      <MaterialCommunityIcons name={item.icon} size={24} color="#132166" />
      <Text style={styles.categoryLabel}>{item.label}</Text>
    </TouchableOpacity>
  );

  const renderTripItem = ({ item }) => (
    <TouchableOpacity style={styles.tripCard} onPress={() => navigation.navigate("DetalhesViagem", { tripId: item._id })}>
      <Image source={item.imgLink ? { uri: item.imgLink } : require("../../assets/IlhaComprida.jpg")} style={styles.tripImage} />
      <View style={styles.tripInfo}>
        <Text style={styles.tripName} numberOfLines={1}>
          {item.nome}
        </Text>
        <Text style={styles.tripPrice}>R${item.preco}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ImageBackground source={require("../../assets/por-do-sol-brasilia.jpg")} style={styles.headerBackground} resizeMode="cover">
        <View style={styles.headerOverlay}>
          <Text style={styles.headerText}>Para onde vamos?</Text>
        </View>
      </ImageBackground>
      <View style={styles.categoriesContainer}>
        <FlatList data={categoriesData} keyExtractor={(item) => item.id} renderItem={renderCategoryItem} numColumns={3} scrollEnabled={false} columnWrapperStyle={styles.columnWrapper} />
      </View>

      <Text style={styles.popularTitle}>Popular Places</Text>
      <FlatList
        data={trips}
        keyExtractor={(item) => item._id}
        renderItem={renderTripItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma viagem encontrada.</Text>}
        contentContainerStyle={{
          paddingLeft: 20,
          paddingRight: 10,
          paddingBottom: 20,
        }}
      />
    </View>
  );
}

const CATEGORY_CARD_MARGIN = 4;
const CATEGORY_CONTAINER_MARGIN = 16;
const CATEGORY_CONTAINER_PADDING = 4;
const CATEGORY_CARD_WIDTH = (SCREEN_WIDTH - CATEGORY_CONTAINER_MARGIN * 2 - CATEGORY_CONTAINER_PADDING * 2 - CATEGORY_CARD_MARGIN * 2) / 3;

const TRIP_CARD_WIDTH = SCREEN_WIDTH * 0.7;
const TRIP_CARD_HEIGHT = TRIP_CARD_WIDTH * 0.6;

const styles = StyleSheet.create({
  container: {
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
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
  },

  categoriesContainer: {
    backgroundColor: "#FFF",
    marginHorizontal: CATEGORY_CONTAINER_MARGIN,
    borderRadius: 10,
    padding: CATEGORY_CONTAINER_PADDING,
    marginTop: -30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  categoryCardBase: {
    width: CATEGORY_CARD_WIDTH,
    aspectRatio: 1,
    backgroundColor: "#F8FAFF",
    margin: CATEGORY_CARD_MARGIN / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryLabel: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: "600",
    color: "#132166",
    textAlign: "center",
  },

  popularTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#132166",
    marginTop: 24,
    marginLeft: 20,
  },
  tripCard: {
    width: TRIP_CARD_WIDTH,
    height: TRIP_CARD_HEIGHT + 60,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
    overflow: "hidden",
  },
  tripImage: {
    width: "100%",
    height: TRIP_CARD_HEIGHT,
  },
  tripInfo: {
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  tripName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  tripPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0288D1",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
});
