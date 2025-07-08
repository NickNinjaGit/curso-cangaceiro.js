class NegociacaoController {
  constructor() {
    // bind serve para dar contexto a uma função que fica separada de seu objeto
    const $ = document.querySelector.bind(document);
    this.inputData = $("#data");
    this.inputQuantidade = $("#quantidade");
    this.inputValor = $("#valor");

    this.service = new NegociacaoService();
    // Associando Modelo e View através de um Bind object, similar a mecanismos de Data Binding
    this.negociacoes = new Bind(
      new Negociacoes(), // Modelo
      new NegociacoesView("#negociacoes"), // View
      "adiciona",
      "esvazia" // Métodos que o Proxy está observando
    );
    this.mensagem = new Bind(
      new Mensagem(),
      new MensagemView("#mensagemView"),
      "texto"
    );
  }
  adiciona(event) {
    try {
      event.preventDefault();
      // inclui a negociação
      this.negociacoes.adiciona(this.criaNegociacao());
      this.mensagem.texto = "Negociação adicionada com sucesso!";
      this.limpaFormulario();
    } catch (err) {
      console.log(err);
      console.log(err.stack);

      err instanceof DataInvalidaException
        ? (this.mensagem.texto = err.message)
        : (this.mensagem.texto =
            "Um erro não esperado aconteceu, Entre em contato com o suporte");
    }
  }
  // Reseta os inputs do formulário para seus placeholders
  limpaFormulario() {
    this.inputData.value = "";
    this.inputQuantidade.value = 1;
    this.inputValor.value = 0.0;
    this.inputData.focus();
  }
  // Cria um novo objeto de Negociação baseado nos inputs, antes os convertendo de string para Data Int e Float
  criaNegociacao() {
    return new Negociacao(
      DateConverter.paraData(this.inputData.value),
      parseInt(this.inputQuantidade.value),
      parseFloat(this.inputValor.value)
    );
  }
  apaga() {
    this.negociacoes.esvazia();
    this.mensagem.texto = "Negociações apagadas com sucesso";
  }

  importaNegociacoes() {
    const negociacoes = [];

    this.service.obterNegociacoesDaSemana().then(
      (semana) => {
        negociacoes.push(...semana);
        return this.service
          .obterNegociacoesDaSemanaAnterior()
          .then((anterior) => {
            negociacoes.push(...anterior);
            return this.service
              .obterNegociacoesDaSemanaRetrasada()
              .then((retrasada) => {
                negociacoes.push(...retrasada);
                negociacoes.forEach((negociacao) =>
                  this.negociacoes.adiciona(negociacao)
                );
                this.mensagem.texto = "Negociações importadas com sucesso!";
              });
          })
          .catch((err) => (this.mensagem.texto = err));
      },
      (err) => (this.mensagem.texto = err)
    );
  }
}
