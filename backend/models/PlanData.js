const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlanSchema = Schema({
  "Plan Name": {
    type: String,
    required: true,
  },
  Pricing: {
    Monthly: {
      Price: {
        type: String,
        required: true,
      },
    },
    Yearly: {
      Price: {
        type: String,
        required: true,
      },
    },
  },
  Details: {
    "Video quality": String,
    Resolution: String,
    Devices: [String],
    "Number of active screens": Number,
  },
});

module.exports = mongoose.model("Plans", PlanSchema);
