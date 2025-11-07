const { credentialsSchema } = require("../schemas/CredentialsSchema");
const {
  PrismaEmployeeFactory,
} = require("../../repositories/prisma/PrismaEmployeeRepos");
const {
  MakeCredentials,
} = require("../../use-cases/factories/makeCredentials");

async function CredentialsController(req, res) {
  try {
    const { email } = credentialsSchema.parse(req.query);

    const repoFactory = new PrismaEmployeeFactory();
    const credentialsFactory = MakeCredentials(repoFactory);

    // Retorna os dados através do e-mail vindo da requisição
    const data = await credentialsFactory.exec({ email });

    res.status(200).json(data);
  } catch (err) {
    const status = err.status || 500;

    res.status(status).json({
      message: err.message || "Ocorreu um erro inesperado.",
    });
  }
}

module.exports = { CredentialsController };
