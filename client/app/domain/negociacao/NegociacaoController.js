class NegociacaoController {
  constructor() {
    // bind serve para dar contexto a uma função que fica separada de seu objeto
    let $ = document.querySelector.bind(document);
    this.inputData = $("#data");
    this.inputQuantidade = $("#quantidade");
    this.inputValor = $("#valor");
  }
  adiciona(event) {
    event.preventDefault();
    // o index de mês é 1, e precisamos subtraí-lo por 1 também, logo ficará 1 - 1 quando chegar em mês.
    let data = new Date(
      ...this.inputData.value
        .split("-")
        .map((item, index) => item - (index % 2))
    )
    // cancelando a submissão do formulário

    let negociacao = new Negociacao(
      data,
      parseInt(this.inputQuantidade.value),
      parseFloat(this.inputValor.value)
    );

    console.log(negociacao);
  }
}
