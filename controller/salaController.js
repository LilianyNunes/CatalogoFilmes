const { validationResult, matchedData } = require('express-validator');
const Sala = require('../models/sala');

module.exports = {
    addSala: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                
                return res.status(400).json({ erros: errors.mapped() });
            }

            const data = matchedData(req);

            const novaSala = new Sala({
                nomeSala: data.nomeSala,
                capacidadeTotal: data.capacidadeTotal,
                statusSala: data.statusSala
            });

            await novaSala.save();

            return res.status(201).json({ sala: novaSala });

        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    },

    getSalas: async (req, res) => {
        try {
            const salas = await Sala.find().sort({ nomeSala: 1 });
            return res.status(200).json({ salas });
        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    }
};