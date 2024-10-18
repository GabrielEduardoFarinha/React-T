import { useCallback } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Button,
  List,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
      <View style={styles.containerTarefas}>
        <FlatList
          data={enderecos}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View key={item.id}>
              <Text>{item.data}</Text>
              <Text>{item.logradouro}</Text>
              <Button
                title={'Apagar'}
                onPress={() => deleteEndereco(item.id)}
              />
            </View>
          )}
        />
      </View>
      <TouchableOpacity style={styles.addTarefa} onPress={() => {}}>
        <MaterialIcons
          name="add"
          size={60}
          color="#333"
          onPress={() => navigation.navigate('CadastroEndereco')}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.homeBtn}
        onPress={() => navigation.navigate('Home')}>
        <MaterialIcons name="home" size={60} color="#333" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
    position: 'relative',
    gap: 20,
  },
  containerTarefas: {
    flex: 1,
    width: '100%',
    gap: 30,
  },
  addTarefa: {
    position: 'absolute',
    bottom: 50,
    right: 50,
    backgroundColor: '#fff',
    borderRadius: 40,
    width: 80,
    height: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeBtn: {
    position: 'absolute',
    bottom: 50,
    left: 50,
    backgroundColor: '#fff',
    borderRadius: 40,
    width: 80,
    height: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
