import { useSQLiteContext } from 'expo-sqlite';
export function useObraDocumento() {
  const database = useSQLiteContext();

  async function relateDocumentoObra(documentoId, obraId) {
    const checkStatement = await database.prepareAsync(
      'SELECT *  FROM Documento_Obra  WHERE documento_id = $documentoId AND obra_id = $obraId'
    );

    try {
      // Verifica se a relação já existe
      const checkResult = await checkStatement.executeAsync({
        $documentoId: documentoId,
        $obraId: obraId,
      });
      const exists = await checkResult.getAllAsync();

      if (exists.length !== 0) {
        return { result: 'Relação já existe.' };
      }

      //Se não existir, insere a nova relação
      const insertStatement = await database.prepareAsync(
        'INSERT INTO Documento_Obra (documento_id, obra_id) VALUES ($documento_id, $obraId)'
      );

      await insertStatement.executeAsync({
        $documento_id: documentoId,
        $obraId: obraId,
      });

      return;
    } catch (error) {
      throw error;
    } finally {
      await checkStatement.finalizeAsync();
    }
  }

  
  async function getDocumentosPorObra(documentoId) {
    const statement = await database.prepareAsync(
      'SELECT O.nome AS nome FROM Documento_Obra DO JOIN Obra O ON DO.obra_id = O.id WHERE DO.documento_id = $documentoId'
    );

    try {
      const result = await statement.executeAsync({
        $documentoId: documentoId,
      });
      const allResults = await result.getAllAsync();
      return { result: allResults };
    } catch (error) {
      throw error;
    }
  }

  return {
    getDocumentosPorObra,
    relateDocumentoObra,
    
  };
}
