class Negociacoes
{
    #negociacoes = [];

    constructor(negociacoes)
    {
        negociacoes = this.#negociacoes;
    }

    adiciona(negociacao)
    {
        this.negociacoes.push(negociacao);
    }
    get negociacoes()
    {
        return [].concat(this.#negociacoes);
    }
}