const {
  EmployeeDoesntExists,
} = require("../http/errors/CredentialsErrorHandle");

class CredentialsUseCase {
  #employeePrismaRepository;

  constructor(employeePrismaRepository) {
    this.#employeePrismaRepository = employeePrismaRepository;
  }

  async exec(data) {
    // Verifica, no banco de dados, se o usuário existe através do e-mail.
    const user = await this.#employeePrismaRepository.findByEmail({
      email: data.email,
    });

    if (!user) {
      // Se não existe, retorna o erro.
      throw new EmployeeDoesntExists();
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      hashPwd: user.password,
    };
  }
}

module.exports = { CredentialsUseCase };
