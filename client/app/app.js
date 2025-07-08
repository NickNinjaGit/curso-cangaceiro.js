const controller = new NegociacaoController();

// associa o evento de submissão do formulário à chamada do método "adiciona".
// criando o alias
const $ = document.querySelector.bind(document);
$(".form").addEventListener("submit", controller.adiciona.bind(controller));
$("#botao-apaga").addEventListener("click", controller.apaga.bind(controller));
$("#botao-importa").addEventListener("click", controller.importaNegociacoes.bind(controller));