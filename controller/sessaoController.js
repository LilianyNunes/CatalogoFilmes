const { validationResult, matchedData } = require('express-validator');
const Sessao = require('../models/sessao');
const Filme = require('../models/filme');
const Sala = require('../models/sala');

module.exports = {

    addSessao: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ erros: errors.mapped() });
            }

            const data = matchedData(req);

            if (new Date(data.dataFim) <= new Date(data.dataInicio)) {
                return res.status(400).json({
                    erro: 'dataFim deve ser maior que dataInicio.'
                });
            }

            const filmeExiste = await Filme.findById(data.idFilme);
            if (!filmeExiste) {
                return res.status(404).json({ erro: 'Filme não encontrado.' });
            }

            const salaExiste = await Sala.findById(data.idSala);
            if (!salaExiste) {
                return res.status(404).json({ erro: 'Sala não encontrada.' });
            }

            const novaSessao = new Sessao({
                idFilme: data.idFilme,
                idSala: data.idSala,
                dataInicio: data.dataInicio,
                dataFim: data.dataFim,
                valorIngresso: data.valorIngresso,
                statusSessao: data.statusSessao
            });

            await novaSessao.save();

            const sessaoSalva = await Sessao.findById(novaSessao._id)
                .populate('idFilme', 'titulo duracaoMinutos classificacaoIndicativa')
                .populate('idSala', 'nomeSala capacidadeTotal');

            return res.status(201).json({ sessao: sessaoSalva });

        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    },

    getSessoes: async (req, res) => {
        try {
            const sessoes = await Sessao.find()
                .populate('idFilme', 'titulo duracaoMinutos classificacaoIndicativa statusExibicao')
                .populate('idSala', 'nomeSala capacidadeTotal statusSala')
                .sort({ dataInicio: 1 });

            return res.status(200).json({ sessoes });

        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    }

};