import { HttpService } from "../../util/HttpService.js";
import { Negociacao } from "./Negociacao.js";
export class NegociacaoService {
  constructor() {
    this.http = new HttpService();
  }
  obterNegociacoesDaSemana() {
    return this.http.get("http://localhost:3000/negociacoes/semana").then(
      (dados) => {
        const negociacoes = dados.map(
          (objeto) =>
            new Negociacao(
              new Date(objeto.data),
              objeto.quantidade,
              objeto.valor
            )
        );
        return negociacoes;
      },
      (err) => {
        throw new Error("Não foi possivel obter as negociações");
      }
    );
  }
  obterNegociacoesDaSemanaAnterior() {
    return this.http.get("http://localhost:3000/negociacoes/anterior").then(
      (dados) => {
        const negociacoes = dados.map(
          (objeto) =>
            new Negociacao(
              new Date(objeto.data),
              objeto.quantidade,
              objeto.valor
            )
        );
        return negociacoes;
      },
      (err) => {
        throw new Error(
          "Não foi possivel obter as negociações da semana anterior"
        );
      }
    );
  }
  obterNegociacoesDaSemanaRetrasada() {
    return this.http.get("http://localhost:3000/negociacoes/retrasada").then(
      (dados) => {
        const negociacoes = dados.map(
          (objeto) =>
            new Negociacao(
              new Date(objeto.data),
              objeto.quantidade,
              objeto.valor
            )
        );
        return negociacoes;
      },
      (err) => {
        throw new Error(
          "Não foi possivel obter as negociações da semana retrasada"
        );
      }
    );
  }
  obtemNegociacoesDoPeriodo() {
    // RECEBE UM ARRAY DE PROMISES
    return (
      Promise.all([
        this.obterNegociacoesDaSemana(),
        this.obterNegociacoesDaSemanaAnterior(),
        this.obterNegociacoesDaSemanaRetrasada(),
      ])
        // periodo é um arr de arrays que representam todos os dados coletados na ordem que foi chamado
        // em Promise.all
        .then((periodo) =>
          periodo
            .reduce((novoArr, item) => novoArr.concat(item), [])
            .sort((a, b) => b.data.getTime() - a.data.getTime())
        )
        .catch((err) => {
          console.log(err);
          throw new Error("Não foi possível obter as negociações do periodo");
        })
    );
  }
}
