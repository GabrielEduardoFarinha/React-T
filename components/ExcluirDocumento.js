import { useState, useEffect } from 'react';
import {
  Alert,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';
import { useDocumento } from '../database/useDocumento'; // Hook para acessar os documentos
import { ModalContainer } from './ModalContainer'; // Componente para o modal

export function ExcluirDocumento({ close }) {
  const [modalVisibleConfirmacaoExclusao, setModalVisibleConfirmacaoExclusao] =
    useState(false); // Modal para confirmar a exclusão
  const [documentoSelecionado, setDocumentoSelecionado] = useState({}); // Documento selecionado
  const [documentos, setDocumentos] = useState([]); // Lista de documentos
  const useDocumentos = useDocumento(); // Hook para operações de documentos

  // Função para iniciar o processo de exclusão de um documento
  const handleExclusao = (documento) => {
    setDocumentoSelecionado(documento);
    setModalVisibleConfirmacaoExclusao(true); // Exibe o modal de confirmação
  };
  // Função para confirmar a exclusão do documento
  const confirmDelete = async () => {
    try {
      await useDocumentos.deleteDocumento(documentoSelecionado.id); // Deleta o documento
      setModalVisibleConfirmacaoExclusao(false); // Fecha o modal
      close(); // Fecha o modal da tela principal
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível excluir o documento.');
    }
  };

  // Função para buscar todos os documentos cadastrados
  useEffect(() => {
    const getAll = async () => {
      try {
        const { result } = await useDocumentos.list(); // Lista todos os documentos
        setDocumentos(result); // Atualiza o estado com os documentos
      } catch (error) {
        Alert.alert('Erro', error.message);
      }
    };
    getAll();
  }, []); // Carrega os documentos assim que o componente é montado

  return (
    <ModalContainer title={'Selecionar Documento para Exclusão'} closeModal={close}>
      {documentos.length === 0 ? (
        <Text>Nenhum documento cadastrado.</Text> // Caso não haja documentos cadastrados
      ) : (
        <FlatList
          data={documentos}
          keyExtractor={(item) => item.nome}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleExclusao(item)}>
              <Text style={styles.documentoText}>{item.nome}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Modal de Confirmação de Exclusão */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleConfirmacaoExclusao}
        onRequestClose={() => setModalVisibleConfirmacaoExclusao(false)}>
        <ModalContainer
          title={'Confirmação de Exclusão'}
          closeModal={() => setModalVisibleConfirmacaoExclusao(false)}
          closeButtonText={'Cancelar'}>
          <Text>
            Deseja excluir o documento "{documentoSelecionado?.nome}"?
          </Text>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={confirmDelete}>
            <Text style={styles.buttonText}>Excluir</Text>
          </TouchableOpacity>
        </ModalContainer>
      </Modal>
    </ModalContainer>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  documentoText: {
    padding: 10,
    fontSize: 16,
    color: '#333',
  },
  confirmButton: {
    backgroundColor: '#FF4D4D',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
});
