const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const apiRouters = require('./routers/router');

require('dotenv').config({ path: 'variables.env' });

const server = express();

mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;

mongoose.connection.on('connected', () => {
    console.log('MongoDB conectado com sucesso!');
});

mongoose.connection.on('error', (error) => {
    console.error('Erro ao conectar no banco: ' + error.message);
});

server.use(cors());
server.use(express.json());
server.use('/', apiRouters);

server.listen(process.env.PORT, () => {
    console.log('Servidor rodando na porta ' + process.env.PORT);
});