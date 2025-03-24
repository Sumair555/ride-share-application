import React, { useEffect, useState } from "react";
import driver from "../../public/driver.jpeg";
import Sidebar from "./Sidebar";
import axios from "axios";

function DriverProfile() {
  // State variables to manage profile data
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    license: "",
    model: "",
    phone: "",
  });

  // Fetch profile data from the API when the component mounts
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Make an API request to get the user's details
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

        console.log(res);
        // Set the fetched data in the state
        if (res.status === 200) {
          const { name, email, license, model, phone } = res.data;
          setProfileData({ name, email, license, model, phone });
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  // Display the profile data
  return (
    <div
      style={{ backgroundImage: `url(${driver})` }}
      className="min-h-screen bg-no-repeat bg-cover flex flex-col items-center p-10"
    >
      <Sidebar />
      <h1 className="text-4xl font-bold">Profile</h1>
      <div className="flex justify-around w-full">
        <div className="backdrop-blur-lg text-2xl p-10 flex gap-y-4 flex-col rounded-xl w-1/3 mt-5">
          {/* Displaying the profile data */}
          <h1 className="flex justify-between">
            <p>Name</p> <p>{profileData.name}</p>
          </h1>
          <h1 className="flex justify-between">
            <p>Email</p> <p>{profileData.email}</p>
          </h1>
          <h1 className="flex justify-between">
            <p>License</p> <p>{profileData.license}</p>
          </h1>
          <h1 className="flex justify-between">
            <p>Car Model</p> <p>{profileData.model}</p>
          </h1>
          <h1 className="flex justify-between">
            <p>Phone</p> <p>{profileData.phone}</p>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default DriverProfile;
