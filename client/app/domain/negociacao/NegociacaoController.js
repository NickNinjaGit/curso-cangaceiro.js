class NegociacaoController {
  constructor() {
    // bind serve para dar contexto a uma função que fica separada de seu objeto
    const $ = document.querySelector.bind(document);
    this.inputData = $("#data");
    this.inputQuantidade = $("#quantidade");
    this.inputValor = $("#valor");

    // guardando referência da instância NegociaçãoController
    const self = this;
    this.negociacoes = new Proxy(new Negociacoes(), {
      get(target, prop, receiver) {
        if (
          typeof target[prop] === typeof Function &&
          ["adiciona", "esvazia"].includes(prop)
        ) {
          return function () {
            console.log(`${prop} disparou a armadilha`);
            target[prop].apply(target, arguments);
            // target é a instância real de Negociações
            self.negociacoesView.update(target);
          };
        } else {
          return target[prop];
        }
      },
    });

    this.negociacoesView = new NegociacoesView("#negociacoes");

    // instanciando modelo Mensagem
    this.mensagem = new Mensagem();

    this.mensagemView = new MensagemView("#mensagemView");
    this.mensagemView.update(this.mensagem);
  }
  adiciona(event) {
    event.preventDefault();
    // inclui a negociação
    this.negociacoes.adiciona(this.criaNegociacao());
    this.mensagem.texto = "Negociação adicionada com sucesso!";
    this.mensagemView.update(this.mensagem);
    this.limpaFormulario();
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
    this.mensagemView.update(this.mensagem);
  }
}
