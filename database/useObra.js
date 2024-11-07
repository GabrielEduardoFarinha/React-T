import { useSQLiteContext } from 'expo-sqlite';
export function useObra() {
  const database = useSQLiteContext();

  async function createObra(obra) {
    const statement = await database.prepareAsync(
      'INSERT INTO Obra (nome,descricao, data, cep, numero, complemento, rua, bairro, cidade, latitude, longitude) VALUES ($nome, $descricao, $data, $cep, $numero, $complemento, $rua, $bairro, $cidade, $latitude, $longitude)'
    );
    try {
      const result = await statement.executeAsync({
        $nome: obra.nome,
        $descricao: obra.descricao,
        $data: obra.data,
        $cep: obra.cep,
        $numero: obra.numero,
        $complemento: obra.complemento,
        $rua: obra.rua,
        $bairro: obra.bairro,
        $cidade: obra.cidade,
        $latitude: obra.latitude,
        $longitude: obra.longitude,
      });

      const insertedRow = result.lastInsertRowId.toLocaleString();
      return { insertedRow };
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function list() {
    const query = 'SELECT * FROM Obra';
    try {
      const result = await database.getAllAsync(query);
      return { result };
    } catch (error) {
      throw error;
    }
  }
  async function getOne(id) {
    const statement = await database.prepareAsync(
      'SELECT * FROM Obra WHERE id = $id'
    );
    try {
      const result = await statement.executeAsync({
        $id: id,
      });
      const obra = await result.getFirstAsync();
      return { result: obra };
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function deleteObra(id) {
    const statement = await database.prepareAsync(
      'DELETE FROM Obra WHERE id = $id'
    );

    try {
      await statement.executeAsync({
        $id: id,
      });
      return;
    } catch (error) {
      throw error;
    } finally {
      statement.finalizeAsync();
    }
  }

  return { createObra, list, getOne, deleteObra };
}
