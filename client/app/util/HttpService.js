class HttpService
{
    get(url)
    {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.onreadystatechange = () => {
              // 4 é o estagio onde a req foi concluida e a resposta está pronta
              if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                  // JA PASSA O RESULTADO PARSEADO PARA O RESOLVE
                  resolve(JSON.parse(xhr.responseText));
                } else {
                  reject(xhr.responseText);
                }
              }
            };
            xhr.send();
          });
    }
}