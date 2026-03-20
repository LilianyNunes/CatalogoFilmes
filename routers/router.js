const express = require('express');
const router = express.Router();

const Filme = require('../models/filme');
const Sala = require('../models/sala');
const Sessao = require('../models/sessao');
const Genero = require('../models/genero');

router.get('/ping', (req, res) => {
    res.json({ retorno: true });
});

// TESTE FILME
router.get('/teste-filme', async (req, res) => {
    try {
        const novoFilme = new Filme({
            idFilme: '1',
            titulo: 'Batman',
            sinopse: 'Filme de ação',
            duracaoMinutos: 120,
            classificacaoIndicativa: '12',
            genero: 'Ação',
            idioma: 'Dublado',
            statusExibicao: 'EM_CARTAZ',
            dataLancamento: new Date()
        });

        await novoFilme.save();
        res.json({ filme: novoFilme });
    } catch (error) {
        res.json({ erro: error.message });
    }
});

router.get('/filmes', async (req, res) => {
    try {
        const filmes = await Filme.find();
        res.json({ filmes });
    } catch (error) {
        res.json({ erro: error.message });
    }
});

// TESTE SALA
router.get('/teste-sala', async (req, res) => {
    try {
        const novaSala = new Sala({
            idSala: '1',
            nomeSala: 'Sala 1',
            capacidadeTotal: 120,
            tipoSala: '2D',
            statusSala: 'DISPONIVEL'
        });

        await novaSala.save();
        res.json({ sala: novaSala });
    } catch (error) {
        res.json({ erro: error.message });
    }
});

router.get('/salas', async (req, res) => {
    try {
        const salas = await Sala.find();
        res.json({ salas });
    } catch (error) {
        res.json({ erro: error.message });
    }
});

// TESTE SESSAO
router.get('/teste-sessao', async (req, res) => {
    try {
        const novaSessao = new Sessao({
            idSessao: '1',
            idFilme: '1',
            idSala: '1',
            dataSessao: new Date(),
            horarioInicio: '19:00',
            horarioFim: '21:00',
            valorIngresso: 30,
            statusSessao: 'DISPONIVEL'
        });

        await novaSessao.save();
        res.json({ sessao: novaSessao });
    } catch (error) {
        res.json({ erro: error.message });
    }
});

router.get('/sessoes', async (req, res) => {
    try {
        const sessoes = await Sessao.find();
        res.json({ sessoes });
    } catch (error) {
        res.json({ erro: error.message });
    }
});

// TESTE GENERO
router.get('/teste-genero', async (req, res) => {
    try {
        const novoGenero = new Genero({
            idGenero: '1',
            nomeGenero: 'Ação',
            descricao: 'Filmes com cenas de ação e aventura'
        });

        await novoGenero.save();
        res.json({ genero: novoGenero });
    } catch (error) {
        res.json({ erro: error.message });
    }
});

router.get('/generos', async (req, res) => {
    try {
        const generos = await Genero.find();
        res.json({ generos });
    } catch (error) {
        res.json({ erro: error.message });
    }
});

module.exports = router;