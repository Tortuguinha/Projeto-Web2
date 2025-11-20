const { LogoutUseCase } = require("../LogoutUseCase")

function MakeLogout(employeePrismaFactory) {
	const userRepo = employeePrismaFactory.createRepository();
	const logout = new LogoutUseCase(userRepo)

	return logout;
}

module.exports = { MakeLogout }