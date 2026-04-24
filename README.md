# 🎬 API Catálogo de Filmes

API desenvolvida em **Node.js** com **MongoDB** para gerenciamento de 🎥 filmes, 🏢 salas, 🎟️ sessões e 🎭 gêneros.

---

## 🚀 Como rodar o projeto

### 1. Instalar dependências

```bash
npm install express mongoose cors dotenv express-validator
```

### 2. Configurar o banco

Criar o arquivo `variables.env`:

```env
PORT=7773
DATABASE=mongodb://localhost:27017/CatalogoFilmes
```

### 3. Rodar o servidor

```bash
npm run start
```

---

## 🌐 Rotas para teste no navegador

Teste de funcionamento:
http://localhost:7773/ping

Listar filmes:
http://localhost:7773/filmes

Listar salas:
http://localhost:7773/salas

Listar sessões:
http://localhost:7773/sessoes

Listar gêneros:
http://localhost:7773/generos

---

## 📬 Rotas POST para teste (Postman / Thunder Client)

### 🎭 Criar gênero

POST → http://localhost:7773/generos

```json
{
  "nomeGenero": "Ação",
  "descricao": "Filmes com cenas de ação e aventura"
}
```

---

### 🎬 Criar filme

POST → http://localhost:7773/filmes

```json
{
  "titulo": "Batman",
  "sinopse": "Filme de ação e aventura",
  "duracaoMinutos": 120,
  "classificacaoIndicativa": "12",
  "genero": "Ação",
  "idioma": "Dublado",
  "statusExibicao": "EM_CARTAZ",
  "dataLancamento": "2026-03-20"
}
```

---

### 🏢 Criar sala

POST → http://localhost:7773/salas

```json
{
  "nomeSala": "Sala 1",
  "capacidadeTotal": 120,
  "tipoSala": "2D",
  "statusSala": "DISPONIVEL"
}
```

---

### 🎟️ Criar sessão

POST → http://localhost:7773/sessoes

```json
{
  "dataSessao": "2026-03-30",
  "horarioInicio": "19:00",
  "horarioFim": "21:00",
  "valorIngresso": 30.00,
  "statusSessao": "DISPONIVEL"
}
```

---

## 🛑 Testes de validação (dados inválidos)

A API utiliza **express-validator** para validar os dados.

### ❌ Filme inválido

```json
{
  "idFilme": "",
  "titulo": "",
  "sinopse": "",
  "duracaoMinutos": "abc",
  "classificacaoIndicativa": "",
  "genero": "",
  "idioma": "",
  "statusExibicao": "",
  "dataLancamento": "data invalida"
}
```

---

### ❌ Sala inválida

```json
{
  "nomeSala": "",
  "capacidadeTotal": "abc",
  "tipoSala": "5D",
  "statusSala": ""
}
```

---

### ❌ Sessão inválida

```json
{
  "idSessao": "",
  "idFilme": "",
  "idSala": "",
  "dataSessao": "data errada",
  "horarioInicio": "25:00",
  "horarioFim": "99:99",
  "valorIngresso": -10,
  "statusSessao": "TESTE"
}
```

---

### ❌ Gênero inválido

```json
{
  "nomeGenero": "",
  "descricao": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

---

## 🧪 Ordem recomendada para testes

1. Criar gênero  
2. Criar filme  
3. Criar sala  
4. Criar sessão  

---

## 🗂️ Estrutura do projeto

```text
controller/
├── filmeController.js
├── generoController.js
├── salaController.js
└── sessaoController.js

models/
├── filme.js
├── genero.js
├── sala.js
└── sessao.js

validators/
├── filmeValidator.js
├── generoValidator.js
├── salaValidator.js
└── sessaoValidator.js

routers/
└── router.js

server.js
variables.env
package.json
package-lock.json
.gitignore
```

---

## ⚙️ Tecnologias utilizadas

- Node.js  
- Express  
- MongoDB  
- Mongoose  
- Express Validator  
- CORS  
- Dotenv  

---

## ✨ Funcionalidades implementadas

- Cadastro de gêneros  
- Cadastro de filmes  
- Cadastro de salas  
- Cadastro de sessões  
- Listagem de dados  
- Validação de dados  
- Persistência no banco  

---

## 🔄 Fluxo de teste

1. Rodar o servidor  
2. Testar `/ping`  
3. Inserir dados via POST  
4. Verificar via GET  
5. Conferir no MongoDB Compass  

---

## 📌 Observação

As collections já estão criadas no banco.

---

## 👩‍💻 Autoria

- Ianny Correia de Souza  
- Liliany Nunes de Souza  
- Maycon Geovane do Carmo Costa  

Disciplina: Sistemas Distribuídos
