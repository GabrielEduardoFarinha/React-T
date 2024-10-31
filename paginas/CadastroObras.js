import { useState } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  Alert,
  SafeAreaView,
  View,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Input } from '../components/Input';
import { useObra } from '../database/useObra';
import { fetchCoordinates } from '../utils/fetchCoord';
import axios from 'axios';

const CadastroObras = () => {
  const [data, setData] = useState(new Date());
  const [dataString, setDataString] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [cep, setCep] = useState('');
  const [fullAdress, setFullAdress] = useState({});
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const { createObra } = useObra();

  const showDatepicker = () => {
    setShowPicker(true);
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || data;
    setShowPicker(false);
    setData(currentDate);
    setDataString(currentDate.toISOString().split('T')[0]); // Formato YYYY-MM-DD
  };

  const handleCep = async () => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const adress = response.data;
      const { lat, lon } = await fetchCoordinates(adress);
      console.log(lat, lon);
      const latitude = 0;
      const longitude = 0;
      setFullAdress({ ...adress, latitude, longitude });
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleDisableBtn = () => {
    return !(cep && dataString && fullAdress && numero && nome && descricao);
  };

  const handleAddEndereco = async () => {
    const obra = {
      nome,
      descricao,
      data: dataString,
      cep,
      numero,
      complemento,
      cidade: fullAdress.localidade,
      rua: fullAdress.logradouro,
      bairro: fullAdress.bairro,
      latitude: fullAdress.latitude,
      longitude: fullAdress.longitude,
    };
    console.log(obra);
    try {
      const { insertedRow } = await createObra(obra);
      Alert.alert('Sucesso', `Obra criada`);
    } catch (error) {
      Alert.alert(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Cadastro de Endereço</Text>
      <View>
        <Input
          placeholder={'Nome da obra'}
          value={nome}
          onChangeText={setNome}
          placeholderTextColor="#000" // Placeholder preto
        />
        <Input
          placeholder={'Descrição da Obra'}
          value={descricao}
          onChangeText={setDescricao}
          placeholderTextColor="#000" // Placeholder preto
        />
      </View>
      <View>
        <Text style={styles.dateText}>Data selecionada: {dataString}</Text>
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
            display="spinner"
            onChange={onChangeDate}
            style={styles.dateTimePicker} // Estilo para centralizar
          />
        )}
      </View>
      <View style={styles.cepContainer}>
        <Input
          placeholder="Digite o CEP"
          value={cep}
          onChangeText={setCep}
          keyboardType="numeric"
          placeholderTextColor="#000" // Placeholder preto
        />
        
        {/* Botão movido para cima */}
        <Button title="Buscar Endereço" onPress={handleCep} />

        <View style={{ display: 'flex', gap: 5 }}>
          <Input
            placeholder="Rua"
            value={fullAdress.logradouro}
            onChangeText={(text) => {
              const prev = { ...fullAdress };
              prev.logradouro = text;
              setFullAdress(prev);
            }}
            placeholderTextColor="#000" // Placeholder preto
          />
          <Input
            placeholder="Bairro"
            value={fullAdress.bairro}
            onChangeText={(text) => {
              const prev = { ...fullAdress };
              prev.bairro = text;
              setFullAdress(prev);
            }}
            placeholderTextColor="#000" // Placeholder preto
          />
          <Input
            placeholder="Número"
            value={numero}
            onChangeText={setNumero}
            keyboardType="numeric"
            placeholderTextColor="#000" // Placeholder preto
          />
          <Input
            placeholder="Complemento"
            value={complemento}
            onChangeText={setComplemento}
            placeholderTextColor="#000" // Placeholder preto
          />
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.submitButton,
          handleDisableBtn() && styles.submitButtonDisabled,
        ]}
        onPress={handleAddEndereco}
        disabled={handleDisableBtn()}>
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
  cepContainer: {
    flex: 1,
    gap: 15,
  },
  dateButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    alignSelf: 'center', // Centralizando o botão
  },
  dateButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  dateText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'flex-end',
    width: '100%',
  },
  submitButtonDisabled: {
    backgroundColor: '#1e7e34',
  },
  dateTimePicker: {
    backgroundColor: '#000', // Fundo do DateTimePicker para preto
    color: '#fff', // Texto em branco
  },
});

export default CadastroObras;
