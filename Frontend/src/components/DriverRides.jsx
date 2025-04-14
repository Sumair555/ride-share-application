import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { FiMapPin, FiCalendar, FiUsers, FiClock, FiCheckCircle, FiClock as FiPending } from "react-icons/fi";
import { BiRupee } from "react-icons/bi";

function DriverRides() {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('pending');

  useEffect(() => {
    fetchRides();
  }, []);

  const fetchRides = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const driverId = localStorage.getItem("driver_id");
      const token = localStorage.getItem("accessToken");
      
      if (!driverId || !token) {
        setError("Authentication information missing. Please login again.");
        return;
      }

      console.log("Fetching rides for driver:", driverId);

      // Use the correct endpoint that works in DriverDashboard
      const response = await axios.post(
        "http://localhost:3000/driver/rides",
        { driver_id: driverId },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("API Response:", response);

      if (response.data && Array.isArray(response.data)) {
        // Sort rides by date, newest first
        const sortedRides = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        console.log("Sorted rides:", sortedRides);
        setRides(sortedRides);
      } else if (response.data && typeof response.data === 'object') {
        const ridesData = response.data.rides || [];
        const sortedRides = ridesData.sort((a, b) => new Date(b.date) - new Date(a.date));
        console.log("Sorted rides from object:", sortedRides);
        setRides(sortedRides);
      } else {
        console.error("Invalid response format:", response.data);
        setError("Invalid response format from server");
      }

    } catch (err) {
      console.error("Error details:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      
      if (err.response?.status === 404) {
        setError("Could not find rides. Please check if you have created any rides.");
      } else if (err.response?.status === 401) {
        setError("Authentication failed. Please login again.");
      } else {
        setError(
          err.response?.data?.message || 
          "Failed to fetch rides. Please check your connection and try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const formatLocation = (location) => {
    if (typeof location === 'string') {
      return location;
    }
    
    if (location && typeof location === 'object') {
      return location.place || "Location not specified";
    }
    
    return "Location not specified";
  };

  // Filter rides based on status and date
  const filteredRides = rides.filter(ride => {
    const rideDate = new Date(ride.date);
    const now = new Date();
    
    if (activeTab === 'completed') {
      // Show completed rides or rides with past dates
      return ride.status === 'completed' || rideDate < now;
    } else {
      // Show pending rides that are not completed and not in the past
      return ride.status !== 'completed' && rideDate >= now;
    }
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  // Count rides based on status and date
  const now = new Date();
  const pendingCount = rides.filter(ride => 
    ride.status !== 'completed' && new Date(ride.date) >= now
  ).length;
  
  const completedCount = rides.filter(ride => 
    ride.status === 'completed' || new Date(ride.date) < now
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Sidebar />
      <div className="p-6 sm:p-10 max-w-5xl mx-auto">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Recent Rides</h1>
            <div className="text-sm text-gray-500">
              {rides.length} total {rides.length === 1 ? 'ride' : 'rides'}
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 flex items-center justify-between">
              <p>{error}</p>
              <button 
                onClick={fetchRides}
                className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab('pending')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors
                ${activeTab === 'pending'
                  ? 'bg-blue-100 text-blue-800'
                  : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <FiPending className="w-5 h-5" />
              Upcoming
              <span className="ml-1 px-2 py-0.5 rounded-full bg-blue-200 text-blue-800 text-xs">
                {pendingCount}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors
                ${activeTab === 'completed'
                  ? 'bg-green-100 text-green-800'
                  : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <FiCheckCircle className="w-5 h-5" />
              Past Rides
              <span className="ml-1 px-2 py-0.5 rounded-full bg-green-200 text-green-800 text-xs">
                {completedCount}
              </span>
            </button>
          </div>

          {filteredRides.length === 0 ? (
            <div className="text-center py-12">
              <FiClock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-600 mb-2">
                No {activeTab === 'pending' ? 'upcoming' : 'past'} rides
              </h3>
              <p className="text-gray-500">
                {activeTab === 'pending' 
                  ? 'You have no upcoming rides scheduled'
                  : 'Your past rides will appear here'}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredRides.map((ride) => (
                <div
                  key={ride._id}
                  className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      {/* Route */}
                      <div className="flex items-start gap-3 mb-4">
                        <div className="flex flex-col items-center gap-1">
                          <FiMapPin className="w-5 h-5 text-blue-600" />
                          <div className="w-0.5 h-10 bg-gray-200"></div>
                          <FiMapPin className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="mb-3">
                            <div className="font-medium text-gray-900">{formatLocation(ride.from)}</div>
                            <div className="text-sm text-gray-500">Departure</div>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{formatLocation(ride.to)}</div>
                            <div className="text-sm text-gray-500">Destination</div>
                          </div>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <FiCalendar className="w-4 h-4" />
                          <span>{formatDate(ride.date)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <FiUsers className="w-4 h-4" />
                          <span>{ride.seats} seats</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <BiRupee className="w-4 h-4" />
                          <span>₹{ride.cost} per seat</span>
                        </div>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-center">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium
                        ${ride.status === 'completed' 
                          ? 'bg-green-100 text-green-800'
                          : new Date(ride.date) < now
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {ride.status === 'completed' 
                          ? 'Completed'
                          : new Date(ride.date) < now
                          ? 'Past'
                          : 'Upcoming'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DriverRides;
