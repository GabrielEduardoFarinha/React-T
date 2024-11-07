import { useState, useEffect } from 'react';
import {
  Alert,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';
import { useFuncionario } from '../database/useFuncionario';
import { ModalContainer } from './ModalContainer';
export function DemitirFuncionario({ close }) {
  const [modalVisibleConfirmacaoExclusao, setModalVisibleConfirmacaoExclusao] =
    useState(false);
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState({});
  const [funcionarios, setFuncionarios] = useState([]);
  const useFuncionarios = useFuncionario();

  const handleDemissao = (funcionario) => {
    setFuncionarioSelecionado(funcionario);

    setModalVisibleConfirmacaoExclusao(true);
  };

  const confirmDelete = async () => {
    try {
      await useFuncionarios.deleteFuncionario(funcionarioSelecionado.id);
      setModalVisibleConfirmacaoExclusao(false);
      close();
    } catch (error) {
      Alert.alert(error);
    }
  };

  useEffect(() => {
    const getAll = async () => {
      try {
        const { result } = await useFuncionarios.list();
        setFuncionarios(result);
      } catch {
        Alert.alert(error);
      }
    };
    getAll();
  }, []);

  return (
    <ModalContainer
      title={' Selecionar Funcionário para Demissão'}
      closeModal={close}>
      {funcionarios.length === 0 ? (
        <Text>Nenhum funcionário cadastrado.</Text>
      ) : (
        <FlatList
          data={funcionarios}
          keyExtractor={(item) => item.nome}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleDemissao(item)}>
              <Text style={styles.funcionarioText}>{item.nome}</Text>
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
          title={'Confirmação de Demissão'}
          closeModal={() => setModalVisibleConfirmacaoExclusao(false)}
          closeButtonText={'Cancelar'}>
          <Text>
            Deseja excluir o funcionário {funcionarioSelecionado?.nome}?
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
  funcionarioText: {
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
  }
});
