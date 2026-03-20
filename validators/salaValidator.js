const { checkSchema } = require('express-validator');

module.exports = {
    addSala: checkSchema({
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
                options: { min: 1, max: 1000 }
            },
            errorMessage: 'A capacidade total deve ser um número inteiro entre 1 e 1000.'
        },
        tipoSala: {
            notEmpty: true,
            isIn: {
                options: [['2D', '3D']]
            },
            errorMessage: 'O tipo da sala deve ser 2D ou 3D.'
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