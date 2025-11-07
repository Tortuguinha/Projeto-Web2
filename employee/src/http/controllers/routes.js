const { Router } = require("express");
const { RegisterController } = require("./register");
const { CredentialsController } = require("./credentials");

const router = Router();

/** Employee External */
router.post("/register", RegisterController);

/** Internal */
router.get("/internal/credentials", CredentialsController);

/** Test routes */
router.get("/test", (req, res) => {
  res.send("Employee is working!");
});

module.exports = {
  EmployeeRoutes: router,
};
