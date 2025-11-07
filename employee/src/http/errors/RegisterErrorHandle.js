class EmployeeAlreadyExists extends Error {
  constructor() {
    super();
    this.status = 409;
    this.message = "Empregado já existente";
    this.name = "EmployeeAlreadyExists";
  }
}

module.exports = { EmployeeAlreadyExists };
