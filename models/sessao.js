const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    idFilme: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Filme',
        required: true
    },
    idSala: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sala',
        required: true
    },
    dataInicio: {
        type: Date,
        required: true
    },
    dataFim: {
        type: Date,
        required: true
    },
    valorIngresso: {
        type: Number,
        required: true,
        min: 0.01
    },
    statusSessao: {
        type: String,
        enum: ['DISPONIVEL', 'CANCELADA', 'ENCERRADA'],
        default: 'DISPONIVEL'
    }
}, {
    timestamps: true,
    versionKey: false
});

const modelName = 'Sessao';

if (mongoose.connection && mongoose.connection.models[modelName]) {
    module.exports = mongoose.connection.models[modelName];
} else {
    module.exports = mongoose.model(modelName, modelSchema);
}