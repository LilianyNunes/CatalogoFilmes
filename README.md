# 🎬 API Catálogo de Filmes

API desenvolvida em **Node.js** com **MongoDB** para gerenciamento de 🎥 filmes, 🏢 salas, 🎟️ sessões e 🎭 gêneros.

---

## 🚀 Como rodar o projeto

### 1. Instalar dependências

npm install

### 2. Configurar o banco

Criar o arquivo `variables.env` com:

PORT=7773  
DATABASE=mongodb://localhost:27017/CatalogoFilmes

### 3. Rodar o servidor

npm run start

---

## 🌐 Rotas para teste no navegador

Teste de funcionamento:  
```json
http://localhost:7773/ping
```

Listar filmes:
```json
http://localhost:7773/filmes
``` 

Listar salas: 
```json
http://localhost:7773/salas
```

Listar sessões:  
```json
http://localhost:7773/sessoes
``` 

Listar gêneros:  
```json
http://localhost:7773/generos  
```
---

## 📬 Rotas POST para teste (Postman / Thunder Client)

### 🎭 Criar gênero

POST → http://localhost:7773/generos  

Body JSON:

```json

{
  "idGenero": "1",
  "nomeGenero": "Ação",
  "descricao": "Filmes com cenas de ação e aventura"
}
```

---

### 🎬 Criar filme

POST → http://localhost:7773/filmes  

Body JSON:

```json

{
  "idFilme": "1",
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

Body JSON:

```json

{
  "idSala": "1",
  "nomeSala": "Sala 1",
  "capacidadeTotal": 120,
  "tipoSala": "2D",
  "statusSala": "DISPONIVEL"
}
```

---

### 🎟️ Criar sessão

POST → http://localhost:7773/sessoes  

Body JSON:

```json

{
  "idSessao": "1",
  "idFilme": "1",
  "idSala": "1",
  "dataSessao": "2026-03-30",
  "horarioInicio": "19:00",
  "horarioFim": "21:00",
  "valorIngresso": 30.00,
  "statusSessao": "DISPONIVEL"
}
```

---

## 🧪 Ordem recomendada para testes

1️⃣ Criar gênero  
2️⃣ Criar filme  
3️⃣ Criar sala  
4️⃣ Criar sessão  

---

## 🗂️ Estrutura do projeto

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

---

## ⚙️ Tecnologias utilizadas

- 🟢 Node.js  
- ⚡ Express  
- 🍃 MongoDB  
- 🧩 Mongoose  
- ✅ Express Validator  
- 🌐 CORS  
- 🔐 Dotenv  

---

## ✨ Funcionalidades implementadas

✔ Cadastro de gêneros  
✔ Cadastro de filmes  
✔ Cadastro de salas  
✔ Cadastro de sessões  
✔ Listagem de gêneros  
✔ Listagem de filmes  
✔ Listagem de salas  
✔ Listagem de sessões  
✔ Validação de dados  
✔ Persistência no banco de dados  

---

## 🔄 Fluxo de teste

1. Rodar o servidor  
   npm run start  

2. Testar conexão  
   http://localhost:7773/ping  

3. Inserir dados via POST  

4. Verificar dados via navegador  

5. Conferir no MongoDB Compass  

---

## 📌 Observação

As collections já estão criadas no banco, e os testes podem ser realizados inserindo dados em tempo real pela API.

---

## 👩‍💻 Autoria

Projeto desenvolvido por:

- Ianny Correia de Souza
- Liliany Nunes de Souza    
- Maycon Geovane do Carmo Costa  

📚 Disciplina: Sistemas Distribuídos  
