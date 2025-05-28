
class NegociacaoController {
  constructor() {
    // bind serve para dar contexto a uma função que fica separada de seu objeto
    let $ = document.querySelector.bind(document);
    this.inputData = $("#data");
    this.inputQuantidade = $("#quantidade");
    this.inputValor = $("#valor");
    this.negociacoes = new Negociacoes();
  }
  adiciona(event) {
    event.preventDefault();
    // inclui a negociação
    this.negociacoes.adiciona(this.criaNegociacao());
    this.limpaFormulario();
  }
  limpaFormulario() {
    this.inputData.value = "";
    this.inputQuantidade.value = 1;
    this.inputValor.value = 0.0;
    this.inputData.focus();
  }
  criaNegociacao()
  {
    return new Negociacao(
      DateConverter.paraData(this.inputData.value),
      parseInt(this.inputQuantidade.value),
      parseFloat(this.inputValor.value)
    );
  }
}

