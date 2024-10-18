import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import AssetExample from '../components/AssetExample';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [currentDateTime, setCurrentDateTime] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const dateTimeString = now.toLocaleDateString('pt-BR', options);
      setCurrentDateTime(dateTimeString);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 43200000);

    return () => clearInterval(interval);
  }, []);

  const handleLogin = () => {
    if (matricula === '123' && senha === '123') {
      navigation.navigate('Home');
    } else {
      Alert.alert('Erro', 'Matrícula ou senha incorreta');
    }
  };

  return (
    <View style={styles.container}>
      <AssetExample />
      <Text style={styles.title}>Aplicativo em branco para testes</Text>
      <Text style={styles.subtitle}>{currentDateTime}</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>login:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu login"
          value={matricula}
          onChangeText={setMatricula}
        />
        <TouchableOpacity style={styles.linkButton} onPress={() => console.log("Esqueci a matrícula")}>
          <Text style={styles.linkText}>Não sei ou esqueci meu login</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Senha:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          secureTextEntry={true}
          value={senha}
          onChangeText={setSenha}
        />
        <TouchableOpacity style={styles.linkButton} onPress={() => console.log("Esqueci a senha")}>
          <Text style={styles.linkText}>Não sei ou esqueci a senha</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    color: '#666',
  },
  subtitle: {
    fontSize: 14,
    color: '#777',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputGroup: {
    width: '100%',
    marginBottom: 15,
    position: 'relative',
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 10,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: '#f9f9f9',
  },
  linkButton: {
    position: 'absolute',
    right: 0,
    bottom: -25,
  },
  linkText: {
    color: '#007BFF',
    fontSize: 12,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default Login;
