import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const data = [
  { id: '1', icon: 'build', title: 'Obras' },
  { id: '2', icon: 'people', title: 'Funcionários' },
  { id: '3', icon: 'map', title: 'Mapa' },
  { id: '4', icon: 'description', title: 'Documentação' },
  { id: '5', icon: 'timer', title: 'Cronômetro', isNew: true },
  { id: '6', icon: 'add-box', title: 'Cadastro de Obras' },
];

const Home = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert(
      'Confirmar Logout',
      'Você tem certeza que deseja deslogar?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Deslogar', onPress: () => navigation.navigate('Login') },
      ],
      { cancelable: true }
    );
  };

  const handlePress = (title) => {
    switch (title) {
      case 'Obras':
        // Navegação para a página de Obras
        break;
      case 'Funcionários':
        navigation.navigate('Workers'); // Ajuste o nome da rota se necessário
        break;
      case 'Mapa':
        navigation.navigate('Map');
        break;
      case 'Documentação':
        navigation.navigate('Documentation');
        break;
      case 'Cronômetro':
        navigation.navigate('Clock');
        break;
      case 'Cadastro de Obras':
        // Navegação para a página de Cadastro de Obras
        break;
      default:
        break;
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => handlePress(item.title)}
    >
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
      <Text style={styles.header}>Bem-vindo usuário</Text>
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
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    padding: 40,
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
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 32,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Home;
