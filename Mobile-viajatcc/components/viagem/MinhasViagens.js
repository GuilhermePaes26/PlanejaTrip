import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, Button, Image } from 'react-native';

const viagens = [
  { id: '1', destino: 'Rio de Janeiro', data: '12/04/2024', imagem: require('../../assets/rio.jpg') },
  { id: '2', destino: 'São Paulo', data: '18/05/2024', imagem: require('../../assets/rio.jpg') },
  { id: '3', destino: 'Salvador', data: '22/06/2024', imagem: require('../../assets/rio.jpg') },
];

const MinhasViagens = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [viagemSelecionada, setViagemSelecionada] = useState(null);

  const abrirModal = (viagem) => {
    setViagemSelecionada(viagem);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Viagens</Text>
      <FlatList
        data={viagens}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.viagemItem} onPress={() => abrirModal(item)}>
            <Text style={styles.destino}>{item.destino}</Text>
            <Text style={styles.data}>Data: {item.data}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.butt}>
        <Text>Ver mais</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {viagemSelecionada && (
              <>
                <Text style={styles.modalTitle}>{viagemSelecionada.destino}</Text>
                <Text style={styles.modalData}>Data: {viagemSelecionada.data}</Text>
                <Image
  source={
    typeof viagemSelecionada.imagem === 'string'
      ? { uri: viagemSelecionada.imagem }
      : viagemSelecionada.imagem
  }
  style={styles.modalImage}
  resizeMode="cover"
/>

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
    backgroundColor: '#A3CDFF',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  viagemItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  destino: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  data: {
    fontSize: 16,
    color: '#555',
  },
  butt: {
    alignItems: 'center',
    marginTop: 20,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '85%',
    elevation: 5,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  modalData: {
    fontSize: 16,
    marginBottom: 12,
    color: '#333',
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
});

export default MinhasViagens;
