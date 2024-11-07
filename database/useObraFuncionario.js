import { useSQLiteContext } from 'expo-sqlite';
export function useObraFuncionario() {
  const database = useSQLiteContext();

  async function relateFuncionarioObra(funcionarioId, obraId) {
    const checkStatement = await database.prepareAsync(
      'SELECT *  FROM Funcionario_Obra  WHERE funcionario_id = $funcionarioId AND obra_id = $obraId'
    );

    try {
      // Verifica se a relação já existe
      const checkResult = await checkStatement.executeAsync({
        $funcionarioId: funcionarioId,
        $obraId: obraId,
      });
      const exists = await checkResult.getAllAsync();

      if (exists.length !== 0) {
        return { result: 'Relação já existe.' };
      }

      //Se não existir, insere a nova relação
      const insertStatement = await database.prepareAsync(
        'INSERT INTO Funcionario_Obra (funcionario_id, obra_id) VALUES ($funcionarioIdd, $obraIdd)'
      );

      await insertStatement.executeAsync({
        $funcionarioIdd: funcionarioId,
        $obraIdd: obraId,
      });

      return;
    } catch (error) {
      throw error;
    } finally {
      await checkStatement.finalizeAsync();
    }
  }

  async function getAll() {
    try {
      const result = await database.getAllAsync(`
  SELECT 
    Funcionarios.nome AS funcionario_nome, 
    Obra.nome AS obra_nome 
  FROM 
    Funcionario_Obra
  INNER JOIN 
    Funcionarios ON Funcionario_Obra.funcionario_id = Funcionarios.id
  INNER JOIN 
    Obra ON Funcionario_Obra.obra_id = Obra.id;
`);
    } catch (e) {
      throw e;
    }
  }

  async function getObrasPorFuncionario(funcionarioId) {
    const statement = await database.prepareAsync(
      'SELECT O.nome AS nome FROM Funcionario_Obra FO JOIN Obra O ON FO.obra_id = O.id WHERE FO.funcionario_id = $funcionarioId'
    );

    try {
      const result = await statement.executeAsync({
        $funcionarioId: funcionarioId,
      });
      const allResults = await result.getAllAsync();
      return { result: allResults };
    } catch (error) {
      throw error;
    }
  }

  async function getFuncionariosPorObra(obraId) {
    const statement = await database.prepareAsync(
      'SELECT  F.nome, F.profissao, F.id FROM Funcionario_Obra FO JOIN Funcionarios F ON FO.funcionario_id = F.id WHERE FO.obra_id = $obraId'
    );

    try {
      const result = await statement.executeAsync({
        $obraId: obraId,
      });
      const allResults = await result.getAllAsync();
      return { result: allResults };
    } catch (error) {
      throw error;
    }
  }

  async function removeFuncionarioFromObra(id) {
    const statement = await database.prepareAsync(
      'DELETE FROM Funcionario_Obra WHERE funcionario_id = $id'
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

  return {
    relateFuncionarioObra,
    getAll,
    getObrasPorFuncionario,
    getFuncionariosPorObra,removeFuncionarioFromObra
  };
}
