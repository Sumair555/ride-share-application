import React, { useEffect, useState } from "react";
import img1 from "../../public/img1.jpeg";

import axios from "axios";
import Sidebar_User from "./Sidebar_User";
import { Link } from "react-router-dom";
function UserDashboard() {
  const [data, setData] = useState();
  const [filteredData, setFileteredData] = useState();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("2024-05-08");
  const [show, setShow] = useState(true);

  const getData = async () => {
    const res = await axios.get("http://localhost:3000/ride/all", {
      headers: {
        Authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    // const data =await res.json();
    setData(res.data.filter((ride) => ride.seats > 0));
    setFileteredData(res.data.filter((ride) => ride.seats > 0));
    // console.log(res.data);
    // setData(res.data);
  };
  useEffect(() => {
    getData();
  }, []);

  const refresh = () => {
    getData();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    // Format the date as dd/mm/yyyy
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const handle = (e) => {
    e.preventDefault();

    // Extract the date part from the input date (removes time part)
    const datePart = date.split("T")[0];
    console.log(datePart);

    // Filter the data list based on the from, to, and date criteria
    const filteredData = data.filter(
      (ride) =>
        ride.from === from &&
        ride.to === to &&
        ride.date.split("T")[0] === datePart
    );
    console.log(filteredData);
    // Update the data state with the filtered list
    if (filteredData) {
      setFileteredData(filteredData);
    } else {
      setShow(false);
    }
  };

  return (
    <div
      className={`flex flex-col items-center min-h-screen bg-no-repeat bg-cover `}
      style={{ backgroundImage: `url(${img1})` }}
    >
      <Sidebar_User />

      <h1 className="text-5xl font-bold pt-5 text-black">Dashboard</h1>
      {/* <img className="h-[300px] mt-10 rounded-lg " src={img1} alt="" /> */}

      <div className=" mt-20 backdrop-blur-xl rounded-xl shadow-xl p-10 ">
        <form name="max-w-sm mx-auto" onSubmit={handle}>
          <div className="flex gap-x-4">
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-black"
              >
                From
              </label>
              <input
                type="string"
                id="from"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
                value={from}
                onChange={(e) => setFrom(e.target.value)}
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
                type="string"
                id="password"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
                value={to}
                onChange={(e) => setTo(e.target.value)}
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
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="flex gap-x-4">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
            >
              search
            </button>
            <button
              onClick={refresh}
              className="text-white bg-red-400 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-400 dark:hover:bg-red-600 dark:focus:ring-blue-800 w-full"
            >
              refresh
            </button>
          </div>
        </form>
      </div>

      {filteredData && show && (
        <ul className="text-black mt-10 p-5 w-3/4 backdrop-blur-xl mb-10 overflow-y-scroll h-[200px] rounded-lg shadow-lg">
          {filteredData.map((ride, index) => (
            <li
              key={ride.id || index}
              className="p-2 border-black w-full flex items-center justify-around font-bold text-xl m-2 shadow-2xl"
            >
              <div className="flex gap-x-6 items-start">
                <p>{index + 1}.</p>
                <div>
                  <p>{formatDate(ride.date)}</p>{" "}
                  {/* Use formatDate function here */}
                  <div className="flex gap-x-4">
                    <p>From: {ride.from}</p>
                    <p>To: {ride.to}</p>
                  </div>
                  <p>Seats: {ride.seats}</p>
                </div>
              </div>
              <div className="flex gap-x-2">
                <p>{`Price: ${ride.cost}`}</p>
              </div>
              <Link
                className="text-3xl text-white px-4 py-1 rounded-lg"
                state={{
                  ride_id: ride._id,
                  from: ride.from,
                  to: ride.to,
                  date: formatDate(ride.date),
                  seats: ride.seats,
                  cost: ride.cost,
                }}
                to="/user/pay"
              >
                ✅
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserDashboard;
