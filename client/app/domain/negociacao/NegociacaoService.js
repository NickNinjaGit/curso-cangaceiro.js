class NegociacaoService{
    obterNegociacoesDaSemana(cb)
    {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:3000/negociacoes/semana");
        xhr.onreadystatechange = () => {
          // 4 é o estagio onde a req foi concluida e a resposta está pronta
          if (xhr.readyState == 4) {
            if (xhr.status == 200) {
              console.log("Obtendo as negociações do servidor");
              console.log(JSON.parse(xhr.responseText));
              //converte cada objeto em uma instancia de Negociação e os adiciona a Negociações
              const negociacoes = JSON.parse(xhr.responseText)
                .map(
                  (objeto) =>
                    new Negociacao(objeto.data, objeto.quantidade, objeto.valor)
                )
              cb(null, negociacoes)
            } else {
                console.log(xhr.responseText)
                cb("Não foi possível obter as negociações da semana", null)
            }
          }
        };
        xhr.send();
    }
}