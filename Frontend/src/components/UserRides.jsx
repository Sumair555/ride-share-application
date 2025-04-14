import React, { useEffect, useState } from "react";
import Sidebar_User from "./Sidebar_User";
import axios from "axios";
import { FiMapPin, FiCalendar, FiClock } from "react-icons/fi";
import { BiRupee } from "react-icons/bi";

function UserRides() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const res = await axios.post(
          "http://localhost:3000/user/recent",
          {
            id: localStorage.getItem("id"),
          },
          {
            headers: {
              Authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setData(res.data.rides || []);
        setError(null);
      } catch (err) {
        setError("Failed to fetch recent rides. Please try again later.");
        console.error("Error fetching rides:", err);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Sidebar_User />
      <div className="p-6 sm:p-10 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Recent Rides</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/70 backdrop-blur-sm px-6 py-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Recent Rides</p>
            <p className="text-2xl font-bold text-blue-600">{data.length}</p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm px-6 py-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Last 30 Days</p>
            <p className="text-2xl font-bold text-blue-600">
              {data.filter(ride => {
                const rideDate = new Date(ride.date);
                const thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                return rideDate >= thirtyDaysAgo;
              }).length}
            </p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm px-6 py-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Total Spent</p>
            <div className="flex items-center">
              <BiRupee className="w-6 h-6 text-blue-600" />
              <p className="text-2xl font-bold text-blue-600">
                {data.reduce((total, ride) => total + (Number(ride.cost) || 0), 0)}
              </p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg shadow-sm">
            {error}
          </div>
        ) : data.length === 0 ? (
          <div className="text-center py-12 bg-white/50 backdrop-blur-md rounded-lg shadow-sm">
            <p className="text-lg text-gray-600">No recent rides found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {data.map((ride, index) => (
              <div
                key={ride.id || index}
                className="bg-white/50 backdrop-blur-md rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-blue-600">
                      <FiCalendar className="w-5 h-5" />
                      <span className="font-medium">{formatDate(ride.date)}</span>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex items-center gap-2">
                        <FiMapPin className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="text-sm text-gray-500">From</p>
                          <p className="font-medium text-gray-800">{ride.from}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <FiMapPin className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="text-sm text-gray-500">To</p>
                          <p className="font-medium text-gray-800">{ride.to}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-blue-600">
                    <BiRupee className="w-5 h-5" />
                    <span className="font-bold text-xl">{ride.cost}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserRides;
