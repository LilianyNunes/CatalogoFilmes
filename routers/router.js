const express = require("express");
const router = express.Router();

const filmeController = require("../controller/filmeController");
const salaController = require("../controller/salaController");
const sessaoController = require("../controller/sessaoController");
const generoController = require("../controller/generoController");
const integracaoController = require("../controller/integracaoController");

const filmeValidator = require("../validators/filmeValidator");
const salaValidator = require("../validators/salaValidator");
const sessaoValidator = require("../validators/sessaoValidator");
const generoValidator = require("../validators/generoValidator");

router.get("/ping", (req, res) => {
  res.json({ retorno: true });
});

// ── GÊNEROS ────────────────────────────────────────────────────────
router.post("/generos", generoValidator.addGenero, generoController.addGenero);
router.get("/generos", generoController.getGeneros);
router.delete("/generos/:id", generoController.deleteGenero);

// ── FILMES ─────────────────────────────────────────────────────────
router.post("/filmes", filmeValidator.addFilme, filmeController.addFilme);
router.get("/filmes", filmeController.getFilmes);
router.delete("/filmes/:id", filmeController.deleteFilme);

// ── SALAS ──────────────────────────────────────────────────────────
router.post("/salas", salaValidator.addSala, salaController.addSala);
router.get("/salas", salaController.getSalas);
router.delete("/salas/:id", salaController.deleteSala);

// ── SESSÕES ────────────────────────────────────────────────────────
router.post("/sessoes", sessaoValidator.addSessao, sessaoController.addSessao);
router.get("/sessoes", sessaoController.getSessoes);
router.delete("/sessoes/:id", sessaoController.deleteSessao);

// ── INTEGRAÇÃO COM API DE RESERVAS ────────────────────────────────
router.get("/sessoes/:id_sessao/assentos", integracaoController.buscarAssentos);
router.post("/sessoes/:id_sessao/reservas", integracaoController.criarReserva);

// Rota opcional de teste da integração
router.post("/integracao/enviar", integracaoController.enviarDados);
module.exports = router;
