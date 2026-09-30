# Desenvolvimento local

Instale as dependências do front uma vez com `cd front; npm install; cd ..`.
Na raiz do projeto, execute:

```powershell
npm run dev
```

O Angular fica em http://localhost:4200 e atualiza a página ao salvar arquivos do front. O Spring Boot fica em http://localhost:8080; ao salvar arquivos Java ou de configuração em `back/src/main`, eles são recompilados e o DevTools reinicia o back. Use `Ctrl+C` para encerrar os dois.

Requisitos: Node.js/npm e Java 25. O Maven é executado pelo wrapper incluído em `back`.
