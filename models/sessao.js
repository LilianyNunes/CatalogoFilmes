const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    idSessao: String,
    idFilme: String,
    idSala: String,
    dataSessao: Date,
    horarioInicio: String,
    horarioFim: String,
    valorIngresso: Number,
    statusSessao: String
});

const modelName = 'Sessao';

if (mongoose.connection && mongoose.connection.models[modelName]) {
    module.exports = mongoose.connection.models[modelName];
} else {
    module.exports = mongoose.model(modelName, modelSchema);
}