// import React from "react";
// import driver from "../../public/driver.jpeg";
// import Sidebar from "./Sidebar";
// function DriverDashboard() {
//   return (
//     <div
//       className={`flex flex-col items-center min-h-screen bg-no-repeat bg-cover outline-none`}
//       style={{ backgroundImage: `url(${driver})` }}
//     >
//       <Sidebar />
//       <h1 className="text-5xl font-bold pt-5 text-black">Dashboard</h1>

//       {/* form */}
//       <div className=" mt-10 backdrop-blur-xl rounded-xl shadow-xl p-10 w-1/3">
//         <form name="max-w-sm mx-auto">
//           <div className="flex justify-between">
//             <div className="mb-5">
//               <label
//                 htmlFor="from"
//                 className="block mb-2 text-sm font-medium text-black"
//               >
//                 From
//               </label>
//               <input
//                 type="string"
//                 id="from"
//                 className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
//                 required
//               />
//             </div>
//             <div className="mb-5">
//               <label
//                 htmlFor="to"
//                 className="block mb-2 text-sm font-medium text-black "
//               >
//                 To
//               </label>
//               <input
//                 type="string"
//                 id="to"
//                 className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
//                 required
//               />
//             </div>
//           </div>

//           <div className="mb-5">
//             <label
//               htmlFor="date"
//               className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
//             >
//               Date
//             </label>
//             <input
//               type="date"
//               id="date"
//               className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
//               required
//             />
//           </div>

//           <div className="flex justify-between">
//             <div className="mb-5">
//               <label
//                 htmlFor="seats"
//                 className="block mb-2 text-sm font-medium text-black"
//               >
//                 Seats
//               </label>
//               <input
//                 type="number"
//                 id="seats"
//                 className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
//                 required
//               />
//             </div>
//             <div className="mb-5">
//               <label
//                 htmlFor="price"
//                 className="block mb-2 text-sm font-medium text-black "
//               >
//                 Price
//               </label>
//               <input
//                 type="string"
//                 id="price"
//                 className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
//                 required
//               />
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
//           >
//             Save
//           </button>
//         </form>
//       </div>

//       <ul className="text-black mt-10  p-5 w-3/4 backdrop-blur-xl mb-10 overflow-y-scroll  h-[200px] rounded-lg shadow-lg">
//         <li className="p-2 border-black  w-full flex items-center justify-around font-bold text-xl m-2 shadow-2xl">
//           <div className="flex gap-x-6 items-start">
//             <p>1.</p>
//             <div>
//               <p>11/11/11</p>
//               <div className="flex gap-x-4">
//                 <p>from : guntur </p>
//                 <p>to : vijayawada</p>
//               </div>
//               <p>seats : 5 </p>
//             </div>
//           </div>
//           <div className="flex gap-x-2">
//             <p>price</p>
//           </div>
//           <button className="bg-red-600 text-white px-4 py-1 rounded-lg">
//             🗑️
//           </button>
//         </li>
//       </ul>
//     </div>
//   );
// }

// export default DriverDashboard;

import React, { useEffect, useState } from "react";
import axios from "axios";
import driver from "../../public/driver.jpeg";
import Sidebar from "./Sidebar";

function DriverDashboard() {
  // Define state variables
  const [rides, setRides] = useState();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [seats, setSeats] = useState("");
  const [price, setPrice] = useState("");


  const driverId = localStorage.getItem("driver_id"); // Assuming you have the driver's ID stored in localStorage

  // Fetch all rides and filter by the driver's ID
  // useEffect(() => {
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


  // Function to handle creating a ride
  const handleCreateRide = async (e) => {
    e.preventDefault();

    // Create a new ride
    try {
      const response = await axios.post(
        "http://localhost:3000/ride/create",
        {
          driverId: driverId, // Include driver's ID in the request
          from,
          to,
          date,
          seats,
          cost: price,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.status === 201) {
        console.log("Ride created successfully:", response.data);
        // Reset the form inputs
        setFrom("");
        setTo("");
        setDate("");
        setSeats("");
        setPrice("");
        fetchRides();
        // Fetch updated rides after creating a new ride
      } else {
        console.log("Failed to create ride:", response.data);
      }
    } catch (error) {
      console.error("Error creating ride:", error);
    }
  };

  return (
    <div
      className={`flex flex-col items-center min-h-screen bg-no-repeat bg-cover outline-none`}
      style={{ backgroundImage: `url(${driver})` }}
    >
      <Sidebar />
      <h1 className="text-5xl font-bold pt-5 text-black">Dashboard</h1>

      {/* Form for creating a ride */}
      <div className="mt-10 backdrop-blur-xl rounded-xl shadow-xl p-10 w-1/3">
        <form onSubmit={handleCreateRide}>
          <div className="flex justify-between">
            <div className="mb-5">
              <label
                htmlFor="from"
                className="block mb-2 text-sm font-medium text-black"
              >
                From
              </label>
              <input
                type="text"
                id="from"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="to"
                className="block mb-2 text-sm font-medium text-black "
              >
                To
              </label>
              <input
                type="text"
                id="to"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
              />
            </div>
          </div>

          <div className="mb-5">
            <label
              htmlFor="date"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
          </div>

          <div className="flex justify-between">
            <div className="mb-5">
              <label
                htmlFor="seats"
                className="block mb-2 text-sm font-medium text-black"
              >
                Seats
              </label>
              <input
                type="number"
                id="seats"
                value={seats}
                onChange={(e) => setSeats(e.target.value)}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-black "
              >
                Price
              </label>
              <input
                type="text"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
          >
            Save
          </button>
        </form>
      </div>

      {/* Display the filtered rides */}
      {rides && (
        <ul className="text-black mt-10 p-5 w-3/4 backdrop-blur-xl mb-10 overflow-y-scroll h-[200px] rounded-lg shadow-lg">
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

export default DriverDashboard;
