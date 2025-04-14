import React, { useEffect, useState } from "react";
import { FaUserCircle, FaCarSide } from "react-icons/fa";
import Login_sample_User from "./Login_sample_User";
import Signup_sample_User from "./Signup_sample_User";

function Login_Signup_User() {
  const [signed, setSigned] = useState("signup");
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const hasReloaded = localStorage.getItem("login");
    localStorage.removeItem("profiles");
    if (!hasReloaded) {
      localStorage.setItem("login", "true");
      window.location.reload();
    }
    localStorage.removeItem("cachedData");
    localStorage.removeItem("savedLink");
  }, []);

  return (
    <div className="page-container">
      <div className="content-container">
        {/* Header Section */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-block p-3 rounded-full bg-sky-100 dark:bg-sky-900 mb-4">
            <FaUserCircle className="w-12 h-12 text-skin-button-accent" />
          </div>
          <h1 className="heading-1">Welcome to RideShare</h1>
          <p className="text-body max-w-2xl mx-auto">
            Join our community of passengers and start your journey today
          </p>
        </div>

        {/* Auth Card */}
        <div className="max-w-md mx-auto animate-slide-up">
          <div className="card">
            {/* Tab Navigation */}
            <div className="flex justify-center space-x-4 mb-8">
              <button
                onClick={() => setSigned("signup")}
                className={`flex items-center px-6 py-2 rounded-lg transition-all duration-200 ${
                  signed === "signup"
                    ? "bg-skin-button-accent text-white"
                    : "text-skin-base-2 hover:text-skin-button-accent"
                }`}
              >
                <span className="mr-2">Sign Up</span>
              </button>
              <button
                onClick={() => setSigned("login")}
                className={`flex items-center px-6 py-2 rounded-lg transition-all duration-200 ${
                  signed === "login"
                    ? "bg-skin-button-accent text-white"
                    : "text-skin-base-2 hover:text-skin-button-accent"
                }`}
              >
                <span className="mr-2">Login</span>
              </button>
            </div>

            {/* Auth Form */}
            <div className="transition-all duration-300">
              {signed === "signup" ? <Signup_sample_User /> : <Login_sample_User />}
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center animate-fade-in">
            <p className="text-skin-base-2">
              By signing up, you agree to our{" "}
              <a href="#" className="text-skin-button-accent hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-skin-button-accent hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login_Signup_User;
