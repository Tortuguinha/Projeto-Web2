const { prisma } = require("../../lib/prisma");

class PrismaEmployeeRepos {
  async save(data) {
    // Registra o usuário no banco de dados
    try {
      const employee = await prisma.employee.create({
        data,
      });

      return employee;
    } catch (err) {
      console.error(err);
    }
  }

  async findByCPF(value) {
    // Procura o usuário através do CPF
    try {
      const employee = await prisma.employee.findUnique({
        where: {
          cpf: value.cpf,
        },
      });

      return employee;
    } catch (err) {
      console.error(err);
    }
  }

  async findByEmail(value) {
    //Procura o usuário através do e-mail
    const employee = await prisma.employee.findUnique({
      where: {
        email: value.email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });

    return employee;
  }
}

class PrismaEmployeeFactory {
  createRepository() {
    return new PrismaEmployeeRepos();
  }
}

module.exports = { PrismaEmployeeFactory };
