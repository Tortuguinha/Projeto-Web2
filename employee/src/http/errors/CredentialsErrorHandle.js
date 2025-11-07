class EmployeeDoesntExists extends Error {
  constructor() {
    super();
    this.status = 404;
    this.message = "Empregado não existe";
    this.name = "EmployeeDoesntExists";
  }
}

class InvalidTokenError extends Error {
  constructor() {
    super("Token interno inválido");
    this.name = "InvalidTokenError";
    this.status = 404;
  }
}

class TokenNotProvidedError extends Error {
  constructor() {
    super("Token interno não fornecido");
    this.name = "TokenNotProvidedError";
    this.status = 404;
  }
}

module.exports = {
  EmployeeDoesntExists,
  InvalidTokenError,
  TokenNotProvidedError,
};
