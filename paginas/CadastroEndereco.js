import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  Alert,
  TextInput,
  SafeAreaView,
  View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useEndereco } from '../hooks/useEnderecos';
import axios from 'axios';

// Função para buscar coordenadas via Nominatim
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

  const handleAddEndereco = async () => {
    if (!dataString || !address) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const fullAddress = `${address.logradouro}, ${address.localidade}, ${address.uf}`;
    
    // Busca as coordenadas do endereço
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
      latitude: coordinates.latitude,   // Inclui latitude
      longitude: coordinates.longitude, // Inclui longitude
    };

    saveEnderecos(newEndereco);
    Alert.alert('Sucesso', 'Endereço cadastrado com sucesso!');

    // Limpa os campos após o cadastro
    setCep('');
    setData(new Date());
    setDataString('');
    setAddress(null);
  };

  const showDatepicker = () => {
    setShowPicker(true);
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || data;
    setShowPicker(false);
    setData(currentDate);
    setDataString(currentDate.toISOString().split('T')[0]); // Formato YYYY-MM-DD
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
      <Button
        title={dataString ? `Data: ${dataString}` : 'Selecionar Data'}
        onPress={showDatepicker}
      />
      {showPicker && (
        <DateTimePicker
          value={data}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChangeDate}
        />
      )}
      <Text>Data selecionada: {dataString}</Text>
      <TextInput
        placeholder="Digite o CEP"
        value={cep}
        onChangeText={setCep}
        keyboardType="numeric"
      />
      <Button title="Buscar Endereço" onPress={fetchAddress} />
      {address && (
        <View>
          <Text>Rua: {address.logradouro}</Text>
          <Text>Cidade: {address.localidade}</Text>
          <Text>Estado: {address.uf}</Text>
        </View>
      )}
      <Button title="Cadastrar Endereço" onPress={handleAddEndereco} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  
});

export default CadastroEndereco;
