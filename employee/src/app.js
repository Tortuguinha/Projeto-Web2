const express = require("express");
const { EmployeeRoutes } = require("./http/controllers/routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
    methods: ["GET", "HEAD", "POST", "PATCH", "PUT", "DELETE"],
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/employee", EmployeeRoutes);

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
