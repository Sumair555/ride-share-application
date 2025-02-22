import React, { useEffect, useState } from "react";

import img1 from "../../public/img1.jpeg";
import Sidebar_User from "./Sidebar_User";
import axios from "axios";
function UserEditProfile() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const temp = async () => {
      const res = await axios.post(
        "http://localhost:3000/user/details",
        {
          id: localStorage.getItem("id"),
        },
        {
          headers: {
            Authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      // console.log(res.data);
      setName(res.data.name);
      setPhone(res.data.phone);
    };
    temp();
  }, []);

  const temp = async (e) => {
    e.preventDefault();

    // Data to be updated
    const requestData = {
      id: localStorage.getItem("id"),
      name,
      password,
      phone,
    };

    try {
      // Make the POST request
      const res = await axios.post(
        "http://localhost:3000/user/update",
        {
          userId: localStorage.getItem("id"),
          name,
          password,
          phone,
        },
        {
          headers: {
            Authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      // Handle the response
      if (res.status === 200) {
        console.log("User updated successfully:", res.data);
        // Notify the user or update the UI as needed
      } else {
        console.log("Failed to update user:", res.status, res.data);
        // Handle non-200 status codes
      }
    } catch (error) {
      console.error("Error updating user:", error);
      // Handle network errors or other issues
      // Notify the user about the error (optional)
    }
  };

  return (
    <div
      style={{ backgroundImage: `url(${img1})` }}
      className="min-h-screen bg-no-repeat bg-cover flex flex-col items-center p-10"
    >
      <Sidebar_User />
      <h1 className="text-4xl font-bold">Edit Profile</h1>

      <div className=" mt-10 backdrop-blur-xl rounded-xl shadow-xl p-10 w-1/3">
        <form name="max-w-sm mx-auto" onSubmit={temp}>
          <div className="mb-5">
            <label
              htmlFor="Name"
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
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-black "
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-black "
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

export default UserEditProfile;
