import React from "react";
import { Link } from "react-router-dom";
import { FaCar, FaUserFriends, FaUniversity } from "react-icons/fa";

function Landing() {
  return (
    <div className="min-h-screen theme-dark bg-skin-fill flex flex-col">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-3">
              <img src="/Logo-2.png" alt="Ride Share Logo" className="h-10 w-auto" />
              <h1 className="text-2xl font-bold text-skin-button-accent">Ride Share</h1>
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
            <div className="flex items-center space-x-2">
              <FaUniversity className="w-8 h-8 text-skin-button-accent" />
              <h1 className="text-5xl font-bold text-skin-text-heading-1 leading-tight">
                Share Rides,<br />
                <span className="text-skin-button-accent">Share Stories</span>
              </h1>
            </div>
            <div className="space-y-4">
              <p className="text-xl text-skin-text-base-2">
                Your trusted campus carpooling community. Connect with fellow travelers, share costs, and make every journey memorable.
              </p>
              <ul className="space-y-2 text-skin-text-base-2">
                <li className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-skin-button-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Safe and verified community members</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-skin-button-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Flexible scheduling for campus commutes</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-skin-button-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Split costs, save money together</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/driver/login" className="button-primary flex items-center justify-center gap-2">
                <FaCar className="w-5 h-5" />
                Start Driving
              </Link>
              <Link to="/user/login" className="button-secondary flex items-center justify-center gap-2">
                <FaUserFriends className="w-5 h-5" />
                Book a Ride
              </Link>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
            <img 
              src="/Acadamic.jpg" 
              alt="Campus" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-skin-text-heading-1 mb-12">
          Why Choose SRM Ride Share?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 card-shadow">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-sky-400 p-4 rounded-xl">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-skin-text-heading-1">Student Budget-Friendly</h3>
            </div>
            <p className="text-skin-text-base-2 ml-14">Share travel costs with fellow students and save on daily commute expenses</p>
          </div>

          <div className="bg-white rounded-2xl p-8 card-shadow">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-sky-400 p-4 rounded-xl">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-skin-text-heading-1">Campus Convenience</h3>
            </div>
            <p className="text-skin-text-base-2 ml-14">Quick and easy rides to and from campus locations and nearby areas</p>
          </div>

          <div className="bg-white rounded-2xl p-8 card-shadow">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-sky-400 p-4 rounded-xl">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-skin-text-heading-1">Verified Community</h3>
            </div>
            <p className="text-skin-text-base-2 ml-14">Connect with verified students and staff members only</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;

