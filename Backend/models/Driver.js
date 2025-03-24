const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DriverSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  license: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  rides: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Ride",
      required: true,
    },
  ],
});

module.exports = mongoose.model("Driver", DriverSchema);
