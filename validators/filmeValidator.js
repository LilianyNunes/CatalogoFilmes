const { checkSchema } = require('express-validator');

module.exports = {
    addFilme: checkSchema({
        titulo: {
            notEmpty: true,
            errorMessage: 'O título é obrigatório.'
        },
        sinopse: {
            notEmpty: true,
            errorMessage: 'A sinopse é obrigatória.'
        },
        duracaoMinutos: {
            notEmpty: true,
            isInt: true,
            errorMessage: 'A duração deve ser um número inteiro.'
        },
        classificacaoIndicativa: {
            notEmpty: true,
            errorMessage: 'A classificação indicativa é obrigatória.'
        },
        genero: {
            notEmpty: true,
            errorMessage: 'O gênero é obrigatório.'
        },
        idioma: {
            notEmpty: true,
            errorMessage: 'O idioma é obrigatório.'
        },
        statusExibicao: {
            notEmpty: true,
            errorMessage: 'O status de exibição é obrigatório.'
        },
        dataLancamento: {
            notEmpty: true,
            isISO8601: true,
            errorMessage: 'A data de lançamento deve ser válida.'
        }
    })
};