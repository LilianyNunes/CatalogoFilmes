const { validationResult, matchedData } = require('express-validator');
const Filme = require('../models/filme');
const Genero = require('../models/genero');

module.exports = {
    addFilme: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                // ✅ Status 400 para erros de validação
                return res.status(400).json({ erros: errors.mapped() });
            }

            const data = matchedData(req);

            // ✅ Verifica se o gênero existe no banco antes de salvar
            const generoExiste = await Genero.findById(data.genero);
            if (!generoExiste) {
                return res.status(404).json({ erro: 'Gênero não encontrado.' });
            }

            const novoFilme = new Filme({
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

            // ✅ populate traz os dados do gênero junto na resposta
            const filmeSalvo = await Filme.findById(novoFilme._id).populate('genero', 'nomeGenero');

            return res.status(201).json({ filme: filmeSalvo });

        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    },

    getFilmes: async (req, res) => {
        try {
            // ✅ populate traz os dados do gênero em cada filme
            const filmes = await Filme.find()
                .populate('genero', 'nomeGenero')
                .sort({ createdAt: -1 });

            return res.status(200).json({ filmes });

        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    }
};