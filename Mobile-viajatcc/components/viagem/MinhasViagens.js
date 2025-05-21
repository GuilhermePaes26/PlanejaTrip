/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, Button, Image, ActivityIndicator, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

const MinhasViagens = () => {
  const [viagens, setViagens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [viagemSelecionada, setViagemSelecionada] = useState(null);
  const isFocused = useIsFocused();

  const fetchViagens = async () => {
    setLoading(true);
    try {
      const jsonUser = await AsyncStorage.getItem("userData");
      if (!jsonUser) throw new Error("Usuário não encontrado");
      const user = JSON.parse(jsonUser);
      const res = await fetch(`http://10.0.2.2:3000/users/${user._id}`);
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
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Viagens</Text>

      <FlatList
        data={viagens}
        keyExtractor={(item) => item.id || item._id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.viagemItem} onPress={() => abrirModal(item)}>
            <Text style={styles.destino}>{item.nome}</Text>
            <Text style={styles.data}>Descrição: {item.descricao}</Text>
            {/* <Text style={styles.data}>Saindo de: {item.startPoint.namePoint}</Text> */}
            <Text style={styles.data}>Data: {item.data}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.butt}>
        <Text>Ver mais</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {viagemSelecionada && (
              <>
                <Text style={styles.modalTitle}>{viagemSelecionada.nome}</Text>
                <Text style={styles.modalData}>Data: {viagemSelecionada.data}</Text>
                <Image source={require("../../assets/rio.jpg")} style={styles.modalImage} resizeMode="cover" />
              </>
            )}
            <Button title="Fechar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#A3CDFF",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  viagemItem: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  destino: {
    fontSize: 18,
    fontWeight: "bold",
  },
  data: {
    fontSize: 16,
    color: "#555",
  },
  butt: {
    alignItems: "center",
    marginTop: 20,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "85%",
    elevation: 5,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  modalData: {
    fontSize: 16,
    marginBottom: 12,
    color: "#333",
  },
  modalImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
});

export default MinhasViagens;
