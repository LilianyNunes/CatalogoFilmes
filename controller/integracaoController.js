const http = require("http");
const https = require("https");
const { URL } = require("url");

const Filme = require("../models/filme");
const Genero = require("../models/genero");
const Sala = require("../models/sala");
const Sessao = require("../models/sessao");

// ALTERE AQUI PARA TESTES: endpoint externo que recebe os dados do catálogo.
const INTEGRACAO_ENDPOINT =
  process.env.INTEGRACAO_ENDPOINT ||
  "http://10.140.132.141:6999/sessoes/teste/reservas";
const REQUEST_TIMEOUT_MS = 20_000;

function enviarJsonComTimeout(endpoint, body, timeoutMs) {
  const url = new URL(endpoint);
  const data = JSON.stringify(body);
  const transport = url.protocol === "https:" ? https : http;

  const options = {
    method: "POST",
    hostname: url.hostname,
    port: url.port || (url.protocol === "https:" ? 443 : 80),
    path: `${url.pathname}${url.search}`,
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(data),
    },
  };

  return new Promise((resolve, reject) => {
    const req = transport.request(options, (res) => {
      let responseBody = "";

      res.on("data", (chunk) => {
        responseBody += chunk;
      });

      res.on("end", () => {
        const parsedBody = (() => {
          try {
            return JSON.parse(responseBody);
          } catch (_error) {
            return responseBody;
          }
        })();

        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: parsedBody,
        });
      });
    });

    req.on("timeout", () => {
      req.destroy(new Error("Timeout de requisição atingido"));
    });

    req.on("error", (error) => {
      reject(error);
    });

    req.setTimeout(timeoutMs);
    req.write(data);
    req.end();
  });
}

module.exports = {
  enviarDados: async (req, res) => {
    try {
      const [filmes, generos, salas, sessoes] = await Promise.all([
        Filme.find().lean(),
        Genero.find().lean(),
        Sala.find().lean(),
        Sessao.find()
          .populate(
            "idFilme",
            "titulo duracaoMinutos classificacaoIndicativa genero idioma statusExibicao dataLancamento",
          )
          .populate("idSala", "nomeSala capacidadeTotal statusSala")
          .lean(),
      ]);

      const payload = {
        filmes,
        generos,
        salas,
        sessoes,
      };

      const respostaRemota = await enviarJsonComTimeout(
        INTEGRACAO_ENDPOINT,
        payload,
        REQUEST_TIMEOUT_MS,
      );

      return res.status(200).json({
        integracao: {
          endpoint: INTEGRACAO_ENDPOINT,
          timeoutMs: REQUEST_TIMEOUT_MS,
        },
        payloadResumo: {
          filmes: filmes.length,
          generos: generos.length,
          salas: salas.length,
          sessoes: sessoes.length,
        },
        respostaRemota,
      });
    } catch (error) {
      return res.status(500).json({
        erro: "Falha ao enviar dados para o endpoint de integração.",
        mensagem: error.message,
      });
    }
  },
};
