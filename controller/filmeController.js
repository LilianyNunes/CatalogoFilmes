const { validationResult, matchedData } = require('express-validator');
const Filme = require('../models/filme');

module.exports = {
    addFilme: async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.json({ error: errors.mapped() });
            }

            const data = matchedData(req);

            const novoFilme = new Filme(data);

            await novoFilme.save();

            res.json({ filme: novoFilme });
        } catch (error) {
            res.json({ erro: error.message });
        }
    },

    getFilmes: async (req, res) => {
        try {
            const filmes = await Filme.find();
            res.json({ filmes });
        } catch (error) {
            res.json({ erro: error.message });
        }
    }
};