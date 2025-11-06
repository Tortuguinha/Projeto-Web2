const { hashPwd } = require("../utils/hashPwd");

class RegisterUseCase {
  #userPrismaRepository;

  constructor(userPrismaRepository) {
    this.#userPrismaRepository = userPrismaRepository;
  }

  async exec(data) {
    // Verifica se o usuário existe através do CPF
    const userAlreadyExists = await this.#userPrismaRepository.findByCPF(
      data.cpf
    );

    // Se já existe, retorna o erro.
    if (userAlreadyExists) {
      throw new Error("O usuário já existe");
    }

    // Criptografa a senha do usuário
    const hashedPwd = await hashPwd(data.password);

    // Salva os dados (incluindo a senha criptografada) no banco de dados
    const user = await this.#userPrismaRepository.save({
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
