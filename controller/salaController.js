const { validationResult, matchedData } = require('express-validator');
const Sala = require('../models/sala');

module.exports = {
    addSala: async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.json({ error: errors.mapped() });
        }

        const data = matchedData(req);

        const novaSala = new Sala({
            idSala: data.idSala,
            nomeSala: data.nomeSala,
            capacidadeTotal: data.capacidadeTotal,
            tipoSala: data.tipoSala,
            statusSala: data.statusSala
        });

        await novaSala.save();

        res.json({ sala: novaSala });
    },

    getSalas: async (req, res) => {
        const salas = await Sala.find();
        res.json({ salas });
    }
};