const { checkSchema } = require('express-validator');

module.exports = {
    addSessao: checkSchema({
        idFilme: {
            notEmpty: true,
            isMongoId: true,
            errorMessage: 'O idFilme deve ser um ObjectId válido.'
        },
        idSala: {
            notEmpty: true,
            isMongoId: true,
            errorMessage: 'O idSala deve ser um ObjectId válido.'
        },
        dataSessao: {
            notEmpty: true,
            isISO8601: true,
            toDate: true,
            errorMessage: 'A data da sessão deve ser válida.'
        },
        horarioInicio: {
            notEmpty: true,
            matches: {
                options: [/^([01]\d|2[0-3]):([0-5]\d)$/]
            },
            errorMessage: 'O horário de início deve estar no formato HH:MM.'
        },
        horarioFim: {
            notEmpty: true,
            matches: {
                options: [/^([01]\d|2[0-3]):([0-5]\d)$/]
            },
            errorMessage: 'O horário de fim deve estar no formato HH:MM.'
        },
        valorIngresso: {
            notEmpty: true,
            isFloat: {
                options: { min: 0.01 }
            },
            errorMessage: 'O valor do ingresso deve ser maior que zero.'
        },
        statusSessao: {
            notEmpty: true,
            isIn: {
                options: [['DISPONIVEL', 'CANCELADA', 'ENCERRADA']]
            },
            errorMessage: 'Status da sessão inválido.'
        }
    })
};