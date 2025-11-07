const { Router } = require("express");
const { RegisterController } = require("./register");
const { CredentialsController } = require("./credentials");
const { ProfileController } = require("./profile");
const { internalCrendetials } = require("../middlewares/internalCredentials");
const { verifyJwt } = require("../middlewares/jwt/verifyJwt");

const router = Router();

/** Employee External */
router.post("/register", RegisterController);
router.get("/profile", [verifyJwt], ProfileController);

/** Internal */
router.get(
  "/internal/credentials",
  [internalCrendetials],
  CredentialsController
);

/** Test routes */
router.get("/test", (req, res) => {
  res.send("Employee is working!");
});

module.exports = {
  EmployeeRoutes: router,
};
