import { openDatabaseAsync, SQLiteDatabase} from 'expo-sqlite';
export async function createTables(database: SQLiteDatabase) {
  try {
    // await database.execAsync('DROP TABLE IF EXISTS Obra')
    // await database.execAsync('DROP TABLE IF EXISTS Funcionarios')
    // await database.execAsync('DROP TABLE IF EXISTS Funcionario_Obra')

    await database.execAsync(`
    CREATE TABLE IF NOT EXISTS Obra (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nome TEXT ,
          descricao TEXT ,
          data TEXT ,
          cep TEXT ,
          numero INTEGER ,
          complemento TEXT,
          rua TEXT ,
          bairro TEXT ,
          cidade TEXT ,
          latitude REAL ,
          longitude REAL 
      );
  `);
    
    await database.execAsync(`
    CREATE TABLE IF NOT EXISTS Funcionarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      salario REAL,
      profissao TEXT
    );
  `);
    await database.execAsync(`
    CREATE TABLE IF NOT EXISTS Funcionario_Obra (
      funcionario_id INTEGER NOT NULL,
      obra_id INTEGER NOT NULL,
      PRIMARY KEY (funcionario_id, obra_id),
      FOREIGN KEY (funcionario_id) REFERENCES Funcionarios(id) ON DELETE CASCADE,
      FOREIGN KEY (obra_id) REFERENCES Obra(id) ON DELETE CASCADE
    );
  `);
  } catch (error) {
    throw error
  }
}
