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

function validarAssentos(assentos) {
  if (!Array.isArray(assentos) || assentos.length === 0) {
    return "O campo assentos deve ser uma lista com pelo menos um assento.";
  }

  const regexAssento = /^[A-E](10|[1-9])$/;

  const assentosInvalidos = assentos.filter(
    (assento) => !regexAssento.test(assento),
  );

  if (assentosInvalidos.length > 0) {
    return `Assentos inválidos: ${assentosInvalidos.join(", ")}. Use de A1 até E10.`;
  }

  const assentosUnicos = new Set(assentos);

  if (assentosUnicos.size !== assentos.length) {
    return "A lista de assentos possui valores repetidos.";
  }

  return null;
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

      const erroAssentos = validarAssentos(assentos);

      if (erroAssentos) {
        return res.status(400).json({
          erro: erroAssentos,
        });
      }

      const sessao = await Sessao.findById(id_sessao);

      if (!sessao) {
        return res.status(404).json({
          erro: "Sessão não encontrada na API Catálogo.",
        });
      }

      const dataFinalReserva = dataHoraFim || dataFim || sessao.dataFim;

      if (!dataFinalReserva) {
        return res.status(400).json({
          erro: "Informe dataFim ou dataHoraFim para criar a reserva.",
        });
      }

      const payloadReserva = {
        dataHoraFim: dataFinalReserva,
        assentos,
        id_usuario: id_usuario || "usuario_teste",
        id_filme: String(sessao.idFilme),
        id_sala: String(sessao.idSala),
        horario: sessao.dataInicio,
      };

      const respostaReserva = await requisitarApiReserva(
        "POST",
        `/sessoes/${encodeURIComponent(id_sessao)}/reservas`,
        payloadReserva,
      );

      return res.status(respostaReserva.statusCode).json({
        mensagem: "Comunicação com API de reservas realizada.",
        enviadoParaReserva: payloadReserva,
        respostaReserva: respostaReserva.body,
      });
    } catch (error) {
      return res.status(500).json({
        erro: "Falha ao criar reserva na API de reservas.",
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
