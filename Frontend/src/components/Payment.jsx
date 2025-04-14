import React, { useEffect, useState } from "react";
import Sidebar_User from "./Sidebar_User";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { FiMapPin, FiCalendar, FiUsers } from "react-icons/fi";
import { BiRupee } from "react-icons/bi";

function Payment() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [seats, setSeats] = useState(0);
  const [cost, setCost] = useState(0);
  const [select, setSelect] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const state = useLocation().state;

  useEffect(() => {
    if (!state) {
      navigate("/user/dashboard");
      return;
    }
    setFrom(state.from);
    setTo(state.to);
    setDate(state.date);
    setSeats(state.seats);
    setCost(state.cost);
  }, [state, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

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

      if (res.status === 200) {
        navigate("/user/recent");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to book ride. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!state) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Sidebar_User />
      <div className="p-6 sm:p-10 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Confirm Booking</h1>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-8">
          {/* Ride Details Summary */}
          <div className="mb-8 space-y-6">
            <div className="flex items-center gap-2 text-blue-600">
              <FiCalendar className="w-5 h-5" />
              <span className="font-medium text-gray-800">{date}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-center gap-2">
                <FiMapPin className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">From</p>
                  <p className="font-medium text-gray-800">{from}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <FiMapPin className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">To</p>
                  <p className="font-medium text-gray-800">{to}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="seats" className="block text-sm font-medium text-gray-700 mb-2">
                Number of Seats
              </label>
              <div className="relative">
                <FiUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  id="seats"
                  min="1"
                  max={seats}
                  value={select}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (value >= 0 && value <= seats) {
                      setSelect(value);
                    }
                  }}
                  className="pl-10 w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">Available seats: {seats}</p>
            </div>

            {/* Price Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Price per seat</span>
                <div className="flex items-center gap-1 text-gray-800">
                  <BiRupee className="w-5 h-5" />
                  <span>{cost}</span>
                </div>
              </div>
              <div className="flex justify-between items-center mt-2 text-lg font-semibold">
                <span className="text-gray-800">Total Amount</span>
                <div className="flex items-center gap-1 text-blue-600">
                  <BiRupee className="w-6 h-6" />
                  <span>{cost * select}</span>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                {error}
              </div>
            )}

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading || select === 0}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "Processing..." : "Confirm Booking"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/user/dashboard")}
                disabled={loading}
                className="flex-1 bg-gray-100 text-gray-800 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Payment;
