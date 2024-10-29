import { useCallback } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Button,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useEndereco } from '../hooks/useEnderecos';

export default function Tarefas() {
  const navigation = useNavigation();
  const { enderecos, loadEnderecos, deleteEndereco } = useEndereco();

  useFocusEffect(
    useCallback(() => {
      loadEnderecos();
    }, [loadEnderecos])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Obras Cadastradas</Text>
      <View style={styles.containerTarefas}>
        <FlatList
          data={enderecos}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View key={item.id} style={styles.card}>
              <Text style={styles.cardName}>{item.nomePersonalizado}</Text>
              <Text style={styles.cardDate}>{item.data}</Text>
              <Button
                title="Apagar"
                onPress={() => deleteEndereco(item.id)}
                color="#e74c3c"
              />
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
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
  },
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
    width: 200, 
    height: 100, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  cardDate: {
    fontSize: 14,
    color: '#888',
  },
});
