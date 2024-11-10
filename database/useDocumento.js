import { useSQLiteContext } from 'expo-sqlite';
import { useObraDocumento } from './useObraDocumento';
export function useDocumento() {
  const database = useSQLiteContext();
  const { relateDocumentoObra } = useObraDocumento();
  async function createDocumento(documento, obraId) {
    const statement = await database.prepareAsync(
      'INSERT INTO Documentos (nome,tipo,descricao) VALUES ($nome, $tipo, $descricao)'
    )
    try {
      const result = await statement.executeAsync({
        $nome: documento.nome,
        $tipo: documento.tipo,
        $descricao: documento.descricao,
      });
      

      const insertedRow = result.lastInsertRowId;
      await relateDocumentoObra(insertedRow, obraId);
      return;
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function list() {
    const query = 'SELECT * FROM Documentos';
    try {
      const result = await database.getAllAsync(query);
      return { result };
    } catch (error) {
      throw error;
    }
  }

  async function deleteDocumento(id) {
    const statement = await database.prepareAsync(
      'DELETE FROM Documentos WHERE id = $id'
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

  return { createDocumento, list, deleteDocumento };
}
