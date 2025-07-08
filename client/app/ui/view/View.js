class View {
    constructor(seletor)
    {
        this.elemento = document.querySelector(seletor);
    }
    update(model)
    {
        this.elemento.innerHTML = this.template(model);
    }
    // Usamos um erro pois em VanillaJS não há classes abstratas
    template(model)
    {
        throw new Error("Você precisa implementar o método template");
    }
}