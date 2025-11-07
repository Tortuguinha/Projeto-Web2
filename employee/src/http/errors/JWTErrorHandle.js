class InvalidCookie extends Error {
  constructor() {
    super("Cookie inválido");
    this.name = "InvalidCookie";
    this.status = 401;
  }
}

class NotFoundError extends Error {
  constructor() {
    super("Nenhum registro encontrado");
    this.name = "NotFoundError";
    this.status = 404;
  }
}

module.exports = { InvalidCookie, NotFoundError };
