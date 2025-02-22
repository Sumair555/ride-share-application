const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RideSchema = new Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
    required: true,
  },
  driver: {
    type: mongoose.Types.ObjectId,
    ref: "Driver",
    required: true,
  },
  User: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
});

module.exports = mongoose.model("Ride", RideSchema);
