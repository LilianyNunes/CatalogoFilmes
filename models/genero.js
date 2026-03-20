const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    idGenero: String,
    nomeGenero: String,
    descricao: String
});

const modelName = 'Genero';

if (mongoose.connection && mongoose.connection.models[modelName]) {
    module.exports = mongoose.connection.models[modelName];
} else {
    module.exports = mongoose.model(modelName, modelSchema);
}