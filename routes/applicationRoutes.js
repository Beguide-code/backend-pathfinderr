const { Router } = require("express");
const applicationRouter = Router();
const { protect } = require("../middleware/authMiddleware");
const applicationController = require("../controllers/applicationController");

applicationRouter.use(protect);

applicationRouter.post("/",applicationController.createApplication);
applicationRouter.get("/",applicationController.getStudentApplications);
applicationRouter.put("/:id",applicationController.updateApplication);
applicationRouter.delete("/:id",applicationController.deleteApplication);

module.exports = applicationRouter;