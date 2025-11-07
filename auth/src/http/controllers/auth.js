const { authSchema } = require("../schemas/AuthSchema");
const { MakeAuth } = require("../../use-cases/factories/makeAuth");
const {
  JWTPrismaFactory,
} = require("../../repositories/prisma/JWTPrismaRepository");
const jwt = require("jsonwebtoken");
const { _env } = require("../../lib/env");

async function AuthController(req, res) {
  try {
    const { email, password } = authSchema.parse(req.body);

    const repoFactory = new JWTPrismaFactory();
    const authFactory = MakeAuth(repoFactory);

    // Obtém os dados do usuário através da regra de negócio
    const { user } = await authFactory.exec({
      email,
      password,
    });

    const cookieOptions = {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
    };

    // Cria um token de acesso temporário, apenas pra checagem
    const accessToken = jwt.sign(
      {
        sub: {
          ...user,
          password: undefined,
        },
      },
      _env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Cria um refreshToken para validar os dados no frontend
    const refreshToken = jwt.sign(
      {
        sub: {
          ...user,
          password: undefined,
        },
      },
      _env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Espera o repositório armazenar o refreshToken no banco de dados.
    await repoFactory.createRepository().store({ id: user.id, refreshToken });

    // Cria o cookie do refreshToken
    res.cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    // Cria o cookie do accessToken
    res.cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: 1000 * 60 * 60,
    });

    res.status(200).json({
      auth: true,
      message: "Autenticado",
      ...user,
      password: undefined,
    });
  } catch (err) {
    const status = err.status || 500;

    res.status(status).json({
      message: err.message || "Ocorreu um erro inesperado.",
    });
  }
}

module.exports = { AuthController };
