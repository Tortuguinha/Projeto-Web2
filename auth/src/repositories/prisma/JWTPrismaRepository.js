const { prisma } = require("../../lib/prisma");
const employeeAPI = require("../../api/employeeApi");

class JWTPrismaRepository {
  async remove() {}

  async store(data) {
    // Armazena apenas os dados de token
    try {
      const session = await prisma.authSession.create({
        data: {
          employeeId: data.id,
          refreshToken: data.refreshToken,
          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        },
      });

      return session;
    } catch (err) {
      console.error(err);
    }
  }

  async findByEmail(value) {
    /**
     * Checa se o e-mail é existente através da requisição.
     * caso seja, retorna os dados do usuário.
     * */
    try {
      const user = await employeeAPI.findEmail(value.email);

      if (!user) return null;

      return user;
    } catch (err) {
      console.error(err);
    }
  }
}

class JWTPrismaFactory {
  // Cria uma instância do JWTPrismaRepository para ser utilizado externamente.
  createRepository() {
    return new JWTPrismaRepository();
  }
}

module.exports = { JWTPrismaFactory };
