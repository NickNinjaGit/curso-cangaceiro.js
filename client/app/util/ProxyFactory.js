class ProxyFactory
{
    static create(objeto, props, armadilha)
    {
        return new Proxy(objeto, {
            get(target, prop, receiver) {
              if (
                // target[prop] representa a propriedade que ele está acessando no momento
                // caso o acessor retorne tipo Function e ele esteja incluido no arr props
                ProxyFactory.ehFuncao(target[prop]) &&
                props.includes(prop)
              ) {
                return function () {
                  console.log(`${prop} disparou a armadilha`);
                  Reflect.apply(target[prop], target, arguments);
                  // target é a instância real de Negociações
                  // executa a armadilha que recebe o objeto original
                  armadilha(target);
                };
              } else {
                return Reflect.get(target, prop, receiver);
              }
            },
            set(target, prop, value, receiver)
            {
                // atualiza as mudanças de maneira automática
                const updated = Reflect.set(target, prop, value)

                // Só executa a armadilha se fizer parte da lista de props
                if(props.includes(prop)) armadilha(target);

                return updated;
            }
          });
    }
    static ehFuncao(fn)
    {
        return typeof(fn) === typeof(Function);
    }
}