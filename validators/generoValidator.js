const { checkSchema } = require('express-validator');

module.exports = {
    addGenero: checkSchema({
        nomeGenero: {
            notEmpty: {
                errorMessage: 'O nome do gênero é obrigatório.'
            },
            trim: true,
            isLength: {
                options: { min: 3, max: 50 },
                errorMessage: 'O nome do gênero deve ter entre 3 e 50 caracteres.'
            }
        },
        descricao: {
            optional: { options: { nullable: true } },
            trim: true,
            isLength: {
                options: { max: 255 },
                errorMessage: 'A descrição pode ter no máximo 255 caracteres.'
            }
        }
    })
};