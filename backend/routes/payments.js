const express = require("express");
const router = express.Router();
const stripe = require("stripe")(
  "sk_test_51NdcsKSBL2yANXaz2BeOxDkbaY5ha9YPEtNoNaX2CoeNp4wy4uKYriBvqxOarb8LNtOHzTWQkuJGOSWDq8jMvPvJ00qKr7elcF"
);

router.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

router.post("/create-payment", async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    currency: "inr",
    amount: 100,
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({ clientSecret: paymentIntent.client_secret });
});

module.exports = router;
