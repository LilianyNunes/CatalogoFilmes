const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    nomeSala: {
        type: String,
        required: true,
        trim: true
    },
    capacidadeTotal: {
        type: Number,
        required: true
    },
    tipoSala: {
        type: String,
        required: true,
        enum: ['2D', '3D']
    },
    statusSala: {
        type: String,
        required: true,
        enum: ['DISPONIVEL', 'INDISPONIVEL']
    }
});

const modelName = 'Salas';

if (mongoose.connection && mongoose.connection.models[modelName]) {
    module.exports = mongoose.connection.models[modelName];
} else {
    module.exports = mongoose.model(modelName, modelSchema);
}