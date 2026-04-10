const mongoose = require('mongoose');

// ✅ Sem idSessao manual — usa _id do MongoDB
// ✅ idFilme e idSala usam ObjectId com ref correto
// ✅ SEM campo assento — assentos são controlados pelo Grupo B
const modelSchema = new mongoose.Schema({
    idFilme: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Filme',        // ✅ populate vai funcionar
        required: true
    },
    idSala: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sala',         // ✅ populate vai funcionar
        required: true
    },
    dataSessao: {
        type: Date,
        required: true
    },
    horarioInicio: {
        type: String,
        required: true,
        trim: true
    },
    horarioFim: {
        type: String,
        required: true,
        trim: true
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