

const stores = ["negociacoes"];
let connection = null;
let close = null;
export class ConnectionFactory {
  constructor() {
    throw new Error("Não é possível criar instâncias dessa classe");
  }
  static getConnection() {
    return new Promise((resolve, reject) => {
      // Se a conexão já existe, não a crie novamente
      if (connection) return resolve(connection);
      // cria uma conexao com o banco configurado
      const openRequest = indexedDB.open("jscangaceiro", 2);
      // banco criado ou atualizado
      openRequest.onupgradeneeded = (e) => {
        ConnectionFactory._createStores(e.target.result);
      };
      openRequest.onsuccess = (e) => {
        // Com a conexão salva, o banco será criado apenas uma vez por conta da verificação anterior
        connection = e.target.result; // retorna idbDatabase
        // Guarda uma referência da função original
        close = connection.close.bind(connection);
        // Monkey Patch
        connection.close = () => {
          throw new Error("Você não pode fechar diretamente a conexão");
        };
        resolve(connection);
      };
      openRequest.onerror = (e) => {
        console.log(e.target.error);
        reject(e.target.result);
      };
    });
  }
  // stores sao tabelas do indexedDB
  static _createStores(connection) {
    stores.forEach((store) => {
      if (connection.objectStoreNames.contains(store))
        connection.deleteObjectStore(store);
      connection.createObjectStore(store, { autoIncrement: true });
    });
  }
  static _closeConnection(connection) {
    if (connection) {
      // Chamando o close original
      close();
      console.log("Conexão fechada com sucesso!");
    }
  }
}
