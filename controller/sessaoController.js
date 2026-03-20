const { validationResult, matchedData } = require('express-validator');
const Sessao = require('../models/sessao');

module.exports = {
    addSessao: async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.json({ error: errors.mapped() });
        }

        const data = matchedData(req);

        const novaSessao = new Sessao({
            idSessao: data.idSessao,
            idFilme: data.idFilme,
            idSala: data.idSala,
            dataSessao: data.dataSessao,
            horarioInicio: data.horarioInicio,
            horarioFim: data.horarioFim,
            valorIngresso: data.valorIngresso,
            statusSessao: data.statusSessao
        });

        await novaSessao.save();

        res.json({ sessao: novaSessao });
    },

    getSessoes: async (req, res) => {
        const sessoes = await Sessao.find();
        res.json({ sessoes });
    }
};