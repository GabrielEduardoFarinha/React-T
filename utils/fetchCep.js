import axios from 'axios';

export const fetchAddress = async (cep) => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    return {adress: response.data} 
  } catch (error) {
    throw Error('Erro ao buscar cep');
  }
};
