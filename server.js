const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config({ path: 'variables.env' });

const apiRouters = require('./routers/router');

const app = express();

mongoose.connect(process.env.DATABASE);

mongoose.connection.on('connected', () => {
    console.log('MongoDB conectado com sucesso!');
});

mongoose.connection.on('error', (error) => {
    console.log('Erro ao conectar no MongoDB: ' + error.message);
});

app.use(express.json());
app.use('/', apiRouters);

app.listen(process.env.PORT, () => {
    console.log('Servidor rodando na porta ' + process.env.PORT);
});