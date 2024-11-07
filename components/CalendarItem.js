import { View, Text, StyleSheet } from 'react-native';
export function CalendarItem({ item }) {
  console.log(item)
  return (
    <View style={styles.item}>
      <Text style={styles.itemTitle}>{item.nome}</Text>
      <Text style={styles.itemText}>Rua: {item.rua}</Text>
      <Text style={styles.itemText}>Número: {item.numero}</Text>
      {item.complemento && (
        <Text style={styles.itemText}>Complemento: {item.complemento}</Text>
      )}
      <Text style={styles.itemText}>Bairro: {item.bairro}</Text>
      <Text style={styles.itemText}>Cidade: {item.cidade}</Text>
      <Text style={styles.itemText}>{item.descricao}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 15,
    marginVertical: 4,
    backgroundColor: '#f9f9f9', // Cor de fundo leve
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000', // Sombras sutis para destacar o card
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Cor escura para o título
    marginBottom: 5,
  },
  itemText: {
    fontSize: 16,
    color: '#555', // Cor suave para detalhes
    marginBottom: 2,
  }
});
