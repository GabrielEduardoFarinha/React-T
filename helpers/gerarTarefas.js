export const generateTestAddresses = (quantity) => {
  const addresses = [];
  const baseAddress = "Rua Exemplo, ";

  for (let i = 0; i < quantity; i++) {
    // Gera uma data aleatória dentro dos próximos 30 dias
    const today = new Date();
    const randomDays = Math.floor(Math.random() * 30); // Gera número de 0 a 29
    const futureDate = new Date(today.setDate(today.getDate() + randomDays));
    
    // Formata a data para 'YYYY-MM-DD'
    const formattedDate = futureDate.toISOString().split('T')[0];

    // Cria o endereço
    const address = `${baseAddress}${i + 1}`;
    
    addresses.push({
      data: formattedDate,
      endereco: address,
      id: i+1
    });
  }

  return addresses;
};
