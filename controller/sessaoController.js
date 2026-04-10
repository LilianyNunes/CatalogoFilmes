const { validationResult, matchedData } = require('express-validator');
const Sessao = require('../models/sessao');
const Filme = require('../models/filme');
const Sala = require('../models/sala');

module.exports = {
    addSessao: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                // ✅ Status 400 para erros de validação
                return res.status(400).json({ erros: errors.mapped() });
            }

            const data = matchedData(req);

            // ✅ Verifica se o filme existe
            const filmeExiste = await Filme.findById(data.idFilme);
            if (!filmeExiste) {
                return res.status(404).json({ erro: 'Filme não encontrado.' });
            }

            // ✅ Verifica se a sala existe
            const salaExiste = await Sala.findById(data.idSala);
            if (!salaExiste) {
                return res.status(404).json({ erro: 'Sala não encontrada.' });
            }

            // ✅ Sem idSessao manual, sem assento
            const novaSessao = new Sessao({
                idFilme: data.idFilme,
                idSala: data.idSala,
                dataSessao: data.dataSessao,
                horarioInicio: data.horarioInicio,
                horarioFim: data.horarioFim,
                valorIngresso: data.valorIngresso,
                statusSessao: data.statusSessao
            });

            await novaSessao.save();

            // ✅ populate traz título do filme e nome da sala
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
            // ✅ populate traz dados de filme e sala em cada sessão
            const sessoes = await Sessao.find()
                .populate('idFilme', 'titulo duracaoMinutos classificacaoIndicativa statusExibicao')
                .populate('idSala', 'nomeSala capacidadeTotal statusSala')
                .sort({ dataSessao: 1, horarioInicio: 1 });

            return res.status(200).json({ sessoes });

        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    }

    // ❌ updateAssento REMOVIDO — assentos são gerenciados pelo Grupo B
};