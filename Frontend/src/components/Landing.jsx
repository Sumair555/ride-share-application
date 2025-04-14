import React from "react";
import { Link } from "react-router-dom";
import { FaCar, FaUserFriends } from "react-icons/fa";

function Landing() {
  return (
    <div className="min-h-screen bg-gradient-secondary">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-skin-button-accent">RideShare</h1>
            </div>
            <div className="flex space-x-4">
              <Link to="/driver/login" className="button-secondary">
                Driver Login
              </Link>
              <Link to="/user/login" className="button-primary">
                Passenger Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <h1 className="text-5xl font-bold text-skin-text-heading-1 leading-tight">
              Your Journey,<br />
              <span className="text-skin-button-accent">Our Priority</span>
            </h1>
            <p className="text-xl text-skin-text-base-2">
              Join our community of drivers and passengers for a seamless carpooling experience. Save money, reduce traffic, and help the environment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/driver/login" className="button-primary flex items-center justify-center gap-2">
                <FaCar className="w-5 h-5" />
                Become a Driver
              </Link>
              <Link to="/user/login" className="button-secondary flex items-center justify-center gap-2">
                <FaUserFriends className="w-5 h-5" />
                Find a Ride
              </Link>
            </div>
          </div>

          {/* Right Column - Features */}
          <div className="bg-white rounded-2xl p-8 card-shadow space-y-6">
            <h2 className="text-2xl font-semibold text-skin-text-heading-1 mb-6">
              Why Choose RideShare?
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="bg-sky-100 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-skin-button-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-skin-text-heading-1">Save Money</h3>
                  <p className="text-skin-text-base-2">Split travel costs and reduce expenses</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-sky-100 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-skin-button-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-skin-text-heading-1">Save Time</h3>
                  <p className="text-skin-text-base-2">Quick matching with nearby rides</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-sky-100 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-skin-button-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-skin-text-heading-1">Eco-Friendly</h3>
                  <p className="text-skin-text-base-2">Reduce carbon footprint by sharing rides</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
