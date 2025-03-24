import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();

  const logout = async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("id");
    navigate("/");
  };
  return (
    <>
      {showSidebar ? (
        <button
          className="flex text-4xl text-white items-center cursor-pointer fixed right-10 top-6 z-50"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          x
        </button>
      ) : (
        <svg
          onClick={() => setShowSidebar(!showSidebar)}
          className="fixed  z-30 flex items-center cursor-pointer right-10 top-6"
          fill="#000000"
          viewBox="0 0 100 80"
          width="30"
          height="30"
        >
          <rect width="100" height="10"></rect>
          <rect y="30" width="100" height="10"></rect>
          <rect y="60" width="100" height="10"></rect>
        </svg>
      )}

      <div
        className={`top-0 right-0 w-[20vw] backdrop-blur-lg  p-10 pl-20 text-black fixed h-full z-40  ease-in-out duration-300 ${
          showSidebar ? "translate-x-0 " : "translate-x-full"
        }`}
      >
        <h3 className="mt-12 text-2xl gap-y-2  font-semibold text-black  flex flex-col items-start">
          <Link
            to="/driver/dashboard"
            className="hover:scale-125 ease-in-out duration-300"
          >
            Dashboard
          </Link>
          <Link
            to="/driver/profile"
            className="hover:scale-125 ease-in-out duration-300"
          >
            Profile
          </Link>
          <Link
            to="/driver/edit"
            className="hover:scale-125 ease-in-out duration-300"
          >
            Edit Profile
          </Link>
          <Link
            to="/driver/recent"
            className="hover:scale-125 ease-in-out duration-300"
          >
            Recent Rides
          </Link>
          <button
            onClick={logout}
            className="hover:scale-125 ease-in-out duration-300"
          >
            Logout
          </button>
        </h3>
      </div>
    </>
  );
};

export default Sidebar;
