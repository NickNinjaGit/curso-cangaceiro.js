class NegociacaoController
{
    adiciona(event)
    {
        // cancelando a submissão do formulário
        event.preventDefault();
        // bind serve para dar contexto a uma função que fica separada de seu objeto
        let $ = document.querySelector.bind(document);
        #inputData = $('#data');
        #inputQuantidade = $("#quantidade");
        #inputValor = $("#valor");
        
        console.log(this.inputData.value);
        console.log(parseInt(this.inputQuantidade.value));
        console.log(parseFloat(this.inputValor.value));
    }
}