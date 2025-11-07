const { CredentialsUseCase } = require("../CredentialsUseCase");

function MakeCredentials(userPrismaFactory) {
  const userRepos = userPrismaFactory.createRepository();
  const crendentials = new CredentialsUseCase(userRepos);

  return crendentials;
}

module.exports = { MakeCredentials };
