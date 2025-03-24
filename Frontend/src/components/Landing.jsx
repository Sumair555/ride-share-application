import React from "react";
import { Link } from "react-router-dom";
import main_page from "../../public/main_page.jpeg";

function Landing() {
  return (
    <div
      className=" h-screen flex flex-col items-center justify-around text-white bg-cover bg-center "
      style={{ backgroundImage: `url(${main_page})` }}
    >
      <h1 className="text-6xl font-extrabold text-black backdrop-blur-sm p-5 rounded-3xl">
        Car Pooling
      </h1>
      <div className="w-2/3 flex items-center justify-around mb-[80px] text-2xl">
        <Link
          to="/driver/login"
          className="backdrop-blur-lg  hover:scale-110 ease-in-out duration-300 text-black  py-2 px-4 rounded-lg font-semibold"
        >
          Create a Ride
        </Link>

        <Link
          to="/user/login"
          className="backdrop-blur-lg hover:scale-110 ease-in-out duration-300 text-black  py-2 px-4 rounded-lg font-semibold"
        >
          Request a Ride
        </Link>
      </div>
    </div>
  );
}

export default Landing;
