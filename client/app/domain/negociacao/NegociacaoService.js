class NegociacaoService {
  constructor() {
    this.http = new HttpService();
  }
  obterNegociacoesDaSemana() {
    return this.http.get("http://localhost:3000/negociacoes/semana").then(
      (dados) => {
        const negociacoes = dados.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
        return negociacoes;
      },
      (err) => {
        throw new Error("Não foi possivel obter as negociações");
      }
    );
  }
  obterNegociacoesDaSemanaAnterior()
  {
    return this.http.get("http://localhost:3000/negociacoes/anterior").then(
      (dados) => {
        const negociacoes = dados.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
        return negociacoes;
      },
      (err) => {
        throw new Error("Não foi possivel obter as negociações da semana anterior");
      }
    );
  }
  obterNegociacoesDaSemanaRetrasada()
  {
    return this.http.get("http://localhost:3000/negociacoes/retrasada").then(
      (dados) => {
        const negociacoes = dados.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
        return negociacoes;
      },
      (err) => {
        throw new Error("Não foi possivel obter as negociações da semana retrasada");
      }
    );
  }
}
