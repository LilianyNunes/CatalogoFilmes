const { checkSchema } = require('express-validator');

module.exports = {
    addSessao: checkSchema({
        idFilme: {
            notEmpty: {
                errorMessage: 'idFilme é obrigatório.'
            },
            isMongoId: {
                errorMessage: 'idFilme inválido.'
            }
        },
        idSala: {
            notEmpty: {
                errorMessage: 'idSala é obrigatório.'
            },
            isMongoId: {
                errorMessage: 'idSala inválido.'
            }
        },
        dataInicio: {
            notEmpty: {
                errorMessage: 'Data de início é obrigatória.'
            },
            isISO8601: {
                errorMessage: 'Use formato ISO 8601 (ex: 2026-04-25T18:00:00)'
            },
            toDate: true
        },
        dataFim: {
            notEmpty: {
                errorMessage: 'Data de fim é obrigatória.'
            },
            isISO8601: {
                errorMessage: 'Use formato ISO 8601 (ex: 2026-04-25T20:00:00)'
            },
            toDate: true
        },
        valorIngresso: {
            notEmpty: {
                errorMessage: 'Valor obrigatório.'
            },
            isFloat: {
                options: { min: 0.01 },
                errorMessage: 'Valor deve ser maior que zero.'
            },
            toFloat: true
        },
        statusSessao: {
            optional: true,
            isIn: {
                options: [['DISPONIVEL', 'CANCELADA', 'ENCERRADA']],
                errorMessage: 'Status inválido.'
            }
        }
    })
};