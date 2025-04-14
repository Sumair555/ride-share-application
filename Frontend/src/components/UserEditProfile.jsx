import React, { useEffect, useState } from "react";
import Sidebar_User from "./Sidebar_User";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserEditProfile() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const token = localStorage.getItem("accessToken");
        const id = localStorage.getItem("id");
        
        if (!token || !id) {
          setError("Please login to edit your profile");
          return;
        }

        console.log("Fetching user details with:", { id, token });
        
        const res = await axios.post(
          "http://localhost:3000/user/details",
          {
            id: id,
          },
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          }
        );

        console.log("User details response:", res.data);

        if (!res.data) {
          setError("Failed to load user details");
          return;
        }

        setName(res.data.name || "");
        setPhone(res.data.phone || "");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      setUpdateSuccess(false);
      
      const token = localStorage.getItem("accessToken");
      const id = localStorage.getItem("id");
      
      if (!token || !id) {
        setError("Please login to update your profile");
        return;
      }

      const updateData = {
        userId: id,
        name: name,
        phone: phone,
      };

      if (password) {
        updateData.password = password;
      }

      console.log("Updating user with data:", updateData);

      const res = await axios.post(
        "http://localhost:3000/user/update",
        updateData,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );

      console.log("Update response:", res.data);

      if (res.status === 200) {
        setUpdateSuccess(true);
        setPassword(""); // Clear password after successful update
        setTimeout(() => {
          navigate("/user/profile");
        }, 2000);
      }
    } catch (err) {
      console.error("Error updating profile:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      
      if (err.response?.status === 401) {
        setError("Session expired. Please login again.");
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to update profile. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-sky-100">
        <Sidebar_User />
        <div className="flex justify-center items-center h-screen">
          <div className="text-center text-slate-600">Loading profile...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-sky-100">
      <Sidebar_User />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-slate-800 mb-8">Edit Profile</h1>

        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {updateSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-600">Profile updated successfully! Redirecting...</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="input-primary w-full"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                New Password (optional)
              </label>
              <input
                type="password"
                id="password"
                className="input-primary w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                minLength={6}
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                className="input-primary w-full"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>

            <button
              type="submit"
              className="button-primary w-full"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserEditProfile;
