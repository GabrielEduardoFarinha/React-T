import axios from 'axios';
// Função para buscar coordenadas via Nominatim
export const fetchCoordinates = async (address) => {
  const encodedAddress =
    `${address.logradouro}, ${address.bairro}, ${address.localidade}, ${address.estado}, ${address.uf}, Brasil`.replace(
      /%20/g,
      '+'
    );
  try {
    const encodedAddress = encodeURIComponent(address);
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&addressdetails=1`
    );

    if (response.data.length > 0) {
      const location = response.data[0];
      return {
        latitude: parseFloat(location.lat), 
        longitude: parseFloat(location.lon) 
      };
    } else {
      console.error('Endereço não encontrado');
      return {latitude: 0,longitude:0};
    }
  } catch (error) {
    console.error('Erro ao buscar coordenadas:', error);
    return {latitude: 0,longitude:0};
  }
};
