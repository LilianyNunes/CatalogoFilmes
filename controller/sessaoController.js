const { validationResult, matchedData } = require("express-validator");
const Sessao = require("../models/sessao");
const Filme = require("../models/filme");
const Sala = require("../models/sala");

module.exports = {
  addSessao: async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ erros: errors.mapped() });
      }

      const data = matchedData(req);

      const dataInicio = new Date(data.dataInicio);
      const dataFim = new Date(data.dataFim);

      if (dataFim <= dataInicio) {
        return res.status(400).json({
          erro: "dataFim deve ser maior que dataInicio.",
        });
      }

      const filmeExiste = await Filme.findById(data.idFilme);

      if (!filmeExiste) {
        return res.status(404).json({
          erro: "Filme não encontrado.",
        });
      }

      const salaExiste = await Sala.findById(data.idSala);

      if (!salaExiste) {
        return res.status(404).json({
          erro: "Sala não encontrada.",
        });
      }

      if (salaExiste.statusSala !== "ATIVA") {
        return res.status(400).json({
          erro: "Não é possível criar sessão em uma sala inativa ou em manutenção.",
          statusSala: salaExiste.statusSala,
        });
      }

      const sessaoConflitante = await Sessao.findOne({
        idSala: data.idSala,
        statusSessao: { $ne: "CANCELADA" },
        dataInicio: { $lt: dataFim },
        dataFim: { $gt: dataInicio },
      })
        .populate("idFilme", "titulo")
        .populate("idSala", "nomeSala");

      if (sessaoConflitante) {
        return res.status(409).json({
          erro: "Já existe uma sessão cadastrada para essa sala nesse intervalo de horário.",
          conflito: {
            idSessao: sessaoConflitante._id,
            filme: sessaoConflitante.idFilme,
            sala: sessaoConflitante.idSala,
            dataInicio: sessaoConflitante.dataInicio,
            dataFim: sessaoConflitante.dataFim,
            statusSessao: sessaoConflitante.statusSessao,
          },
        });
      }

      const novaSessao = new Sessao({
        idFilme: data.idFilme,
        idSala: data.idSala,
        dataInicio,
        dataFim,
        valorIngresso: data.valorIngresso,
        statusSessao: data.statusSessao || "DISPONIVEL",
      });

      await novaSessao.save();

      const sessaoSalva = await Sessao.findById(novaSessao._id)
        .populate("idFilme", "titulo duracaoMinutos classificacaoIndicativa")
        .populate("idSala", "nomeSala capacidadeTotal statusSala");

      return res.status(201).json({ sessao: sessaoSalva });
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },

  getSessoes: async (req, res) => {
    try {
      const sessoes = await Sessao.find()
        .populate(
          "idFilme",
          "titulo duracaoMinutos classificacaoIndicativa statusExibicao",
        )
        .populate("idSala", "nomeSala capacidadeTotal statusSala")
        .sort({ dataInicio: 1 });

      return res.status(200).json({ sessoes });
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },
  deleteSessao: async (req, res) => {
    try {
      const { id } = req.params;

      const sessaoDeletada = await Sessao.findByIdAndDelete(id);

      if (!sessaoDeletada) {
        return res.status(404).json({
          erro: "Sessão não encontrada.",
        });
      }

      return res.status(200).json({
        mensagem: "Sessão deletada com sucesso.",
        sessao: sessaoDeletada,
      });
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },
};
