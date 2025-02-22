const express = require("express");
const { authenticate } = require("../Middlewares/User-middleware");
const {
  createRide,
  deleteRide,
  getAllRides,
  UpdateRide,
} = require("../Controllers/Ride-controllers");

const rideRouter = express.Router();

rideRouter.post("/create", authenticate, createRide);
rideRouter.post("/delete", authenticate, deleteRide);
rideRouter.get("/all", authenticate, getAllRides);
rideRouter.post("/add", authenticate, UpdateRide);

module.exports = rideRouter;
