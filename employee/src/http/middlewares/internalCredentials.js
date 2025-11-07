const { _env } = require("../../lib/env");
const {
  InvalidTokenError,
  TokenNotProvidedError,
} = require("../errors/CredentialsErrorHandle");

const internalCrendetials = (req, res, next) => {
  try {
    //Pega o token dado na requisição.
    const token = req.headers["x-internal-token"];

    // Se nao houver token, retorna o erro.
    if (!token) {
      throw new TokenNotProvidedError();
    }

    // Se o token não for igual ao SECRET no .env, retorna o erro.
    if (token !== _env.INTERNAL_SECRET_KEY) {
      throw new InvalidTokenError();
    }

    next();
  } catch (error) {
    res.status(error.status || 401).json({ message: error.message });
  }
};

module.exports = { internalCrendetials };
