const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const apiRouters = require('./routers/router');

require('dotenv').config({ path: 'variables.env' });

mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;

mongoose.connection.on('error', (error) => {
    console.error(`Error connecting to database: ${error.message}`);
});

const server = express();

server.use(cors());
server.use(express.json());
server.use('/', apiRouters);

const servico = server.listen(process.env.PORT, () => {
    console.log('Servidor rodando na porta ' + servico.address().port);
});