const { validationResult, matchedData } = require('express-validator');
const Filme = require('../models/filme');

module.exports = {
    addFilme: async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.json({ error: errors.mapped() });
        }

        const data = matchedData(req);

        const novoFilme = new Filme({
            idFilme: data.idFilme,
            titulo: data.titulo,
            sinopse: data.sinopse,
            duracaoMinutos: data.duracaoMinutos,
            classificacaoIndicativa: data.classificacaoIndicativa,
            genero: data.genero,
            idioma: data.idioma,
            statusExibicao: data.statusExibicao,
            dataLancamento: data.dataLancamento
        });

        await novoFilme.save();
        res.json({ filme: novoFilme });
    },

    getFilmes: async (req, res) => {
        const filmes = await Filme.find();
        res.json({ filmes });
    }
};