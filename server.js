// Importa o módulo Express.js para criar e configurar o servidor web.
const express = require('express');
// Cria uma instância do aplicativo Express.
const app = express();
// Define a porta que o servidor irá escutar. Utiliza a variável de ambiente PORT se disponível (para o Render), senão usa a porta 3000 localmente.
const port = process.env.PORT || 3000;

// Define um endpoint GET no caminho raiz ("/").
app.get('/', (req, res) => {
  // Ao receber uma requisição GET neste endpoint, envia uma resposta JSON.
  res.json({ mensagem: "API REST Node.js funcionando no Render!" });
});

// Inicia o servidor Express para escutar requisições na porta definida.
app.listen(port, () => {
  // Mensagem de log informando que o servidor foi iniciado e em qual porta está rodando.
  console.log(`Servidor rodando na porta ${port}`);
});