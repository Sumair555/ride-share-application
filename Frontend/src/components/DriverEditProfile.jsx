// import React from "react";
// import Sidebar from "./Sidebar";
// import driver from "../../public/driver.jpeg";
// function DriverEditProfile() {
//   return (
//     <div
//       style={{ backgroundImage: `url(${driver})` }}
//       className="min-h-screen bg-no-repeat bg-cover flex flex-col items-center p-10"
//     >
//       <Sidebar />
//       <h1 className="text-4xl font-bold">Edit Profile</h1>

//       <div className=" mt-10 backdrop-blur-xl rounded-xl shadow-xl p-10 w-1/3">
//         <form name="max-w-sm mx-auto">
//           <div className="mb-5">
//             <label
//               htmlFor="Name"
//               className="block mb-2 text-sm font-medium text-black"
//             >
//               Name
//             </label>
//             <input
//               type="string"
//               id="name"
//               className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
//               required
//             />
//           </div>

//           <div className="mb-5">
//             <label
//               htmlFor="Email"
//               className="block mb-2 text-sm font-medium text-black"
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
//               required
//             />
//           </div>
//           <div className="mb-5">
//             <label
//               htmlFor="license"
//               className="block mb-2 text-sm font-medium text-black"
//             >
//               License
//             </label>
//             <input
//               type="string"
//               id="license"
//               className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
//               required
//             />
//           </div>
//           <div className="mb-5">
//             <label
//               htmlFor="model"
//               className="block mb-2 text-sm font-medium text-black"
//             >
//               Car Model
//             </label>
//             <input
//               type="string"
//               id="model"
//               className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
//               required
//             />
//           </div>
//           <div className="mb-5">
//             <label
//               htmlFor="phone"
//               className="block mb-2 text-sm font-medium text-black "
//             >
//               Phone number
//             </label>
//             <input
//               type="string"
//               id="phone"
//               className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
//           >
//             Save
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default DriverEditProfile;

import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import driver from "../../public/driver.jpeg";
import axios from "axios";

function DriverEditProfile() {
  // State variables for the form data
  const [name, setName] = useState("");
  const [license, setLicense] = useState("");
  const [model, setModel] = useState("");
  const [phone, setPhone] = useState("");

  // Fetch initial driver data and populate form fields
  useEffect(() => {
    const fetchDriverData = async () => {
      try {
        const res = await axios.post(
          "http://localhost:3000/driver/details",
          {
            driver_id: localStorage.getItem("driver_id"),
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        // Set state variables with fetched data
        console.log(res);
        setName(res.data.name);
        setLicense(res.data.license);
        setModel(res.data.model);
        setPhone(res.data.phone);
      } catch (error) {
        console.error("Error fetching driver data:", error);
      }
    };
    fetchDriverData();
  }, []);

  // Handle form submission and update driver data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      driver_id: localStorage.getItem("driver_id"),
      name,
      license,
      model,
      phone,
    };
    try {
      const res = await axios.post(
        "http://localhost:3000/driver/update",
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (res.status === 200) {
        console.log("Driver updated successfully:", res.data);
        // Optionally, provide user feedback
      } else {
        console.log("Failed to update driver:", res.status, res.data);
      }
    } catch (error) {
      console.error("Error updating driver:", error);
    }
  };

  return (
    <div
      style={{ backgroundImage: `url(${driver})` }}
      className="min-h-screen bg-no-repeat bg-cover flex flex-col items-center p-10"
    >
      <Sidebar />
      <h1 className="text-4xl font-bold">Edit Profile</h1>

      <div className="mt-10 backdrop-blur-xl rounded-xl shadow-xl p-10 w-1/3">
        <form name="max-w-sm mx-auto" onSubmit={handleSubmit}>
          {/* Name field */}
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-black"
            >
              Name
            </label>
            <input
              type="string"
              id="name"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* License field */}
          <div className="mb-5">
            <label
              htmlFor="license"
              className="block mb-2 text-sm font-medium text-black"
            >
              License
            </label>
            <input
              type="string"
              id="license"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
              value={license}
              onChange={(e) => setLicense(e.target.value)}
            />
          </div>

          {/* Model field */}
          <div className="mb-5">
            <label
              htmlFor="model"
              className="block mb-2 text-sm font-medium text-black"
            >
              Car Model
            </label>
            <input
              type="string"
              id="model"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />
          </div>

          {/* Phone number field */}
          <div className="mb-5">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-black"
            >
              Phone number
            </label>
            <input
              type="string"
              id="phone"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Save button */}
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default DriverEditProfile;
