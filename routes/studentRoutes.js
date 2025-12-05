const studentController = require("../controllers/studentController");
const { Router } = require("express");
const studentRouter = Router();
const { protect } = require("../middleware/authMiddleware")

studentRouter.post("/register",studentController.registerStudent);
studentRouter.put("/:id",protect,studentController.updateStudentProfile);
studentRouter.get("/:id",protect,studentController.getStudentProfile);


module.exports = studentRouter;