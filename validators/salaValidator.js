const { checkSchema } = require('express-validator');

module.exports = {
    addSala: checkSchema({
        idSala: {
            notEmpty: true,
            errorMessage: 'idSala é obrigatório'
        },
        nomeSala: {
            notEmpty: true,
            trim: true,
            isLength: {
                options: { min: 1, max: 50 }
            },
            errorMessage: 'O nome da sala deve ter entre 1 e 50 caracteres.'
        },
        capacidadeTotal: {
            notEmpty: true,
            isInt: {
                options: { min: 1, max: 100 }
            },
            errorMessage: 'A capacidade total deve ser um número inteiro entre 1 e 100.'
        },
        statusSala: {
            notEmpty: true,
            isIn: {
                options: [['DISPONIVEL', 'INDISPONIVEL']]
            },
            errorMessage: 'Status da sala inválido.'
        }
    })
};