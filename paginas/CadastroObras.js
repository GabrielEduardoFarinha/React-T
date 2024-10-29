import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  Alert,
  TextInput,
  SafeAreaView,
  View,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useEndereco } from '../hooks/useEnderecos';
import axios from 'axios';

const fetchCoordinates = async (address) => {
  const encodedAddress = encodeURIComponent(address);
  const response = await axios.get(
    `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&addressdetails=1`
  );

  if (response.data.length > 0) {
    const location = response.data[0];
    return {
      latitude: parseFloat(location.lat),
      longitude: parseFloat(location.lon),
    };
  } else {
    console.error('Endereço não encontrado');
    return null;
  }
};

const CadastroEndereco = () => {
  const [data, setData] = useState(new Date());
  const [dataString, setDataString] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const { saveEnderecos } = useEndereco();
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState(null);
  const [numero, setNumero] = useState(''); // Campo para número do prédio/casa
  const [apartamento, setApartamento] = useState(''); // Campo para apartamento
  const [nomeObra, setNomeObra] = useState(''); // Campo para nome da obra

  const handleAddEndereco = async () => {
    if (!dataString || !address || !numero || !nomeObra) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const fullAddress = `${address.logradouro}, ${address.localidade}, ${address.uf}`;
    const coordinates = await fetchCoordinates(fullAddress);

    if (!coordinates) {
      Alert.alert('Erro', 'Não foi possível encontrar as coordenadas do endereço.');
      return;
    }

    const newEndereco = {
      data: dataString,
      logradouro: address.logradouro,
      localidade: address.localidade,
      uf: address.uf,
      numero, // Inclui número do prédio/casa
      apartamento, // Inclui apartamento
      nomeObra, // Inclui nome da obra
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    };

    saveEnderecos(newEndereco);
    Alert.alert('Sucesso', 'Endereço cadastrado com sucesso!');

    // Limpa os campos após o cadastro
    setCep('');
    setData(new Date());
    setDataString('');
    setAddress(null);
    setNumero('');
    setApartamento('');
    setNomeObra(''); // Limpa o campo de nome da obra
  };

  const showDatepicker = () => {
    setShowPicker(true);
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || data;
    setShowPicker(false);
    setData(currentDate);
    setDataString(currentDate.toISOString().split('T')[0]);
  };

  const fetchAddress = async () => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (!response.data.erro) {
        setAddress(response.data);
      } else {
        alert('CEP inválido');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Cadastro de Endereço</Text>
      
      <TextInput
        placeholder="Nome da Obra"
        value={nomeObra}
        onChangeText={setNomeObra}
        style={styles.input}
      />

      <TouchableOpacity style={styles.dateButton} onPress={showDatepicker}>
        <Text style={styles.dateButtonText}>
          {dataString ? `Data: ${dataString}` : 'Selecionar Data'}
        </Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={data}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChangeDate}
        />
      )}
      <Text style={styles.dateText}>Data selecionada: {dataString}</Text>
      <TextInput
        placeholder="Digite o CEP"
        value={cep}
        onChangeText={setCep}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Buscar Endereço" onPress={fetchAddress} color="#007BFF" />
      {address && (
        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>Rua: {address.logradouro}</Text>
          <Text style={styles.addressText}>Cidade: {address.localidade}</Text>
          <Text style={styles.addressText}>Estado: {address.uf}</Text>
        </View>
      )}
      <TextInput
        placeholder="Número do Prédio/Casa"
        value={numero}
        onChangeText={setNumero}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Apartamento (opcional)"
        value={apartamento}
        onChangeText={setApartamento}
        style={styles.input}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleAddEndereco}>
        <Text style={styles.submitButtonText}>Cadastrar Endereço</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  dateButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  dateButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  dateText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  addressContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#e9ecef',
    borderRadius: 8,
  },
  addressText: {
    fontSize: 16,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CadastroEndereco;
