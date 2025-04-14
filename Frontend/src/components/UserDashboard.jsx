import React, { useEffect, useState } from "react";
import img1 from "../../public/img1.jpeg";
import axios from "axios";
import Sidebar_User from "./Sidebar_User";
import { Link } from "react-router-dom";

function UserDashboard() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get the token
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("Please login to view available rides");
        setLoading(false);
        return;
      }

      console.log("Fetching rides with token:", token);
      
      const res = await axios.get("http://localhost:3000/ride/all", {
        headers: {
          Authorization: `bearer ${token}`
        },
      });
      
      console.log("API Response:", res.data);
      
      if (!res.data) {
        setError("No rides available");
        return;
      }

      const availableRides = Array.isArray(res.data) ? res.data.filter(ride => ride.seats > 0) : [];
      console.log("Available rides:", availableRides);
      
      setData(availableRides);
      setFilteredData(availableRides);
    } catch (err) {
      console.error("Error details:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      
      if (err.response?.status === 401) {
        setError("Session expired. Please login again.");
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to load rides. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const refresh = () => {
    getData();
    setFrom("");
    setTo("");
    setDate("");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handle = (e) => {
    e.preventDefault();
    
    let filtered = [...data];

    if (from) {
      filtered = filtered.filter(ride => 
        ride.from.toLowerCase().includes(from.toLowerCase())
      );
    }
    
    if (to) {
      filtered = filtered.filter(ride => 
        ride.to.toLowerCase().includes(to.toLowerCase())
      );
    }
    
    if (date) {
      const searchDate = date.split("T")[0];
      filtered = filtered.filter(ride => 
        ride.date.split("T")[0] === searchDate
      );
    }

    setFilteredData(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-sky-100">
      <Sidebar_User />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-slate-800 mb-8">Available Rides</h1>

        {/* Search Form */}
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 mb-8">
          <form onSubmit={handle} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  From
                </label>
                <input
                  type="text"
                  className="input-primary w-full"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  placeholder="Enter starting point"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  To
                </label>
                <input
                  type="text"
                  className="input-primary w-full"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  placeholder="Enter destination"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Date
              </label>
              <input
                type="date"
                className="input-primary w-full"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="button-primary flex-1"
              >
                Search
              </button>
              <button
                type="button"
                onClick={refresh}
                className="button-secondary flex-1"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* Rides List */}
        {loading ? (
          <div className="text-center text-slate-600">Loading rides...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : filteredData.length === 0 ? (
          <div className="text-center text-slate-600">No rides available for the selected criteria</div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="divide-y divide-gray-200">
                {filteredData.map((ride, index) => (
                  <div key={ride._id || index} className="p-6 hover:bg-sky-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-4">
                          <span className="text-lg font-semibold text-slate-800">
                            {ride.from} → {ride.to}
                          </span>
                          <span className="text-sm text-slate-500">
                            {formatDate(ride.date)}
                          </span>
                        </div>
                        <div className="flex gap-4 text-sm text-slate-600">
                          <span>Available Seats: {ride.seats}</span>
                          <span>Price: ₹{ride.cost}</span>
                        </div>
                      </div>
                      <Link
                        to="/user/pay"
                        state={{
                          ride_id: ride._id,
                          from: ride.from,
                          to: ride.to,
                          date: formatDate(ride.date),
                          seats: ride.seats,
                          cost: ride.cost,
                        }}
                        className="button-primary"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
