import { View, Text, StyleSheet, FlatList } from 'react-native';
export default function ListaTarefas({ titulo, lista }) {
  const formatDateToDDMMYY = (date) => {
    const day = String(date.getDate()).padStart(2, '0'); // Garante que o dia tenha 2 dígitos
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Garante que o mês tenha 2 dígitos (os meses são indexados de 0 a 11)
    const year = String(date.getFullYear()).slice(-2); // Pega apenas os últimos 2 dígitos do ano

    return `${day}/${month}/${year}`;
  };
  return (
    <View style={styles.container}>
      <Text>
        {titulo}({lista.length})
      </Text>
      {lista.length ? (
        <FlatList
          data={lista}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.item} key={item.id}>
              <Text>{item.titulo}</Text>
              <Text>{item.descricao}</Text>
              <Text>{formatDateToDDMMYY(item.date)}</Text>
            </View>
          )}
        />
      ) : (
        <View>
          <Text>Sem Tarefas</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 'fit-content',
    padding: 5,
    borderRadius: 10,
  },
  item: {
    width: 200,
    height: 'fit-content',
    backgroundColor: '#ddd',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
