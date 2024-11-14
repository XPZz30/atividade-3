const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const empresas = [];

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/cadastrar', (req, res) => {
  const { cnpj, razaoSocial, nomeFantasia, endereco, cidade, uf, cep, email, telefone } = req.body;
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

  empresas.push({ cnpj, razaoSocial, nomeFantasia, endereco, cidade, uf, cep, email, telefone });
  res.redirect('/');
});

app.get('/empresas', (req, res) => {
  res.json(empresas);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
