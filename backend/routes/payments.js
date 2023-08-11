const express = require("express");
const router = express.Router();
const stripe = require("stripe")(
  "sk_test_51NdcsKSBL2yANXaz2BeOxDkbaY5ha9YPEtNoNaX2CoeNp4wy4uKYriBvqxOarb8LNtOHzTWQkuJGOSWDq8jMvPvJ00qKr7elcF"
);
const PlanData = require("../models/PlanData");

router.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

router.post("/create-payment", async (req, res, next) => {
  const planName = req.body.selectedPlan;
  const duration = req.body.duration;

  try {
    const plan = await PlanData.findOne({ "Plan Name": planName });
    if (!plan) {
      const error = new Error("This plan does not exists");
      error.statusCode = 404;
      throw error;
    }

    const totalAmount = plan["Pricing"][duration]["Price"].split(" ")[0];

    const paymentIntent = await stripe.paymentIntents.create({
      currency: "INR",
      amount: totalAmount * 100,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
});

module.exports = router;
