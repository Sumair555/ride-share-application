const Driver = require("../models/Driver");
const Ride = require("../models/Ride");
const User = require("../models/User");

const createRide = async (req, res) => {
  try {
    const { driverId, from, to, date, seats, cost } = req.body;
    console.log(req.body);
    const driver = await Driver.findById(driverId);
    if (!driver) {
      return res.status(404).json({ error: "Driver not found" });
    }
    // console.log(driver);
    const _date = new Date(date);
    const newRide = new Ride({
      from,
      to,
      date: _date,
      seats,
      cost: cost,
      available: true,
      driver: driver._id,
    });

    await newRide.save();

    driver.rides.push(newRide._id);

    await driver.save();

    res.status(201).json(newRide);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
// const deleteRide = async (req, res) => {
//   try {
//     const { id } = req.body;

//     try {
//       const result = await Ride.findByIdAndDelete(id);
//       if (!result) {
//         return res
//           .status(404)
//           .json({ success: false, message: "Ride not found" });
//       }
//     } catch (err) {
//       return res.status(404).json({ error: "ride doesn't exist" });
//     }

//     return res
//       .status(200)
//       .json({ success: true, message: "Ride deleted successfully" });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({
//       success: false,
//       message: "An error occurred while deleting the Ride",
//     });
//   }
// };

const deleteRide = async (req, res) => {
  try {
    // Extract the ride ID from the request body
    const { id } = req.body;

    // Find the ride by its ID
    const ride = await Ride.findById(id);
    if (!ride) {
      // If the ride is not found, return a 404 error
      return res
        .status(404)
        .json({ success: false, message: "Ride not found" });
    }

    // Find the associated driver using the ride's driver reference
    const driver = await Driver.findById(ride.driver);
    if (driver) {
      // Remove the ride ID from the driver's rides array
      driver.rides.pull(ride._id);
      // Save the updated driver document
      await driver.save();
    }

    // Delete the ride
    await Ride.findByIdAndDelete(id);

    // Respond with a success message
    return res
      .status(200)
      .json({ success: true, message: "Ride deleted successfully" });
  } catch (err) {
    // Handle any errors
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the ride",
    });
  }
};

const getAllRides = async (req, res) => {
  try {
    const rides = await Ride.find();
    if (!rides) {
      return res.status(204).json({ message: "no rides found" });
    }
    return res.status(200).json(rides);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "An error occurred while getting all the Ride",
    });
  }
};
const UpdateRide = async (req, res) => {
  try {
    const { ride_id, user_id, seats } = req.body;

    // Validate seats to be a positive integer
    if (seats <= 0) {
      return res
        .status(400)
        .json({ message: "Invalid number of seats requested" });
    }

    // Find the ride and user
    const ride = await Ride.findById(ride_id);
    const user = await User.findById(user_id);

    // Check if ride and user exist
    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if there are enough seats available
    if (ride.seats < seats) {
      return res.status(400).json({ message: "Not enough seats available" });
    }

    // Add the user ID to the ride's user list
    ride.User.push(user_id);

    // Update the available seats in the ride
    ride.seats -= seats;

    // Save the ride
    await ride.save();

    // Add the ride ID to the user's rides list
    user.rides.push(ride_id);

    // Save the user
    await user.save();

    return res.status(200).json({ message: "Successfully saved the ride" });
  } catch (err) {
    // Log the error for debugging purposes
    console.error(err);

    // Return a generic error message
    return res
      .status(500)
      .json({ message: "An error occurred while updating the ride" });
  }
};

module.exports = { createRide, deleteRide, getAllRides, UpdateRide };
