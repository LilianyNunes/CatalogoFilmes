const { checkSchema } = require('express-validator');

module.exports = {
    addFilme: checkSchema({
        titulo: {
            notEmpty: {
                errorMessage: 'Título é obrigatório.'
            },
            trim: true
        },
        sinopse: {
            notEmpty: {
                errorMessage: 'Sinopse é obrigatória.'
            },
            trim: true
        },
        duracaoMinutos: {
            notEmpty: {
                errorMessage: 'Duração é obrigatória.'
            },
            isInt: {
                options: { min: 1 },
                errorMessage: 'Duração deve ser um número inteiro maior que zero.'
            },
            toInt: true
        },
        // ✅ Agora valida apenas os valores permitidos
        classificacaoIndicativa: {
            notEmpty: {
                errorMessage: 'Classificação indicativa é obrigatória.'
            },
            trim: true,
            isIn: {
                options: [['Livre', '10', '12', '14', '16', '18']],
                errorMessage: 'Classificação inválida. Use: Livre, 10, 12, 14, 16 ou 18.'
            }
        },
        // ✅ isMongoId garante que é um ObjectId válido do MongoDB
        genero: {
            notEmpty: {
                errorMessage: 'Gênero é obrigatório.'
            },
            isMongoId: {
                errorMessage: 'ID de gênero inválido. Deve ser um ObjectId do MongoDB.'
            }
        },
        idioma: {
            notEmpty: {
                errorMessage: 'Idioma é obrigatório.'
            },
            trim: true,
            isIn: {
                options: [['dublado', 'legendado', 'original']],
                errorMessage: 'Idioma inválido. Use: dublado, legendado ou original.'
            }
        },
        statusExibicao: {
            optional: { options: { nullable: true } },
            isIn: {
                options: [['EM_CARTAZ', 'EM_BREVE', 'INDISPONIVEL']],
                errorMessage: 'Status de exibição inválido. Use: EM_CARTAZ, EM_BREVE ou INDISPONIVEL.'
            }
        },
        dataLancamento: {
            notEmpty: {
                errorMessage: 'Data de lançamento é obrigatória.'
            },
            isISO8601: {
                errorMessage: 'Data de lançamento inválida. Use o formato ISO 8601 (ex: 2024-12-25).'
            },
            toDate: true
        }
    })
};