const Filme = require('../models/filme');

module.exports = {
    addFilme: async (req, res) => {
        const novoFilme = new Filme({
            titulo: req.body.titulo,
            sinopse: req.body.sinopse,
            duracaoMinutos: req.body.duracaoMinutos
        });

        await novoFilme.save();

        res.json({ filme: novoFilme });
    },

    getFilmes: async (req, res) => {
        const filmes = await Filme.find();
        res.json({ filmes });
    },

    testeFilme: async (req, res) => {
        const novoFilme = new Filme({
            titulo: 'Teste Controller',
            sinopse: 'Filme vindo do controller',
            duracaoMinutos: 100
        });

        await novoFilme.save();

        res.json({ filme: novoFilme });
    }
};