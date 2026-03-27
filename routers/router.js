const express = require('express');
const router = express.Router();

const filmeController = require('../controller/filmeController');
const salaController = require('../controller/salaController');
const sessaoController = require('../controller/sessaoController');
const generoController = require('../controller/generoController');

const filmeValidator = require('../validators/filmeValidator');
const salaValidator = require('../validators/salaValidator');
const sessaoValidator = require('../validators/sessaoValidator');
const generoValidator = require('../validators/generoValidator');


router.get('/ping', (req, res) => {
    res.json({ retorno: true });
});

// FILMES
router.post('/filmes', filmeValidator.addFilme, filmeController.addFilme);
router.get('/filmes', filmeController.getFilmes);

// SALAS
router.post('/salas', salaValidator.addSala, salaController.addSala);
router.get('/salas', salaController.getSalas);

// SESSOES
router.post('/sessoes', sessaoValidator.addSessao, sessaoController.addSessao);
router.get('/sessoes', sessaoController.getSessoes);
router.put('/sessoes/:idSessao/assento', sessaoController.updateAssento);

// GENEROS
router.post('/generos', generoValidator.addGenero, generoController.addGenero);
router.get('/generos', generoController.getGeneros);

module.exports = router;