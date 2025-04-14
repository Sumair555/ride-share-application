import React, { useEffect, useState } from "react";
import Sidebar_User from "./Sidebar_User";
import axios from "axios";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";

function UserProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalRides, setTotalRides] = useState(0);
  const [memberSince, setMemberSince] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const token = localStorage.getItem("accessToken");
        const id = localStorage.getItem("id");
        
        if (!token || !id) {
          setError("Please login to view your profile");
          return;
        }

        // Fetch user details
        const userRes = await axios.post(
          "http://localhost:3000/user/details",
          { id },
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          }
        );

        if (!userRes.data) {
          setError("Failed to load user details");
          return;
        }

        setName(userRes.data.name || "");
        setPhone(userRes.data.phone || "");
        setEmail(userRes.data.email || "");
        
        // Get registration date from user details
        const registrationDate = userRes.data.createdAt || userRes.data.registrationDate;
        if (registrationDate) {
          const regDate = new Date(registrationDate);
          setMemberSince(regDate.getFullYear().toString());
        } else {
          // If no date is available, use current date
          const currentDate = new Date();
          setMemberSince(currentDate.getFullYear().toString());
        }

        // Fetch recent rides to get total count
        const ridesRes = await axios.post(
          "http://localhost:3000/user/recent",
          { id },
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          }
        );

        if (ridesRes.data && ridesRes.data.rides) {
          setTotalRides(ridesRes.data.rides.length);
        }

      } catch (err) {
        console.error("Error fetching user details:", {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status
        });
        
        if (err.response?.status === 401) {
          setError("Session expired. Please login again.");
        } else if (err.response?.data?.message) {
          setError(err.response.data.message);
        } else {
          setError("Failed to load profile details. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserDetails();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
        <Sidebar_User />
        <div className="flex justify-center items-center h-screen">
          <div className="text-center text-slate-600">Loading profile...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
        <Sidebar_User />
        <div className="flex justify-center items-center h-screen">
          <div className="text-center text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
      <Sidebar_User />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">My Profile</h1>
          
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Profile Info */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-xl">
                  <div className="bg-blue-500 p-3 rounded-full text-white">
                    <FaUser className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Name</p>
                    <p className="text-lg font-semibold text-gray-800">{name}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-xl">
                  <div className="bg-green-500 p-3 rounded-full text-white">
                    <FaEnvelope className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Email</p>
                    <p className="text-lg font-semibold text-gray-800">{email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-xl">
                  <div className="bg-purple-500 p-3 rounded-full text-white">
                    <FaPhone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Phone</p>
                    <p className="text-lg font-semibold text-gray-800">{phone}</p>
                  </div>
                </div>
              </div>

              {/* Stats/Additional Info */}
              <div className="bg-slate-50 rounded-xl p-6 flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Account Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Member Since</span>
                    <span className="font-medium text-gray-800">{memberSince}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Rides</span>
                    <span className="font-medium text-gray-800">{totalRides}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Status</span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
