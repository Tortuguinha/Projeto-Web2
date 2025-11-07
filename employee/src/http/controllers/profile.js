function ProfileController(req, res) {
  try {
    res.send("Hello, World");
  } catch (err) {
    const status = err.status || 500;

    res.status(status).json({
      message: err.message || "Ocorreu um erro inesperado.",
    });
  }
}

module.exports = { ProfileController };
