const { validationResult, matchedData } = require('express-validator');
const Genero = require('../models/genero');

module.exports = {
    addGenero: async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.json({ error: errors.mapped() });
        }

        const data = matchedData(req);

        const novoGenero = new Genero({
            idGenero: data.idGenero,
            nomeGenero: data.nomeGenero,
            descricao: data.descricao
        });

        await novoGenero.save();

        res.json({ genero: novoGenero });
    },

    getGeneros: async (req, res) => {
        const generos = await Genero.find();
        res.json({ generos });
    }
};