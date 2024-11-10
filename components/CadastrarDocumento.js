import { useState, useEffect } from 'react';
import {
  TextInput,
  TouchableOpacity,
  Text,
  Modal,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import { useObra } from '../database/useObra'; // Supondo que você tenha uma tabela de Obras no banco
import { useDocumento } from '../database/useDocumento'; // Presumindo que você tenha esse hook para trabalhar com documentos
import { ModalContainer } from './ModalContainer';

export function CadastrarDocumento({ close }) {
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [selectedObra, setSelectedObra] = useState(0);
  const [modalVisibleObra, setModalVisibleObra] = useState(false);

  const useObras = useObra();
  const useDocumentos = useDocumento();
  const [obras, setObras] = useState([]);

  const handleCadastro = async () => {
    if (nome && tipo && descricao && selectedObra) {
      await useDocumentos.createDocumento(
        { nome, tipo, descricao }, // Dados do documento
        selectedObra // Obra associada ao documento
      );
      Alert.alert('Documento Criado');
      close(); // Fecha o modal após o cadastro
    } else {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    }
  };

  useEffect(() => {
    const getAllObras = async () => {
      try {
        const { result } = await useObras.list();
        const transformedData = result.map((item) => ({
          label: item.nome,
          value: item.id,
        }));
        setObras(transformedData);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar as obras.');
      }
    };

    getAllObras();
  }, []);

  return (
    <ModalContainer title={'Cadastro de Documentos'} closeModal={close}>
      <TextInput
        placeholder="Nome do Documento"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
        placeholderTextColor="#000"
      />
      <TextInput
        placeholder="Codigo do Documento"
        value={tipo}
        onChangeText={setTipo}
        style={styles.input}
        placeholderTextColor="#000"
      />
      <TextInput
        placeholder="Descrição/apresentação"
        value={descricao}
        onChangeText={setDescricao}
        style={styles.input}
        placeholderTextColor="#000"
      />
      <TouchableOpacity
        style={styles.input}
        onPress={() => setModalVisibleObra(true)}>
        <Text style={styles.inputText}>
          {selectedObra
            ? `Obra Selecionada: ${selectedObra}`
            : 'Selecione uma Obra'}
        </Text>
      </TouchableOpacity>

      {/* Modal para selecionar a obra */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleObra}
        onRequestClose={() => setModalVisibleObra(false)}>
        <ModalContainer
          title={'Selecione uma Obra'}
          closeModal={() => setModalVisibleObra(false)}>
          <FlatList
            data={obras}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setSelectedObra(item.value);
                  setModalVisibleObra(false);
                }}>
                <Text style={styles.obraText}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </ModalContainer>
      </Modal>

      <TouchableOpacity style={styles.greenButton} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar Documento</Text>
      </TouchableOpacity>
    </ModalContainer>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: '#000',
  },
  inputText: {
    fontSize: 16,
    color: '#000',
  },
  obraText: {
    padding: 10,
    fontSize: 16,
    color: '#007BFF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  greenButton: {
    backgroundColor: '#28a745', // Cor verde
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
});
