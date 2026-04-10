const { checkSchema } = require('express-validator');

module.exports = {
    addSala: checkSchema({
        nomeSala: {
            notEmpty: {
                errorMessage: 'O nome da sala é obrigatório.'
            },
            trim: true,
            isLength: {
                options: { min: 1, max: 50 },
                errorMessage: 'O nome da sala deve ter entre 1 e 50 caracteres.'
            }
        },
        capacidadeTotal: {
            notEmpty: {
                errorMessage: 'A capacidade total é obrigatória.'
            },
            isInt: {
                options: { min: 1, max: 500 },
                errorMessage: 'A capacidade total deve ser um número inteiro entre 1 e 500.'
            },
            toInt: true
        },
        statusSala: {
            optional: { options: { nullable: true } },
            isIn: {
                options: [['ATIVA', 'INATIVA', 'MANUTENCAO']],
                errorMessage: 'Status inválido. Use: ATIVA, INATIVA ou MANUTENCAO.'
            }
        }
    })
};