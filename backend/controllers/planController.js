const PlanData = require("../models/PlanData");

exports.getPlans = async (req, res, next) => {
  const allPlans = await PlanData.find({});
  res.status(202).json({ allPlans });
};
