import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Alert, FlatList } from 'react-native';
import {CadastarFuncionario} from '../components/CadastrarFuncionario'
import {MostarFuncionarios} from '../components/MostarFuncionarios'
import {DemitirFuncionario} from '../components/DemitirFuncionario'
const Workers = () => {
  const [modalVisibleCadastro, setModalVisibleCadastro] = useState(false);
  const [modalVisibleMostrar, setModalVisibleMostrar] = useState(false);
  const [modalVisibleDemissao, setModalVisibleDemissao] = useState(false);
  
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.circleButton} 
        onPress={() => setModalVisibleCadastro(true)}
      >
        <Text style={styles.buttonText}>Cadastrar Funcionários</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.circleButton} 
        onPress={() => setModalVisibleMostrar(true)}
      >
        <Text style={styles.buttonText}>Mostrar Funcionários</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.circleButton, styles.demitirButton]} 
        onPress={() => setModalVisibleDemissao(true)}
      >
        <Text style={styles.buttonText}>Demissão</Text>
      </TouchableOpacity>

      {/* Modal para Cadastro de Funcionários */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleCadastro}
        onRequestClose={() => setModalVisibleCadastro(false)}
      >
        <CadastarFuncionario close={() => setModalVisibleCadastro(false)}/>
      </Modal>

      {/* Modal para Mostrar Funcionários */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleMostrar}
        onRequestClose={() => setModalVisibleMostrar(false)}
      >
        <MostarFuncionarios close={() => setModalVisibleMostrar(false)} />
      </Modal>

      {/* Modal para Demissão */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleDemissao}
        onRequestClose={() => setModalVisibleDemissao(false)}
      >
        <DemitirFuncionario close={() => setModalVisibleDemissao(false)} />
      </Modal>

     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9F9F9',
  },
  circleButton: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  demitirButton: {
    backgroundColor: '#FF4D4D',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  
  funcionarioText: {
    padding: 10,
    fontSize: 16,
    color: '#333',
  },
  closeButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  confirmButton: {
    backgroundColor: '#FF4D4D',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
});

export default Workers;