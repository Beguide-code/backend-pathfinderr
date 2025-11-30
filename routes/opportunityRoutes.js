const { Router } = require("express");
const opportunityRouter = Router();
const opportunityController = require("../controllers/opportunityController");

opportunityRouter.get("/search",opportunityController.getOpportunitiesByFilters);
opportunityRouter.get("/:id",opportunityController.getOpportunityById);
opportunityRouter.get("/",opportunityController.getOpportunities);


module.exports = opportunityRouter;