const express = require("express");
const { authenticate } = require("../Middlewares/User-middleware");
const {
  createRide,
  deleteRide,
  getAllRides,
  UpdateRide,
} = require("../Controllers/Ride-controllers");
const Ride = require("../models/Ride");

const rideRouter = express.Router();

// Create a new ride
rideRouter.post("/create", authenticate, createRide);

// Delete a ride
rideRouter.post("/delete", authenticate, deleteRide);

// Get all rides
rideRouter.get("/all", authenticate, getAllRides);

// Get rides for a specific driver
rideRouter.get("/driver/:driverId", authenticate, async (req, res) => {
  try {
    const rides = await Ride.find({ driver: req.params.driverId })
      .sort({ date: 1 });
    res.json(rides);
  } catch (err) {
    console.error("Error fetching driver rides:", err);
    res.status(500).json({ error: "Failed to fetch rides" });
  }
});

// Update a ride (add user to ride)
rideRouter.post("/update", authenticate, UpdateRide);

module.exports = rideRouter;
