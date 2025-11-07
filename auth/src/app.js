const express = require("express");
const { AuthRoutes } = require("./http/controllers/routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", AuthRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    message: "Rota não encontrada",
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json("Algo deu errado!");
});

module.exports = {
  AppServer: app,
};
