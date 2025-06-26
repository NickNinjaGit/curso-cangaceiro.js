class Mensagem
{
    #texto
    constructor(texto = "")
    {
        this.#texto = texto;
    }
    get texto()
    {
        return this.#texto;
    }
    set texto(texto)
    {
        this.#texto = texto;
    }
}