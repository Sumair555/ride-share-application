import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import img1 from "../../public/img1.jpeg";
import { Navigate, useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";

function Payment() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [seats, setSeats] = useState(0);
  const [cost, setCost] = useState(0);
  const [select, setSelect] = useState(0);

  const navigate = useNavigate();
  const state = useLocation().state;
  useEffect(() => {
    console.log(localStorage.getItem("id"), state);
    setFrom(state.from);
    setTo(state.to);
    setDate(state.date);
    setSeats(state.seats);
    setCost(state.cost);
  }, []);

  const handle = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "http://localhost:3000/ride/add",
      {
        ride_id: state.ride_id,
        user_id: localStorage.getItem("id"),
        seats: select,
      },
      {
        headers: {
          Authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    console.log(res);
    navigate("/user/recent");
  };
  return (
    <div
      style={{ backgroundImage: `url(${img1})` }}
      className="min-h-screen bg-no-repeat bg-cover flex flex-col items-center p-10"
    >
      <Sidebar />
      <h1 className="text-4xl font-bold">Payment</h1>

      <div className=" mt-10 backdrop-blur-xl rounded-xl shadow-xl p-10 w-1/3">
        <form name="max-w-sm mx-auto" onSubmit={handle}>
          <div className="mb-5">
            <label
              htmlFor="date"
              className="block mb-2 text-sm font-medium text-black"
            >
              date
            </label>
            <input
              // type="date"
              id="date"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
              placeholder={date}
              value={date}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="from"
              className="block mb-2 text-sm font-medium text-black "
            >
              From
            </label>
            <input
              type="string"
              id="from"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
              value={from}
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="to"
              className="block mb-2 text-sm font-medium text-black"
            >
              To
            </label>
            <input
              type="string"
              id="to"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
              value={to}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="seats"
              className="block mb-2 text-sm font-medium text-black "
            >
              No . of Seats
            </label>
            <input
              type="number"
              id="seats"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
              value={select}
              onChange={(e) => {
                if (e.target.value >= 0 && e.target.value <= seats) {
                  setSelect(e.target.value);
                }
              }}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="seats"
              className="block mb-2 text-xl font-medium text-black "
            >
              Price - {cost * select}
            </label>
          </div>

          <div className="flex gap-x-2">
            <button
              type="submit"
              className="text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-400 dark:hover:bg-green-600 dark:focus:ring-blue-800 w-full"
            >
              Proceed
            </button>
            <button
              onClick={() => navigate("/user/dashboard")}
              className="text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-400 dark:hover:bg-red-500 dark:focus:ring-blue-800 w-full"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Payment;
