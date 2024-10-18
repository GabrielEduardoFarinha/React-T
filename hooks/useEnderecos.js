import { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@enderecos';

export function useEndereco() {
  const [enderecos, setEnderecos] = useState([]);

  // Função para carregar endereços do AsyncStorage
  const loadEnderecos = useCallback(async () => {
    try {
      const storedEnderecos = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedEnderecos !== null) {
        setEnderecos(JSON.parse(storedEnderecos)); // Load the full list of saved addresses
      } else {
        setEnderecos([]); // If there are no saved addresses, set an empty array
      }
    } catch (error) {
      console.error('Erro ao carregar endereços', error);
    }
  }, []);

  // Função para salvar novos endereços manualmente
  const saveEnderecos = useCallback(async (newEndereco) => {
    try {
      // Usamos uma função "updater" para garantir que temos o estado anterior correto
      const newAddress = { ...newEndereco, id: enderecos.length };
      const newAddresses = [...enderecos];
      newAddresses.push(newAddress);
      setEnderecos(newAddresses);

      // Salva no AsyncStorage o array atualizado
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newAddresses));
    } catch (error) {
      console.error('Erro ao salvar endereços', error);
    }
  }, [enderecos]);

  // Função para remover um endereço pelo índice
  const deleteEndereco = useCallback(
    async (index) => {
      try {
        const updatedEnderecos = enderecos.filter(
          (endereco) => endereco.id !== index
        ); // Remove o endereço no índice dado
        setEnderecos(updatedEnderecos);
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(updatedEnderecos)
        ); // Atualiza o AsyncStorage
      } catch (error) {
        console.error('Erro ao apagar endereço', error);
      }
    },
    [enderecos]
  );

  return { enderecos, loadEnderecos, saveEnderecos, deleteEndereco };
}
