const studentController = require("../controllers/studentController");
const { Router } = require("express");
const studentRouter = Router();

studentRouter.post("/register",studentController.registerStudent);
studentRouter.put("/:id",studentController.updateStudentProfile);
studentRouter.get("/:id",studentController.getStudentProfile);


module.exports = studentRouter;