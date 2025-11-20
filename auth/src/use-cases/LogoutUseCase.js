class LogoutUseCase {

	#employeeRepository;

	constructor(employeeRepository) {
		this.#employeeRepository = employeeRepository;
	}

	async exec(data) {
		const user = await this.#employeeRepository.findByEmail(data.email);

		if(!user) {
			throw new Error("Este usuário não existe")
		}

		return { user }
	}
}

module.exports = { LogoutUseCase }