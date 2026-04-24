const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    nomeSala: {
        type: String,
        required: true,
        trim: true
    },
    capacidadeTotal: {
        type: Number,
        required: true,
        min: 1
    },
    statusSala: {
        type: String,
        enum: ['ATIVA', 'INATIVA', 'MANUTENCAO'],
        default: 'ATIVA'
    }
}, {
    timestamps: true,
    versionKey: false
});

const modelName = 'Sala';

if (mongoose.connection && mongoose.connection.models[modelName]) {
    module.exports = mongoose.connection.models[modelName];
} else {
    module.exports = mongoose.model(modelName, modelSchema);
}