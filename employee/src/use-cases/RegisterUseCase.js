const { hashPwd } = require("../utils/hashPwd");
const { EmployeeAlreadyExists } = require("../http/errors/RegisterErrorHandle");

class RegisterUseCase {
  #employeePrismaRepository;

  constructor(employeePrismaRepository) {
    this.#employeePrismaRepository = employeePrismaRepository;
  }

  async exec(data) {
    // Verifica se o usuário existe através do CPF
    const userAlreadyExists = await this.#employeePrismaRepository.findByCPF({
      cpf: data.cpf,
    });

    // Se já existe, retorna o erro.
    if (userAlreadyExists) {
      throw new EmployeeAlreadyExists();
    }

    // Criptografa a senha do usuário
    const hashedPwd = await hashPwd(data.password);

    // Salva os dados (incluindo a senha criptografada) no banco de dados
    const user = await this.#employeePrismaRepository.save({
      ...data,
      password: hashedPwd,
    });

    // Retorna os dados do usuário
    return { user };
  }
}

module.exports = {
  RegisterUseCase,
};
