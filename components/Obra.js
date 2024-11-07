import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
  SectionList,
  FlatList,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useObraFuncionario } from '../database/useObraFuncionario';
import { useObra } from '../database/useObra';
import { useFuncionario } from '../database/useFuncionario';
import { ModalContainer } from './ModalContainer';
export function Obra({ obra, reload }) {
  const { getFuncionariosPorObra, removeFuncionarioFromObra,relateFuncionarioObra } =
    useObraFuncionario();
  const { deleteObra } = useObra();
  const { list } = useFuncionario();

  const [modalDetailsObra, setModalDetailsObra] = useState(false);
  const [modalDeleteObra, setModalDeleteObra] = useState(false);
  const [modalAddFuncionario, setModalAddFuncionario] = useState(false);

  const [funcionariosPorObra, setFuncionariosPorObra] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);

  const details = async () => {
    try {
      const { result } = await getFuncionariosPorObra(obra.id);
      setFuncionariosPorObra(result);
      setModalDetailsObra(true);
    } catch (error) {
      Alert.alert(error);
    }
  };

  const formatData = () => {
    const [ano, mes, dia] = obra.data.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  const agruparPorProfissao = (data) => {
    const grouped = data.reduce((acc, item) => {
      const section = acc.find((section) => section.title === item.profissao);
      if (section) {
        section.data.push(item);
      } else {
        acc.push({ title: item.profissao, data: [item] });
      }
      return acc;
    }, []);
    return grouped;
  };

  const removeFuncionario = async (id) => {
    try {
      await removeFuncionarioFromObra(id);
      const filteredFuncionarios = funcionariosPorObra.filter(
        (func) => func.id !== id
      );
      setFuncionariosPorObra(filteredFuncionarios);
    } catch (error) {
      Alert.alert(error);
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteObra(obra.id);
      reload();
      setModalDeleteObra(false);
    } catch (error) {
      Alert.alert(error);
    }
  };

  const openAddFuncionarios = async () => {
    try {
      const {result} = await list()
      setFuncionarios(result)
      setModalAddFuncionario(true);

    } catch (error) {
      Alert.alert(error)
    }
  };

  const relateObraFuncionario = async (funcionarioId)=>{
    try {
      await relateFuncionarioObra(funcionarioId, obra.id)
      const { result } = await getFuncionariosPorObra(obra.id);
      setFuncionariosPorObra(result);
      setModalAddFuncionario(false);
    } catch (error) {
      Alert.alert(error)
    }
  }

  return (
    <View key={obra.id} style={styles.card}>
      <Text style={styles.cardName}>{obra.nome}</Text>
      <Text style={styles.cardDate}>Data: {formatData()}</Text>
      <Text style={styles.cardDescription}>{obra.descricao}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cardButton} onPress={details}>
          <Text style={styles.cardButtonText}>Detalhes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.cardButton, styles.deleteButton]}
          onPress={() => setModalDeleteObra(true)}>
          <Text style={styles.cardButtonText}>Apagar</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalDetailsObra}
        onRequestClose={() => setModalDetailsObra(false)}>
        <ModalContainer
          closeModal={() => {
            setModalDetailsObra(false);
          }}
          title={'Detalhes da Obra'}>
          <Text style={styles.cardName}>{obra.nome}</Text>
          <Text style={styles.cardDate}>Data: {formatData()}</Text>
          <Text style={styles.cardDescription}>{obra.descricao}</Text>
          <SectionList
            sections={agruparPorProfissao(funcionariosPorObra)}
            keyExtractor={(item) => item.nome}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.sectionHeader}>{title}</Text>
            )}
            renderItem={({ item }) => (
              <View style={styles.sectionItem}>
                <Text style={styles.sectionNome}>{item.nome}</Text>
                <TouchableOpacity
                  style={{
                    borderWidth: 2,
                    borderColor: '#ccc',
                    borderRadius: 5,
                    padding: 3,
                  }}
                  onPress={() => removeFuncionario(item.id)}>
                  <MaterialIcons name={'delete'} size={20} color="#FF4C4C" />
                </TouchableOpacity>
              </View>
            )}
          />

          <TouchableOpacity
            style={[
              styles.cardButton,
              { width: '100%', marginTop: 10, padding: 10, borderRadius: 5 },
            ]}
            onPress={openAddFuncionarios}>
            <Text style={styles.cardButtonText}>Adiconar Funcionario</Text>
          </TouchableOpacity>
        </ModalContainer>

        {/* Modal adicionar funcionario numa obra  */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalAddFuncionario}
          onRequestClose={() => setModalAddFuncionario(false)}>
          <ModalContainer
            closeModal={() => setModalAddFuncionario(false)}
            title={'Adicionar Funcionário'}>
            <FlatList
              data={funcionarios}
              keyExtractor={( item ) => item.id.toLocaleString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.addFuncionario} onPress={()=> relateObraFuncionario(item.id)}>
                  <Text style={styles.addFuncionarioText}>{item.nome}</Text>
                </TouchableOpacity>
              )}
            />
          </ModalContainer>
        </Modal>
      </Modal>

      {/*Modal para deletar obra */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalDeleteObra}
        onRequestClose={() => setModalDeleteObra(false)}>
        <ModalContainer
          closeModal={() => {
            setModalDeleteObra(false);
          }}
          title={'Apagar Obra'}
          closeButtonText={'Cancelar'}>
          <Text style={[styles.cardName, { textAlign: 'center' }]}>
            Deseja mesmo deletar?
          </Text>
          <TouchableOpacity
            style={[styles.confirmButton, styles.deleteButton]}
            onPress={confirmDelete}>
            <Text style={styles.cardButtonText}>Apagar</Text>
          </TouchableOpacity>
        </ModalContainer>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: 275,
    minHeight: 'fit-content',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    gap: 10,
  },
  cardName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardDate: {
    fontSize: 14,
    color: '#333',
  },
  cardDescription: {
    fontSize: 15,
    fontWeight: 'semibold',
    color: '#333',
  },
  cardButton: {
    backgroundColor: '#03a1ff',
    paddingVertical: 10,
    paddingHorizontal: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: '50%',
  },
  cardButtonText: {
    color: '#fff',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    gap: 5,
  },
  deleteButton: {
    backgroundColor: '#FF4C4C',
  },
  confirmButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#f4f4f8',
    padding: 5,
    marginTop: 20,
  },
  sectionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionNome: {
    fontSize: 16,
  },
  addFuncionario: {
    width: '100%',
    backgroundColor: "#03a1ff",
    padding: 8,
    marginBottom: 5,
    borderRadius: 5
  },
  addFuncionarioText: {
    color: '#fff',
    textAlign: 'center'
  }
});
