const http = require("http");
const https = require("https");
const { URL } = require("url");

const Sessao = require("../models/sessao");

const RESERVA_API_BASE_URL =
  process.env.RESERVA_API_BASE_URL || "http://localhost:6999";

const REQUEST_TIMEOUT_MS = 20_000;

function montarUrl(path) {
  const baseUrl = RESERVA_API_BASE_URL.endsWith("/")
    ? RESERVA_API_BASE_URL
    : `${RESERVA_API_BASE_URL}/`;

  return new URL(path.replace(/^\//, ""), baseUrl);
}

function requisitarApiReserva(method, path, body = null) {
  const url = montarUrl(path);
  const transport = url.protocol === "https:" ? https : http;

  const data = body ? JSON.stringify(body) : null;

  const options = {
    method,
    hostname: url.hostname,
    port: url.port || (url.protocol === "https:" ? 443 : 80),
    path: `${url.pathname}${url.search}`,
    headers: {},
  };

  if (data) {
    options.headers["Content-Type"] = "application/json";
    options.headers["Content-Length"] = Buffer.byteLength(data);
  }

  return new Promise((resolve, reject) => {
    const req = transport.request(options, (res) => {
      let responseBody = "";

      res.on("data", (chunk) => {
        responseBody += chunk;
      });

      res.on("end", () => {
        let parsedBody;

        try {
          parsedBody = responseBody ? JSON.parse(responseBody) : null;
        } catch (_error) {
          parsedBody = responseBody;
        }

        resolve({
          statusCode: res.statusCode,
          body: parsedBody,
        });
      });
    });

    req.on("timeout", () => {
      req.destroy(new Error("Timeout ao comunicar com a API de reservas."));
    });

    req.on("error", (error) => {
      reject(error);
    });

    req.setTimeout(REQUEST_TIMEOUT_MS);

    if (data) {
      req.write(data);
    }

    req.end();
  });
}

module.exports = {
  buscarAssentos: async (req, res) => {
    try {
      const { id_sessao } = req.params;

      const respostaReserva = await requisitarApiReserva(
        "GET",
        `/sessoes/${encodeURIComponent(id_sessao)}/assentos`,
      );

      return res.status(respostaReserva.statusCode).json(respostaReserva.body);
    } catch (error) {
      return res.status(500).json({
        erro: "Falha ao buscar assentos na API de reservas.",
        mensagem: error.message,
      });
    }
  },

  criarReserva: async (req, res) => {
    try {
      const { id_sessao } = req.params;
      const { dataFim, dataHoraFim, assentos, id_usuario } = req.body;

      const sessao = await Sessao.findById(id_sessao);

      if (!sessao) {
        return res.status(404).json({
          erro: "Sessão não encontrada na API Catálogo.",
        });
      }

      const dataFinalReserva = dataHoraFim || dataFim || sessao.dataFim;

      const assentosRequisitados =
        assentos && assentos.length > 0 ? assentos : ["A1", "A2"];

      const valorTotal = sessao.valorIngresso * assentosRequisitados.length;

      const payloadReserva = {
        tipoPagamento: req.body.tipoPagamento || "CARTAO",
        numeroCartao: req.body.numeroCartao || "1234-5678-8765-4321",
        cvv: req.body.cvv || "234",
        validade: req.body.validade || "11/31",
        titular: req.body.titular || "Thiago Lima Santos",
        valor: req.body.valor || valorTotal,

        dataHoraFim: dataFinalReserva,
        assentos: assentosRequisitados,
        id_usuario: id_usuario || req.body.id_usuario || "usuario_teste",
        id_filme: String(sessao.idFilme),
        id_sala: String(sessao.idSala),
        horario: sessao.dataInicio,
        valorIngresso: valorTotal,
      };
      const respostaReserva = await requisitarApiReserva(
        "POST",
        `/sessoes/${encodeURIComponent(id_sessao)}/reservas`,
        payloadReserva,
      );

      return res.status(respostaReserva.statusCode).json(respostaReserva.body);
    } catch (error) {
      return res.status(500).json({
        erro: "Falha ao criar reserva na comunicação entre as APIs.",
        mensagem: error.message,
      });
    }
  },

  enviarDados: async (_req, res) => {
    return res.status(200).json({
      mensagem: "Controller de integração ativo.",
      apiReserva: RESERVA_API_BASE_URL,
    });
  },
};
