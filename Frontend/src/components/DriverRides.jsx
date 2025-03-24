import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import driver from "../../public/driver.jpeg";
import axios from "axios";
function DriverRides() {
  const [rides, setRides] = useState();

  const fetchRides = async () => {
    try {
      // Fetch all rides from the API
      const response = await axios.post(
        "http://localhost:3000/driver/rides",
        {
          driver_id: localStorage.getItem("driver_id"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log(response.data);

      // Check if the request was successful
      if (response.status === 200) {
        // Set the filtered rides in the state
        setRides(response.data);
        console.log(rides);
      } else {
        console.log("Failed to fetch rides:", response.data);
      }
    } catch (error) {
      console.error("Error fetching rides:", error);
    }
  };

  useEffect(() => {
    fetchRides();
  }, []);

  return (
    <div
      style={{ backgroundImage: `url(${driver})` }}
      className="min-h-screen bg-no-repeat bg-cover flex flex-col items-center p-10"
    >
      <Sidebar />
      <h1 className="text-4xl font-bold">Recent Rides</h1>

      {rides && (
        <ul className="text-black mt-10 p-5 w-3/4 backdrop-blur-xl mb-10 overflow-y-scroll h-[500px] rounded-lg shadow-lg">
          {rides.map((ride, index) => (
            <li
              key={ride._id}
              className="p-2 border-black w-full flex items-center justify-around font-bold text-xl m-2 shadow-2xl"
            >
              <div className="flex gap-x-6 items-start">
                <p>{index + 1}.</p>
                <div>
                  {/* Display the ride details */}
                  <p>{new Date(ride.date).toLocaleDateString()}</p>
                  <div className="flex gap-x-4">
                    <p>From: {ride.from}</p>
                    <p>To: {ride.to}</p>
                  </div>
                  <p>Seats: {ride.seats}</p>
                </div>
              </div>
              <div className="flex gap-x-2">
                <p>Price: {ride.cost}</p>
              </div>
              {/* Add other details or actions for each ride as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DriverRides;
