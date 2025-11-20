const { Router } = require("express");
const { AuthController } = require("./auth");
const { LogoutController } = require("./logout");
const { verifyJwt } = require("../middleware/jwt/verifyJwt")

const router = Router();

router.post("/login", AuthController);
router.post("/logout", verifyJwt, LogoutController);

router.get("/test", (req, res) => {
  res.send("Auth is working!");
});

module.exports = {
  AuthRoutes: router,
};
