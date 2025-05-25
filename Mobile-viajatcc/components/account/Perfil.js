import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("userData")
      .then((raw) => raw && setUser(JSON.parse(raw)))
      .catch((err) => console.error("Erro ao ler userData:", err));
  }, []);

  const logout = async () => {
    await AsyncStorage.multiRemove(["isLoggedIn", "userData"]);
    navigation.replace("Auth");
  };

  const pickImageAndUpload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão necessária", "Precisamos acessar suas fotos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (result.canceled) return;

    const localUri = result.assets[0].uri;
    const filename = localUri.split("/").pop();
    const match = /\.(\w+)$/.exec(filename || "");
    const type = match ? `image/${match[1]}` : "image";

    const formData = new FormData();
    formData.append("image", {
      uri: localUri,
      name: filename,
      type,
    });

    try {
      setUploading(true);
      const res = await fetch(`http://localhost:3000/users/${user._id}`, {
        method: "PUT",
        body: formData,
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const updated = await res.json();

      // 5) atualiza estado e AsyncStorage
      setUser(updated);
      await AsyncStorage.setItem("userData", JSON.stringify(updated));
      Alert.alert("Sucesso", "Foto de perfil atualizada!");
    } catch (err) {
      console.error(err);
      Alert.alert("Erro", "Não foi possível atualizar a foto.");
    } finally {
      setUploading(false);
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#132166" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={user.imgLink ? { uri: user.imgLink } : require("../../assets/default-avatar.jpg")} style={styles.avatar} />

      <TouchableOpacity style={styles.changeButton} onPress={pickImageAndUpload} disabled={uploading}>
        {uploading ? <ActivityIndicator color="#fff" /> : <Text style={styles.changeButtonText}>{user.imgLink ? "Alterar Foto" : "Adicionar Foto"}</Text>}
      </TouchableOpacity>

      <Text style={styles.name}>{user.nome}</Text>
      <Text style={styles.info}>CPF: {user.cpf}</Text>
      <Text style={styles.info}>Email: {user.email}</Text>
      <Text style={styles.info}>Idade: {user.idade}</Text>

      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", paddingTop: 60, backgroundColor: "#fff" },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 20 },
  changeButton: {
    backgroundColor: "#4a289e",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 20,
  },
  changeButtonText: { color: "#fff", fontWeight: "bold" },
  name: { fontSize: 24, fontWeight: "bold", color: "#333", marginBottom: 8 },
  info: { fontSize: 16, color: "#666", marginBottom: 4 },
  button: { backgroundColor: "lightblue", padding: 10, borderRadius: 5, width: "50%", marginTop: 30 },
  buttonText: { textAlign: "center", fontWeight: "bold", fontSize: 18 },
});
