// screens/MinhasViagens.js

import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, Image, ActivityIndicator, Alert, Dimensions, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const SCREEN_WIDTH = Dimensions.get("window").width;

const MinhasViagens = () => {
  const [viagens, setViagens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [viagemSelecionada, setViagemSelecionada] = useState(null);
  const isFocused = useIsFocused();

  const formatDateBR = (isoString) => {
    if (!isoString) return "";
    const [datePart] = isoString.split("T");
    const [year, month, day] = datePart.split("-");
    return `${day}/${month}/${year}`;
  };

  const fetchViagens = async () => {
    setLoading(true);
    try {
      const jsonUser = await AsyncStorage.getItem("userData");
      if (!jsonUser) throw new Error("Usuário não encontrado");
      const user = JSON.parse(jsonUser);
      const res = await fetch(`https://planejatrip.onrender.com/users/${user._id}`);
      if (!res.ok) throw new Error("Falha ao buscar viagens");
      const fullUser = await res.json();
      setViagens(fullUser.viagens || []);
    } catch (err) {
      Alert.alert("Erro", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchViagens();
    }
  }, [isFocused]);

  const abrirModal = (viagem) => {
    setViagemSelecionada(viagem);
    setModalVisible(true);
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0288D1" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Viagens</Text>
      <FlatList
        data={viagens}
        keyExtractor={(item) => item._id || item.id}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.viagemCard} onPress={() => abrirModal(item)}>
            <Image source={item.imgLink ? { uri: item.imgLink } : require("../../assets/IlhaComprida.jpg")} style={styles.viagemImage} resizeMode="cover" />
            <View style={styles.viagemInfo}>
              <Text style={styles.viagemName} numberOfLines={1}>
                {item.nome}
              </Text>
              <View style={styles.viagemDetailRow}>
                <Ionicons name="location-sharp" size={16} color="#0288D1" />
                <Text style={styles.viagemDetailText}>{item.nome || "Local não informado"}</Text>
              </View>
              <View style={styles.viagemDetailRow}>
                <MaterialIcons name="today" size={16} color="#0288D1" />
                <Text style={styles.viagemDetailText}>{formatDateBR(item.data)}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma viagem encontrada.</Text>}
      />
      {viagens.length > 0 && (
        <TouchableOpacity style={styles.loadMoreButton}>
          <Text style={styles.loadMoreText}>Carregar mais</Text>
        </TouchableOpacity>
      )}
      <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {viagemSelecionada && (
              <>
                <Image source={viagemSelecionada.imgLink ? { uri: viagemSelecionada.imgLink } : require("../../assets/IlhaComprida.jpg")} style={styles.modalImage} resizeMode="cover" />
                <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
                  <Ionicons name="close" size={24} color="#333" />
                </TouchableOpacity>
                <ScrollView contentContainerStyle={styles.modalContent}>
                  <Text style={styles.modalTitle}>{viagemSelecionada.nome}</Text>
                  <View style={styles.modalDetailRow}>
                    <Ionicons name="location-sharp" size={18} color="#0288D1" />
                    <Text style={styles.modalDetailText}>{viagemSelecionada.nome || "Local não informado"}</Text>
                  </View>
                  <View style={styles.modalDetailRow}>
                    <MaterialIcons name="today" size={18} color="#0288D1" />
                    <Text style={styles.modalDetailText}>{formatDateBR(viagemSelecionada.data)}</Text>
                  </View>
                  <Text style={styles.modalSectionTitle}>Descrição</Text>
                  <Text style={styles.modalDescription}>{viagemSelecionada.descricao || "Não há descrição disponível para este destino."}</Text>
                  <View style={{ height: 20 }} />
                  <TouchableOpacity style={styles.modalCloseFooter} onPress={() => setModalVisible(false)}>
                    <Text style={styles.modalCloseFooterText}>Fechar</Text>
                  </TouchableOpacity>
                </ScrollView>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const CARD_WIDTH = SCREEN_WIDTH - 40;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5F1FF",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#132166",
    textAlign: "center",
    marginBottom: 16,
  },
  viagemCard: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  viagemImage: {
    width: 100,
    height: 100,
  },
  viagemInfo: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
  },
  viagemName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#132166",
    marginBottom: 4,
  },
  viagemDetailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  viagemDetailText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#666",
  },
  emptyText: {
    textAlign: "center",
    color: "#666",
    marginTop: 40,
    fontSize: 16,
  },
  loadMoreButton: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    backgroundColor: "#0288D1",
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  loadMoreText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },

  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: CARD_WIDTH,
    backgroundColor: "#FFF",
    borderRadius: 12,
    overflow: "hidden",
  },
  modalImage: {
    width: "100%",
    height: 180,
  },
  modalCloseButton: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(255,255,255,0.8)",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#132166",
    marginBottom: 8,
    textAlign: "center",
  },
  modalDetailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    justifyContent: "center",
  },
  modalDetailText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#666",
  },
  modalSectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#132166",
    marginTop: 16,
    marginBottom: 6,
  },
  modalDescription: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
  modalCloseFooter: {
    marginTop: 10,
    backgroundColor: "#0288D1",
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: "center",
  },
  modalCloseFooterText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default MinhasViagens;
