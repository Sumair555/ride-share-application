import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { FiUser, FiMail, FiPhone, FiCalendar, FiEdit2 } from "react-icons/fi";
import { BiCar } from "react-icons/bi";

function DriverProfile() {
  const [driverDetails, setDriverDetails] = useState({});
  const [memberSince, setMemberSince] = useState(new Date().getFullYear());
  const [isEditing, setIsEditing] = useState(false);
  const [editedDetails, setEditedDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDriverDetails();
  }, []);

  const fetchDriverDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(
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

      if (response.status === 200) {
        setDriverDetails(response.data);
        setEditedDetails(response.data);
        
        // Set member since year from registration date
        if (response.data.createdAt || response.data.registrationDate) {
          const date = new Date(response.data.createdAt || response.data.registrationDate);
          setMemberSince(date.getFullYear());
        }
      }
    } catch (err) {
      setError("Failed to fetch driver details. Please try again.");
      console.error("Error fetching driver details:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedDetails({ ...driverDetails });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(
        "http://localhost:3000/driver/update",
        {
          driver_id: localStorage.getItem("driver_id"),
          ...editedDetails,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.status === 200) {
        setDriverDetails(editedDetails);
        setIsEditing(false);
      }
    } catch (err) {
      setError("Failed to update driver details. Please try again.");
      console.error("Error updating driver details:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedDetails(driverDetails);
  };

  const handleChange = (e) => {
    setEditedDetails({
      ...editedDetails,
      [e.target.name]: e.target.value,
    });
  };

  if (loading && !driverDetails.name) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Sidebar />
      <div className="p-6 sm:p-10 max-w-3xl mx-auto">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Driver Profile</h1>
            {!isEditing && (
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                <FiEdit2 className="w-4 h-4" />
                Edit Profile
              </button>
            )}
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          <div className="space-y-8">
            {/* Profile Header */}
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                <BiCar className="w-12 h-12 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={editedDetails.name || ""}
                      onChange={handleChange}
                      className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  ) : (
                    driverDetails.name
                  )}
                </h2>
                <div className="flex items-center gap-2 text-gray-500 mt-1">
                  <FiCalendar className="w-4 h-4" />
                  <span>Member since {memberSince}</span>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">
                  <div className="flex items-center gap-2">
                    <FiUser className="w-4 h-4" />
                    Username
                  </div>
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="username"
                    value={editedDetails.username || ""}
                    onChange={handleChange}
                    className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-800">{driverDetails.username}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">
                  <div className="flex items-center gap-2">
                    <FiMail className="w-4 h-4" />
                    Email
                  </div>
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={editedDetails.email || ""}
                    onChange={handleChange}
                    className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-800">{driverDetails.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">
                  <div className="flex items-center gap-2">
                    <FiPhone className="w-4 h-4" />
                    Phone Number
                  </div>
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={editedDetails.phone || ""}
                    onChange={handleChange}
                    className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-800">{driverDetails.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">
                  <div className="flex items-center gap-2">
                    <BiCar className="w-4 h-4" />
                    Vehicle Number
                  </div>
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="vehicleNumber"
                    value={editedDetails.vehicleNumber || ""}
                    onChange={handleChange}
                    className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-800">{driverDetails.vehicleNumber}</p>
                )}
              </div>
            </div>

            {/* Edit Buttons */}
            {isEditing && (
              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={loading}
                  className="flex-1 bg-gray-100 text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriverProfile;
