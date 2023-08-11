const PlanData = require("../models/PlanData");
const User = require("../models/User");

exports.getPlans = async (req, res, next) => {
  const allPlans = await PlanData.find({});
  res.status(202).json({ allPlans });
};

exports.getPlan = async (req, res, next) => {
  const planName = req.params.planName;
  const plan = await PlanData.find({ "Plan Name": planName });
  res.status(200).json(plan);
};

exports.getUserPlan = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    let user = await User.findById(userId);
    if (!user) {
      const error = new Error("Could not find user");
      error.statusCode = 404;
      throw error;
    }
    const plan = await PlanData.findOne({
      "Plan Name": user.plan["Plan Name"],
    });
    const details = {
      updatedAt: user.updatedAt,
      planDuration: user.planDuration,
      plan,
    };
    res
      .status(200)
      .json({ message: "Successfully retrived the data", data: details });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postPlan = async (req, res, next) => {
  const userId = req.params.userId;
  const planName = req.params.planName;
  const duration = req.params.duration;

  try {
    let user = await User.findById(userId);
    if (!user) {
      const error = new Error("Could not find user");
      error.statusCode = 404;
      throw error;
    }
    let plan = await PlanData.findOne({ "Plan Name": planName });
    await User.findByIdAndUpdate(userId, {
      plan: plan,
      planDuration: duration,
    });
    res.status(200).json({ message: "Update successful" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deletePlan = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    let user = await User.findById(userId);
    if (!user) {
      const error = new Error("Could not find user");
      error.statusCode = 404;
      throw error;
    }
    user.plan = null;
    user.planDuration = null;
    await user.save();
    res
      .status(200)
      .json({ message: "Successfully cleared plan data", status: 200 });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
