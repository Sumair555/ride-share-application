import React, { useEffect, useState } from "react";
import img1 from "../../public/img1.jpeg";
import Login_sample_User from "./Login_sample_User";
import Signup_sample_User from "./Signup_sample_User";

function Login_Signup_User() {
  const [signed, setSigned] = useState("signup");
  useEffect(() => {
    window.scrollTo(0, 0);
    // window.location.reload()
  }, []);

  useEffect(() => {
    const hasReloaded = localStorage.getItem("login");
    localStorage.removeItem("profiles");
    if (!hasReloaded) {
      // Reload the page only once
      localStorage.setItem("login", "true");
      window.location.reload();
    }
    localStorage.removeItem("cachedData");
    localStorage.removeItem("savedLink");
  }, []);
  return (
    <div
      className="flex flex-col items-center justify-center pt-5 fade-up-element min-h-screen bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(${img1})`,
      }}
    >
      <h1 className="text-black font-bold text-5xl mb-4">User</h1>

      <div className=" backdrop-blur-lg shadow-2xl h-[500px] w-[50%] rounded-xl flex flex-col items-center ">
        {/* <div className="w-[1px] h-[300px] bg-gray-400 rounded-xl "></div> */}
        <div className="flex  justify-evenly  w-2/5 items-center my-10">
          <button
            onClick={() => setSigned("signup")}
            className=" bg-skin-fill text-white px-3 py-1 rounded-lg hover:bg-skin-button-accent-hover"
          >
            Sign up
          </button>
          <button
            onClick={() => setSigned("login")}
            className=" bg-skin-fill text-white px-3 py-1 rounded-lg hover:bg-skin-button-accent-hover"
          >
            Login
          </button>
        </div>
        {signed === "signup" ? <Signup_sample_User /> : <Login_sample_User />}
      </div>
    </div>
  );
}

export default Login_Signup_User;
