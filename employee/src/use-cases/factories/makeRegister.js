const { RegisterUseCase } = require("../RegisterUseCase");

function MakeRegister(userPrismaFactory) {
  const userRepos = userPrismaFactory.createRepository();
  const register = new RegisterUseCase(userRepos);

  return register;
}

module.exports = { MakeRegister };
