const express = require("express");
const router = express.Router();
const planController = require("../controllers/planController");

router.get("/plans", planController.getPlans);

module.exports = router;
