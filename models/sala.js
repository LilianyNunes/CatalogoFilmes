const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    idSala: String,
    nomeSala: String,
    capacidadeTotal: Number,
    tipoSala: String,
    statusSala: String
});

const modelName = 'Sala';

if (mongoose.connection && mongoose.connection.models[modelName]) {
    module.exports = mongoose.connection.models[modelName];
} else {
    module.exports = mongoose.model(modelName, modelSchema);
}