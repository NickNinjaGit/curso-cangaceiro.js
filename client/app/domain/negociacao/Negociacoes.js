class Negociacoes {
  _negociacoes = [];
  #contexto;
  #armadilha;
  constructor() {
    Object.freeze(this);
  }

  adiciona(negociacao) {
    this._negociacoes.push(negociacao);
  }
  get negociacoesArr() {
    return [...this._negociacoes]; // retorna cópia para não permitir modificação externa
  }
  get volumeTotal() {
    // iterar sobre o array negociações e somar o valor do volume
    return this.negociacoesArr
    .reduce((total, negociacao) => total + negociacao.volume, 0)
  }

  esvazia()
  {
    this._negociacoes.length = 0;
    Object.freeze(this);
  }
}
