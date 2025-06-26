const controller = new NegociacaoController();

// associa o evento de submissão do formulário à chamada do método "adiciona".
document.querySelector(".form").addEventListener("submit", controller.adiciona.bind(controller));
document.querySelector("#botao-apaga").addEventListener("click", controller.apaga.bind(controller));