import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, ImageBackground, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons, FontAwesome5, Entypo } from "@expo/vector-icons";

const SCREEN_WIDTH = Dimensions.get("window").width;

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
      const res = await fetch(`https://planejatrip.onrender.com/users/${user._id}`, {
        method: "PUT",
        body: formData,
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const updated = await res.json();

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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0288D1" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require("../../assets/header-cadastro.webp")} style={styles.headerBackground} resizeMode="cover">
        <View style={styles.headerOverlay}>
          <Text style={styles.headerTitle}>Meu Perfil</Text>
        </View>
      </ImageBackground>

      <View style={styles.avatarContainer}>
        <Image source={user.imgLink ? { uri: user.imgLink } : require("../../assets/default-avatar.jpg")} style={styles.avatar} />
        <TouchableOpacity style={styles.cameraButton} onPress={pickImageAndUpload} disabled={uploading}>
          {uploading ? <ActivityIndicator color="#FFF" /> : <Entypo name="camera" size={20} color="#FFF" />}
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoCard}>
          <FontAwesome5 name="user-alt" size={20} color="#0288D1" />
          <Text style={styles.infoText}>{user.nome}</Text>
        </View>

        <View style={styles.infoCard}>
          <MaterialIcons name="email" size={20} color="#0288D1" />
          <Text style={styles.infoText}>{user.email}</Text>
        </View>

        <View style={styles.infoCard}>
          <FontAwesome5 name="id-card" size={20} color="#0288D1" />
          <Text style={styles.infoText}>{user.cpf}</Text>
        </View>

        <View style={styles.infoCard}>
          <MaterialIcons name="today" size={20} color="#0288D1" />
          <Text style={styles.infoText}>{`${user.idade} anos`}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const AVATAR_SIZE = 120;
const CAMERA_BUTTON_SIZE = 36;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5F1FF",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E5F1FF",
  },
  headerBackground: {
    width: SCREEN_WIDTH,
    height: 180,
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
  },
  avatarContainer: {
    position: "absolute",
    top: 130,
    alignItems: "center",
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: 4,
    borderColor: "#FFF",
    backgroundColor: "#CCC",
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: CAMERA_BUTTON_SIZE,
    height: CAMERA_BUTTON_SIZE,
    borderRadius: CAMERA_BUTTON_SIZE / 2,
    backgroundColor: "#0288D1",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFF",
  },
  infoContainer: {
    marginTop: AVATAR_SIZE / 2 + 20,
    width: SCREEN_WIDTH - 32,
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  infoText: {
    marginLeft: 12,
    fontSize: 16,
    color: "#333",
    flexShrink: 1,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: "#378b9e",
    borderRadius: 6,
    paddingVertical: 14,
    width: SCREEN_WIDTH - 64,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
