const express = require('express');
const router = express.Router();

const filmeContr = require('../controller/filmeController');
const salaContr = require('../controller/salaController');
const sessaoContr = require('../controller/sessaoController');
const generoContr = require('../controller/generoController');

const filmeValidator = require('../validators/filmeValidator');
const salaValidator = require('../validators/salaValidator');
const sessaoValidator = require('../validators/sessaoValidator');
const generoValidator = require('../validators/generoValidator');

router.get('/ping', (req, res) => {
    res.json({ retorno: true });
});

router.post('/filmes', filmeValidator.addFilme, filmeContr.addFilme);
router.get('/filmes', filmeContr.getFilmes);

router.post('/salas', salaValidator.salaValidator, salaContr.addSala);
router.get('/salas', salaContr.getSalas);

router.post('/sessoes', sessaoValidator.sessaoValidator, sessaoContr.addSessao);
router.get('/sessoes', sessaoContr.getSessoes);

router.post('/generos', generoValidator.generoValidator, generoContr.addGenero);
router.get('/generos', generoContr.getGeneros);

module.exports = router;