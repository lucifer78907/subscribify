const express = require("express");
const router = express.Router();
const planController = require("../controllers/planController");

router.get("/plans", planController.getPlans);

router.get("/plans/:userId", planController.getUserPlan);

router.get("/plan/:planName", planController.getPlan);

router.post("/plans/:userId/:planName/:duration", planController.postPlan);

module.exports = router;
