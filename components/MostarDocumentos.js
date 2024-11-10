import { useState, useEffect } from 'react';
import {
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  View,
} from 'react-native';
import { useDocumento } from '../database/useDocumento'; // Hook para acessar os documentos
import { useObraDocumento } from '../database/useObraDocumento'; // Hook para acessar as obras associadas aos documentos
import { ModalContainer } from './ModalContainer';

export function MostarDocumentos({ close }) {
  const [documentos, setDocumentos] = useState([]); // Lista de documentos
  const [documento, setDocumento] = useState({}); // Documento selecionado
  const [modalVisibleDocumentoInfo, setModalVisibleDocumentoInfo] =
    useState(false); // Controle de visibilidade do modal
  const useDocumentos = useDocumento(); // Funções para trabalhar com documentos
  const { getDocumentosPorObra } = useObraDocumento(); // Funções para associar documentos às obras

  const handleMostrar = async (selectedDocumento) => {
    try {
      const { result } = await getDocumentosPorObra(selectedDocumento.id);
      setDocumento({ ...selectedDocumento, obras: result });
      setModalVisibleDocumentoInfo(true);
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };


  useEffect(() => {
    const getAll = async () => {
      try {
        const { result } = await useDocumentos.list(); // Obtém a lista de documentos cadastrados
        setDocumentos(result);
      } catch (error) {
        Alert.alert('Erro', error.message);
      }
    };
    getAll();
  }, []);

  return (
    <ModalContainer title={'Documentos Cadastrados'} closeModal={close}>
      {documentos.length === 0 ? (
        <Text>Nenhum documento cadastrado.</Text>
      ) : (
        <FlatList
          data={documentos}
          keyExtractor={(item) => item.nome}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleMostrar(item)}>
              <Text style={styles.documentoText}>{item.nome}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleDocumentoInfo}
        onRequestClose={() => setModalVisibleDocumentoInfo(false)}>
        <ModalContainer
          title={'Informações do Documento'}
          closeModal={() => setModalVisibleDocumentoInfo(false)}>
          <Text style={styles.documentoLabel}>
            Nome:{' '}
            <Text style={styles.documentoLabelText}>{documento.nome}</Text>
          </Text>
          <Text style={styles.documentoLabel}>
            Código:{' '}
            <Text style={styles.documentoLabelText}>{documento.tipo}</Text>
          </Text>
          <Text style={styles.documentoLabel}>
            Descrição:{' '}
            <Text style={styles.documentoLabelText}>{documento.descricao}</Text>
          </Text>
          <Text style={styles.documentoLabel}>Obras:</Text>
          {documento.obras?.length > 0 ? (
            <FlatList
              data={documento.obras}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.obraItem}>
                  <Text style={styles.obraText}>{item.nome}</Text>
                </View>
              )}
            />
          ) : (
            <Text>
              Este documento não está associado a nenhuma obra no momento.
            </Text>
          )}
        </ModalContainer>
      </Modal>
    </ModalContainer>
  );
}

const styles = StyleSheet.create({
  documentoText: {
    padding: 10,
    fontSize: 16,
    color: '#333',
  },
  documentoLabel: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  documentoLabelText: {
    fontSize: 20,
    fontWeight: 'normal',
  },
  obraItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 5,
    backgroundColor: '#ccc',
    borderRadius: 10,
  },
  obraText: {
    fontSize: 18,
  },
});
