const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    idFilme: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Filmes',
        required: true
    },
    idSala: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Salas',
        required: true
    },
    dataSessao: {
        type: Date,
        required: true
    },
    horarioInicio: {
        type: String,
        required: true
    },
    horarioFim: {
        type: String,
        required: true
    },
    valorIngresso: {
        type: Number,
        required: true
    },
    statusSessao: {
        type: String,
        required: true,
        enum: ['DISPONIVEL', 'CANCELADA', 'ENCERRADA']
    }
});

const modelName = 'Sessoes';

if (mongoose.connection && mongoose.connection.models[modelName]) {
    module.exports = mongoose.connection.models[modelName];
} else {
    module.exports = mongoose.model(modelName, modelSchema);
}