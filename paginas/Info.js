import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const App = () => {
  const [selectedObra, setSelectedObra] = useState(null);
  const [selectedEquipe, setSelectedEquipe] = useState(null);
  const [selectedPeoes, setSelectedPeoes] = useState(null);

  const obras = [
    { label: 'Obra 1', value: 'obra1' },
    { label: 'Obra 2', value: 'obra2' },
    { label: 'Obra 3', value: 'obra3' },
  ];

  const equipes = [
    { label: 'Fraklin', value: 'equipeA' },
    { label: 'Zé', value: 'equipeB' },
    { label: 'Miguel', value: 'equipeC' },
  ];

  const peoes = [
    { label: 'Peão X', value: 'peaoX' },
    { label: 'Peão Y', value: 'peaoY' },
    { label: 'Peão Z', value: 'peaoZ' },
  ];

  const handleSubmit = () => {
    Alert.alert(
      'Opções Selecionadas',
      `Obra: ${selectedObra}\nEquipe: ${selectedEquipe}\nPeões: ${selectedPeoes}`,
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Selecione suas opções</Text>

      <RNPickerSelect
        placeholder={{ label: 'Selecione uma obra...', value: null }}
        items={obras}
        onValueChange={value => setSelectedObra(value)}
        style={pickerSelectStyles}
      />
      
      <RNPickerSelect
        placeholder={{ label: 'Selecione uma equipe...', value: null }}
        items={equipes}
        onValueChange={value => setSelectedEquipe(value)}
        style={pickerSelectStyles}
      />

      <RNPickerSelect
        placeholder={{ label: 'Selecione um peão...', value: null }}
        items={peoes}
        onValueChange={value => setSelectedPeoes(value)}
        style={pickerSelectStyles}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  inputAndroid: {
    fontSize: 16,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#F9F9F9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
