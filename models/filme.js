const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    sinopse: {
        type: String,
        required: true,
        trim: true
    },
    duracaoMinutos: {
        type: Number,
        required: true
    },
    classificacaoIndicativa: {
        type: String,
        required: true,
        trim: true
    },
    genero: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Generos',
        required: true
    }],
    idioma: {
        type: String,
        required: true,
        trim: true
    },
    statusExibicao: {
        type: String,
        required: true,
        enum: ['EM_CARTAZ', 'FORA_DE_CARTAZ']
    },
    dataLancamento: {
        type: Date,
        required: true
    }
});

const modelName = 'Filmes';

if (mongoose.connection && mongoose.connection.models[modelName]) {
    module.exports = mongoose.connection.models[modelName];
} else {
    module.exports = mongoose.model(modelName, modelSchema);
}