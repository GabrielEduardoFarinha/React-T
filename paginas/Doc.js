import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { CadastrarDocumento } from '../components/CadastrarDocumento';  
import { MostarDocumentos } from '../components/MostarDocumentos';    
import { ExcluirDocumento } from '../components/ExcluirDocumento';  

const Doc = ({ navigation }) => {
  const [modalVisibleCadastro, setModalVisibleCadastro] = useState(false);
  const [modalVisibleMostrar, setModalVisibleMostrar] = useState(false);
  const [modalVisibleExcluir, setModalVisibleExcluir] = useState(false);

  return (
    <View style={styles.container}>
      
      <TouchableOpacity 
        style={styles.circleButton} 
        onPress={() => setModalVisibleCadastro(true)}
      >
        <Text style={styles.buttonText}>Cadastrar Documentos</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.circleButton} 
        onPress={() => setModalVisibleMostrar(true)}
      >
        <Text style={styles.buttonText}>Mostrar Documentos</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.circleButton, styles.excluirButton]} 
        onPress={() => setModalVisibleExcluir(true)}
      >
        <Text style={styles.buttonText}>Excluir Documento</Text>
      </TouchableOpacity>

      {/* Modal para Cadastro de Documentos */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleCadastro}
        onRequestClose={() => setModalVisibleCadastro(false)}
      >
        <CadastrarDocumento close={() => setModalVisibleCadastro(false)} />
      </Modal>

      {/* Modal para Mostrar Documentos */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleMostrar}
        onRequestClose={() => setModalVisibleMostrar(false)}
      >
        <MostarDocumentos close={() => setModalVisibleMostrar(false)} />
      </Modal>

      {/* Modal para Excluir Documento */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleExcluir}
        onRequestClose={() => setModalVisibleExcluir(false)}
      >
        <ExcluirDocumento close={() => setModalVisibleExcluir(false)} />
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
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 50,
  },
  backButtonText: {
    fontSize: 20,
    color: '#fff',
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
  excluirButton: {
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
  documentoText: {
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

export default Doc;
