import { Negociacoes, NegociacaoService, Negociacao } from "../index.js";
import {
  NegociacoesView,
  MensagemView,
  Mensagem,
  DataInvalidaException,
  DateConverter,
} from "../../ui/index.js";
import { getNegociacaoDao, Bind } from "../../util/index.js";
export class NegociacaoController {
  constructor() {
    // bind serve para dar contexto a uma função que fica separada de seu objeto
    const $ = document.querySelector.bind(document);
    this.inputData = $("#data");
    this.inputQuantidade = $("#quantidade");
    this.inputValor = $("#valor");

    this.service = new NegociacaoService();
    // Associando Modelo e View através de um Bind object, similar a mecanismos de Data Binding
    this.negociacoes = new Bind(
      new Negociacoes(), // Modelo
      new NegociacoesView("#negociacoes"), // View
      "adiciona",
      "esvazia" // Métodos que o Proxy está observando
    );
    this.mensagem = new Bind(
      new Mensagem(),
      new MensagemView("#mensagemView"),
      "texto"
    );
    this._init();
  }
  async _init() {
    try {
      const dao = await getNegociacaoDao();
      const negociacoes = await dao.listaTodos();
      negociacoes.forEach(negociacao => this.negociacoes.adiciona(negociacao));
    } catch (err) {
      this.mensagem.texto = err.message;
    }
    // adiciona as negociações do banco na lista de negociações da table
    // CÓDIGO SEM ASYNC AWAIT; MENOS LEGÍVEL MAIS COMPLEXO.
    /*getNegociacaoDao()
      .then((dao) => dao.listaTodos())
      .then((negociacoes) =>
        negociacoes.forEach((negociacao) =>
          this.negociacoes.adiciona(negociacao)
        )
      )
      .catch((err) => (this.mensagem.texto = err));*/
  }
  async adiciona(event) {
    try {
      event.preventDefault();
      // inclui a negociação
      const negociacao = this.criaNegociacao();
      // Dao Factory responsável por persistir os dados da negociação no IndexedDB
      const dao = await getNegociacaoDao();
      await dao.adiciona(negociacao);
      this.mensagem.texto = "Negociacão adicionada com sucesso";
      this.limpaFormulario();
      //CÓDIGO ANTIGO SEM ASYNC AWAIT.
      /*getNegociacaoDao()
        .then((dao) => dao.adiciona(negociacao))
        .then(() => {
          // só tentará incluir na tabela se conseguiu antes incluir no banco
          this.negociacoes.adiciona(negociacao);
          this.mensagem.texto = "Negociação adicionada com sucesso!";
          this.limpaFormulario();
        });*/
    } catch (err) {
      console.log(err);
      console.log(err.stack);

      err instanceof DataInvalidaException
        ? (this.mensagem.texto = err.message)
        : (this.mensagem.texto =
            "Um erro não esperado aconteceu, Entre em contato com o suporte");
    }
  }
  // Reseta os inputs do formulário para seus placeholders
  limpaFormulario() {
    this.inputData.value = "";
    this.inputQuantidade.value = 1;
    this.inputValor.value = 0.0;
    this.inputData.focus();
  }
  // Cria um novo objeto de Negociação baseado nos inputs, antes os convertendo de string para Data Int e Float
  criaNegociacao() {
    return new Negociacao(
      DateConverter.paraData(this.inputData.value),
      parseInt(this.inputQuantidade.value),
      parseFloat(this.inputValor.value)
    );
  }
  async apaga() {
    const dao = await getNegociacaoDao();
    await dao.apagaTodos();
    this.negociacoes.esvazia();
    this.mensagem.texto = "Negociacoes apagadas com sucesso";
    /*getNegociacaoDao()
      .then((dao) => dao.apagaTodos())
      .then(() => {
        this.negociacoes.esvazia();
        this.mensagem.texto = "Negociações apagadas com sucesso";
      })
      .catch((err) => (this.mensagem.texto = err));*/
  }

  async importaNegociacoes() {
    try {
      const negociacoes = await this.service.obtemNegociacoesDoPeriodo();
    console.log(negociacoes);
    negociacoes
    .filter(
      (novaNegociacao) =>
        !this.negociacoes.negociacoesArr.some((negociacaoExistente) =>
          novaNegociacao.equals(negociacaoExistente)
        )
    )
    .forEach((negociacao) => this.negociacoes.adiciona(negociacao));
    this.mensagem.texto = "Negociações do período importadas com sucesso!";
    // CÓDIGO SEM ASYNC AWAIT
    /*this.service
      .obtemNegociacoesDoPeriodo()
      .then((negociacoes) => {
        negociacoes
          .filter(
            (novaNegociacao) =>
              !this.negociacoes.negociacoesArr.some((negociacaoExistente) =>
                novaNegociacao.equals(negociacaoExistente)
              )
          )
          .forEach((negociacao) => this.negociacoes.adiciona(negociacao));
        this.mensagem.texto = "Negociações importadas com sucesso!";
      })*/
    } catch(err) { (this.mensagem.texto = err.message) };
  }
}
