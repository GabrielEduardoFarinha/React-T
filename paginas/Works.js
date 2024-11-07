import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { useObra } from '../database/useObra';
import { useObraFuncionario } from '../database/useObraFuncionario';
import { Obra } from '../components/Obra';
export default function Tarefas() {
  const [obras, setObras] = useState([]);
  const { list } = useObra();
  const { getAll } = useObraFuncionario();
  const getObras = async () => {
      const { result } = await list();
      setObras(result);
      await getAll();
    };
  useEffect(() => {
    getObras();
  },[]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Obras Cadastradas</Text>
      <View style={styles.containerTarefas}>
        <FlatList
          data={obras}
          showsHorizontalScrollIndicator={false}
          style={{ alignItems: 'center' }}
          renderItem={({ item }) => <Obra obra={item} reload={getObras}/>}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  containerTarefas: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
});
