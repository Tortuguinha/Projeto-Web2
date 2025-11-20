const { jwtVerifySchema } = require("../../schemas/JWTVerifySchema");
const { _env } = require("../../../lib/env");
const jwt = require("jsonwebtoken");

/**
 * Faz a verificação do Token vinda do frontend
 * quando uma rota privada é acessada e essa
 * requisita dados sensíveis.
 * */
const verifyJwt = (req, res, next) => {
  try {
    const result = jwtVerifySchema.safeParse(req.cookies); // Captura o cookie

    if (!result.success) {
      // Se não houver cookie retorna o erro
      throw new Error("Invalid cookie");
    }

    // Busca o token de acesso
    const { accessToken } = result.data;

    // Verifica se o token é válido
    const userData = jwt.verify(accessToken, _env.JWT_SECRET, {
      complete: true,
    });

    // Caso não haja dados, retorna o erro.
    if (!userData) {
      throw new Error("Nenhum dado encontrado");
    }

    // req.user recebe os dados do usuário e pode ser utilizado à frente
    req.user = userData;

    next();
  } catch (error) {
    res.status(error.status || 401).json({ message: error.message });
  }
};

module.exports = { verifyJwt };
