const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware para processar dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));

// Servir arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Lista para armazenar as empresas cadastradas
const empresas = [];

// Rota para exibir o formulário e a lista de empresas cadastradas
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para processar o cadastro de empresas
app.post('/cadastrar', (req, res) => {
  const { cnpj, razaoSocial, nomeFantasia, endereco, cidade, uf, cep, email, telefone } = req.body;

  // Validação dos campos
  const camposVazios = [];
  if (!cnpj) camposVazios.push('CNPJ');
  if (!razaoSocial) camposVazios.push('Razão Social');
  if (!nomeFantasia) camposVazios.push('Nome Fantasia');
  if (!endereco) camposVazios.push('Endereço');
  if (!cidade) camposVazios.push('Cidade');
  if (!uf) camposVazios.push('UF');
  if (!cep) camposVazios.push('CEP');
  if (!email) camposVazios.push('Email');
  if (!telefone) camposVazios.push('Telefone');

  if (camposVazios.length > 0) {
    return res.send(`Os seguintes campos são obrigatórios: ${camposVazios.join(', ')}`);
  }

  // Adicionar a nova empresa à lista
  empresas.push({ cnpj, razaoSocial, nomeFantasia, endereco, cidade, uf, cep, email, telefone });

  // Redirecionar de volta para o formulário com a lista atualizada
  res.redirect('/');
});

// Rota para fornecer a lista de empresas cadastradas para o front-end
app.get('/empresas', (req, res) => {
  res.json(empresas);
});

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
