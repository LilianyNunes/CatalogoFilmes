const { checkSchema } = require('express-validator');

module.exports = {
    addSessao: checkSchema({
        // ✅ isMongoId valida ObjectId do MongoDB
        idFilme: {
            notEmpty: {
                errorMessage: 'idFilme é obrigatório.'
            },
            isMongoId: {
                errorMessage: 'idFilme inválido. Deve ser um ObjectId do MongoDB.'
            }
        },
        // ✅ isMongoId valida ObjectId do MongoDB
        idSala: {
            notEmpty: {
                errorMessage: 'idSala é obrigatório.'
            },
            isMongoId: {
                errorMessage: 'idSala inválido. Deve ser um ObjectId do MongoDB.'
            }
        },
        dataSessao: {
            notEmpty: {
                errorMessage: 'A data da sessão é obrigatória.'
            },
            isISO8601: {
                errorMessage: 'Data inválida. Use o formato ISO 8601 (ex: 2024-12-25).'
            },
            toDate: true
        },
        horarioInicio: {
            notEmpty: {
                errorMessage: 'O horário de início é obrigatório.'
            },
            matches: {
                options: [/^([01]\d|2[0-3]):([0-5]\d)$/],
                errorMessage: 'Horário de início inválido. Use o formato HH:MM (ex: 14:30).'
            }
        },
        horarioFim: {
            notEmpty: {
                errorMessage: 'O horário de fim é obrigatório.'
            },
            matches: {
                options: [/^([01]\d|2[0-3]):([0-5]\d)$/],
                errorMessage: 'Horário de fim inválido. Use o formato HH:MM (ex: 16:30).'
            }
        },
        valorIngresso: {
            notEmpty: {
                errorMessage: 'O valor do ingresso é obrigatório.'
            },
            isFloat: {
                options: { min: 0.01 },
                errorMessage: 'O valor do ingresso deve ser maior que zero.'
            },
            toFloat: true
        },
        statusSessao: {
            optional: { options: { nullable: true } },
            isIn: {
                options: [['DISPONIVEL', 'CANCELADA', 'ENCERRADA']],
                errorMessage: 'Status inválido. Use: DISPONIVEL, CANCELADA ou ENCERRADA.'
            }
        }
        // ❌ assento REMOVIDO — gerenciado pelo Grupo B
    })
};