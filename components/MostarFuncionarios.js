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
import { useFuncionario } from '../database/useFuncionario';
import { useObraFuncionario } from '../database/useObraFuncionario';
import { ModalContainer } from './ModalContainer';

export function MostarFuncionarios({ close }) {
  const [funcionarios, setFuncionarios] = useState([]);
  const [funcionario, setFuncionario] = useState({});
  const [modalVisibleFuncionarioInfo, setModalVisibleFuncionarioInfo] =
    useState(false);
  const useFuncionarios = useFuncionario();
  const useObraFuncionarios = useObraFuncionario();

  const handleMostrar = async (selectedFuncionario) => {
    try {
      const { result } = await useObraFuncionarios.getObrasPorFuncionario(
        selectedFuncionario.id
      );
      setFuncionario({ ...selectedFuncionario, obras: result });
      setModalVisibleFuncionarioInfo(true);
    } catch (error) {
      Alert.alert('Erro', error);
    }
  };

  useEffect(() => {
    const getAll = async () => {
      try {
        const { result } = await useFuncionarios.list();
        setFuncionarios(result);
      } catch (error) {
        Alert.alert('Erro', error.message);
      }
    };
    getAll();
  }, []);

  return (
    <ModalContainer title={'Funcionários Cadastrados'} closeModal={close}>
      {funcionarios.length === 0 ? (
        <Text>Nenhum funcionário cadastrado.</Text>
      ) : (
        <FlatList
          data={funcionarios}
          keyExtractor={(item) => item.nome}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleMostrar(item)}>
              <Text style={styles.funcionarioText}>{item.nome}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleFuncionarioInfo}
        onRequestClose={() => setModalVisibleFuncionarioInfo(false)}>
        <ModalContainer
          title={'Informações do Funcionário'}
          closeModal={() => setModalVisibleFuncionarioInfo(false)}>
          <Text style={styles.funcionarioLabel}>
            Nome:{' '}
            <Text style={styles.funcionarioLabelText}>{funcionario.nome}</Text>
          </Text>
          <Text style={styles.funcionarioLabel}>
            Salario:{' '}
            <Text style={styles.funcionarioLabelText}>
              {funcionario.salario ? `${funcionario.salario.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}` : ''}
            </Text>
          </Text>
          <Text style={styles.funcionarioLabel}>
            Profissão:{' '}
            <Text style={styles.funcionarioLabelText}>
              {funcionario.profissao}
            </Text>
          </Text>
          <Text style={styles.funcionarioLabel}>Obras:</Text>
          {funcionario.obras?.length > 0 ? <FlatList
            data={funcionario.obras}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <View style={styles.obraItem}>
                <Text style={styles.obraText}>{item.nome}</Text>
              </View>
            )}
          /> : <Text>Este funcionário não está em nehuma obra no momento</Text>}
        </ModalContainer>
      </Modal>
    </ModalContainer>
  );
}

const styles = StyleSheet.create({
  funcionarioText: {
    padding: 10,
    fontSize: 16,
    color: '#333',
  },
  funcionarioLabel: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  funcionarioLabelText: {
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
