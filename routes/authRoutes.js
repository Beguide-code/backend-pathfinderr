const { Router } = require("express");
const authRouter = Router();
const authController = require("../controllers/authController");
const {protect} = require("../middleware/authMiddleware");

authRouter.post("/login",authController.loginStudent);
authRouter.get("/me",protect,authController.getMe);

module.exports = authRouter;