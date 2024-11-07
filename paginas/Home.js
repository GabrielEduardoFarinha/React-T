import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const data = [
  { id: '1', icon: 'build', title: 'Obras', route: 'Works' },
  { id: '2', icon: 'people', title: 'Funcionários', route: 'Workers' },
  { id: '3', icon: 'map', title: 'Mapa', route: 'Map' },
  { id: '4', icon: 'event', title: 'Calendário', route: 'Calendar' },
  {
    id: '5',
    icon: 'description',
    title: 'Documentação',
    route: 'Documentation',
  },
  { id: '6', icon: 'timer', title: 'Cronômetro', isNew: true, route: 'Clock' },
  { id: '7', icon: 'add', title: 'Cadastro de Obras', route: 'CadastroObras' },
];

const Home = () => {
  const navigation = useNavigation();

  const handlePress = (route) => {
    navigation.navigate(route);
  };

  const handleLogout = () => {
    Alert.alert(
      'Deseja realmente deslogar?',
      '',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Logout', onPress: () => console.log('Deslogado!') }, // Aqui você pode adicionar a navegação para a tela de Login
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handlePress(item.route)}>
      <MaterialIcons name={item.icon} size={64} color="#333" />
      <Text style={styles.cardText}>{item.title}</Text>
      {item.isNew && (
        <View style={styles.newBadge}>
          <Text style={styles.newBadgeText}>Novo!</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
      />
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F9F9F9',
    justifyContent: 'flex-start',
  },
  grid: {
    justifyContent: 'center',
    paddingBottom: 20,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
    height: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardText: {
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
  },
  newBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'red',
    borderRadius: 12,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  newBadgeText: {
    color: '#fff',
    fontSize: 10,
  },
  logoutButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 16,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Home;
