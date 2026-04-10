const { validationResult, matchedData } = require('express-validator');
const Genero = require('../models/genero');

module.exports = {
    addGenero: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                // ✅ Status 400 para erros de validação
                return res.status(400).json({ erros: errors.mapped() });
            }

            const data = matchedData(req);

            // ✅ Sem idGenero manual — MongoDB gera o _id
            const novoGenero = new Genero({
                nomeGenero: data.nomeGenero,
                descricao: data.descricao
            });

            await novoGenero.save();

            // ✅ Status 201 para criação bem-sucedida
            return res.status(201).json({ genero: novoGenero });

        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    },

    getGeneros: async (req, res) => {
        try {
            const generos = await Genero.find().sort({ nomeGenero: 1 });
            return res.status(200).json({ generos });
        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    }
};