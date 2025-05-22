class Negociacao
{
    #data = new Date();
    #quantidade = 1;
    #valor = 0.0;
    constructor(data, quantidade, valor)
    {
        this.#data = new Date(this.#data.getTime());
        this.#quantidade = quantidade;
        this.#valor = valor;
        Object.freeze(this);
    }

    get volume()
    {
        return this.#quantidade * this.#valor;
    }

    get data()
    {
        return new Date(this.#data.getTime());
    }
    get quantidade()
    {
        return this.#quantidade;
    }
    get valor()
    {
        return this.#valor;
    }
}