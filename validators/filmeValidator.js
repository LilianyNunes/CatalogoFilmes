const { checkSchema } = require('express-validator');

module.exports = {
    addFilme: checkSchema({
        idFilme: {
            notEmpty: true,
            errorMessage: 'idFilme é obrigatório'
        },
        titulo: {
            notEmpty: true,
            errorMessage: 'Título é obrigatório'
        },
        sinopse: {
            notEmpty: true,
            errorMessage: 'Sinopse é obrigatória'
        },
        duracaoMinutos: {
            notEmpty: true,
            isInt: true,
            errorMessage: 'Duração deve ser número inteiro'
        },
        classificacaoIndicativa: {
            notEmpty: true,
            errorMessage: 'Classificação indicativa é obrigatória'
        },
        genero: {
            notEmpty: true,
            errorMessage: 'Gênero é obrigatório'
        },
        idioma: {
            notEmpty: true,
            errorMessage: 'Idioma é obrigatório'
        },
        statusExibicao: {
            notEmpty: true,
            errorMessage: 'Status de exibição é obrigatório'
        },
        dataLancamento: {
            notEmpty: true,
            isISO8601: true,
            errorMessage: 'Data de lançamento inválida'
        }
    })
};