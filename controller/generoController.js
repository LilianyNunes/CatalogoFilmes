const { validationResult, matchedData } = require("express-validator");
const Genero = require("../models/genero");

module.exports = {
  addGenero: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ erros: errors.mapped() });
      }

      const data = matchedData(req);

      const novoGenero = new Genero({
        nomeGenero: data.nomeGenero,
        descricao: data.descricao,
      });

      await novoGenero.save();

      return res.status(201).json({ genero: novoGenero });
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },

  getGeneros: async (req, res) => {
    try {
      const generos = await Genero.find().sort({ nomeGenero: 1 });
      return res.status(200).json({ generos });
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },
  deleteGenero: async (req, res) => {
    try {
      const { id } = req.params;

      const generoDeletado = await Genero.findByIdAndDelete(id);

      if (!generoDeletado) {
        return res.status(404).json({
          erro: "Gênero não encontrado.",
        });
      }

      return res.status(200).json({
        mensagem: "Gênero deletado com sucesso.",
        genero: generoDeletado,
      });
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },
};
