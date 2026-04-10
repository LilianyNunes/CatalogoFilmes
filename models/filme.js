const mongoose = require('mongoose');

// ✅ genero usa ObjectId referenciando 'Genero'
// ✅ classificacaoIndicativa tem enum definido
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
        required: true,
        min: 1
    },
    classificacaoIndicativa: {
        type: String,
        required: true,
        enum: ['Livre', '10', '12', '14', '16', '18']
    },
    genero: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genero',       // ✅ populate vai funcionar
        required: true
    },
    idioma: {
        type: String,
        required: true,
        trim: true
    },
    statusExibicao: {
        type: String,
        enum: ['EM_CARTAZ', 'EM_BREVE', 'INDISPONIVEL'],
        default: 'EM_CARTAZ'
    },
    dataLancamento: {
        type: Date,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

const modelName = 'Filme';

if (mongoose.connection && mongoose.connection.models[modelName]) {
    module.exports = mongoose.connection.models[modelName];
} else {
    module.exports = mongoose.model(modelName, modelSchema);
}