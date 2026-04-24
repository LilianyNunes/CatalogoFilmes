const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    nomeGenero: {
        type: String,
        required: true,
        trim: true
    },
    descricao: {
        type: String,
        trim: true
    }
}, {
    timestamps: true,
    versionKey: false
});

const modelName = 'Genero';

if (mongoose.connection && mongoose.connection.models[modelName]) {
    module.exports = mongoose.connection.models[modelName];
} else {
    module.exports = mongoose.model(modelName, modelSchema);
}