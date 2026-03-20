const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    idFilme: String,
    titulo: String,
    sinopse: String,
    duracaoMinutos: Number,
    classificacaoIndicativa: String,
    genero: String,
    idioma: String,
    statusExibicao: String,
    dataLancamento: Date
});

const modelName = 'Filme';

if (mongoose.connection && mongoose.connection.models[modelName]) {
    module.exports = mongoose.connection.models[modelName];
} else {
    module.exports = mongoose.model(modelName, modelSchema);
}