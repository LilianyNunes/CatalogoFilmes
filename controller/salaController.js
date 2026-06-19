const { validationResult, matchedData } = require("express-validator");
const Sala = require("../models/sala");

module.exports = {
  addSala: async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ erros: errors.mapped() });
      }

      const data = matchedData(req);
      const nomeSalaNormalizado = data.nomeSala.trim();

      const salaExistente = await Sala.findOne({
        nomeSala: nomeSalaNormalizado,
      }).collation({ locale: "pt", strength: 2 });

      if (salaExistente) {
        return res.status(409).json({
          erro: "Já existe uma sala cadastrada com esse nome.",
          salaExistente,
        });
      }

      const novaSala = new Sala({
        nomeSala: nomeSalaNormalizado,
        capacidadeTotal: data.capacidadeTotal,
        statusSala: data.statusSala || "ATIVA",
      });

      await novaSala.save();

      return res.status(201).json({ sala: novaSala });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(409).json({
          erro: "Já existe uma sala cadastrada com esse nome.",
        });
      }

      return res.status(500).json({ erro: error.message });
    }
  },

  getSalas: async (req, res) => {
    try {
      const salas = await Sala.find()
        .collation({ locale: "pt", strength: 2 })
        .sort({ nomeSala: 1 });

      return res.status(200).json({ salas });
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },
  deleteSala: async (req, res) => {
    try {
      const { id } = req.params;

      const salaDeletada = await Sala.findByIdAndDelete(id);

      if (!salaDeletada) {
        return res.status(404).json({
          erro: "Sala não encontrada.",
        });
      }

      return res.status(200).json({
        mensagem: "Sala deletada com sucesso.",
        sala: salaDeletada,
      });
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },
};
