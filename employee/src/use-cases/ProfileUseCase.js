class ProfileUseCase {
  #employeePrismaRepository;

  constructor(employeePrismaRepository) {
    this.#employeePrismaRepository = employeePrismaRepository;
  }

  async exec() {}
}
