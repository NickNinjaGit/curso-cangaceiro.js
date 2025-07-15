class NegociacaoDao {
  constructor(connection) {
    this.connection = connection;
    this.store = "negociacoes";
  }
  adiciona(negociacao) {
    return new Promise((resolve, reject) => {
      // lógicas de inclusão
      const request = this.connection
        .transaction([this.store], "readwrite")
        .objectStore(this.store)
        .add(negociacao);

      request.onsuccess = (e) => resolve();
      request.onerror = (e) => {
        console.log(e.target.error);
        reject("Não foi possível salvar a negociação");
      };
    });
  }
  
  listaTodos() {
    return new Promise((resolve, reject) => {
      // lógica de cursor
      const negociacoes = [];
      const cursor = this.connection
        .transaction([this.store], "readwrite")
        .objectStore(this.store)
        .openCursor();
        cursor.onsuccess = e => {
          const atual = e.target.result;
          // Pega o item atual do cursor e cria uma instancia de negociacao com base em seus dados
          if(atual)
          {
            const negociacao = new Negociacao(atual.value._data, atual.value._quantidade, atual.value._valor);
            negociacoes.push(negociacao);
            // Passa o cursor para o próximo item da store de negociações
            atual.continue();
            // Caso chegue em um range fora dos itens da store; pare.
          } else {
            resolve(negociacoes);
          }
         
        }
        cursor.onerror = e => {
          console.log(e.target.error);
          reject("Não foi possível listar nas negociações");
        }
    });
  }
  apagaTodos() {
    return new Promise((resolve, reject) => {
      const request = this.connection
      .transaction([this.store], "readwrite")
      .objectStore(this.store)
      .clear();

      request.onsuccess = e => resolve();
      request.onerror = e => {
        console.log(e.target.error);
        reject("Não foi possível apagar as negociações");
      }
    })
  }
}
