const { registerSchema } = require("../schemas/RegisterSchema");
const {
  PrismaEmployeeFactory,
} = require("../../repositories/prisma/PrismaEmployeeRepos");

const { MakeRegister } = require("../../use-cases/factories/makeRegister");

async function RegisterController(req, res) {
  try {
    const { name, cpf, email, password } = registerSchema.parse(req.body);

    const repoFactory = new PrismaEmployeeFactory();
    const registerFactory = MakeRegister(repoFactory);

    // Registra os dados requisitados pelo usuário no frontend
    await registerFactory.exec({
      name,
      cpf,
      email,
      password,
    });

    res.status(201).json({
      message: "Usuário criado com sucesso!",
    });
  } catch (err) {
    const status = err.status || 500;

    res.status(status).json({
      message: err.message || "Ocorreu um erro inesperado.",
    });
  }
}

module.exports = { RegisterController };
