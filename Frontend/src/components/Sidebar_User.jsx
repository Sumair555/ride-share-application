import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaTimes, FaBars, FaUser, FaHome, FaHistory, FaEdit, FaSignOutAlt } from "react-icons/fa";

const Sidebar_User = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const logout = async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("id");
    navigate("/");
  };

  const menuItems = [
    { path: "/user/dashboard", name: "Dashboard", icon: <FaHome className="w-5 h-5" /> },
    { path: "/user/profile", name: "Profile", icon: <FaUser className="w-5 h-5" /> },
    { path: "/user/edit", name: "Edit Profile", icon: <FaEdit className="w-5 h-5" /> },
    { path: "/user/recent", name: "Recent Rides", icon: <FaHistory className="w-5 h-5" /> },
  ];

  return (
    <>
      <button
        className="fixed z-50 top-4 right-4 p-2 rounded-lg bg-white shadow-md text-skin-button-accent hover:text-skin-button-accent-hover transition-colors duration-200"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        {showSidebar ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
      </button>

      {/* Overlay */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={() => setShowSidebar(false)}
        />
      )}

      <aside
        className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          showSidebar ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-5 border-b">
            <h2 className="text-xl font-bold text-skin-text-heading-1">
              User Menu
            </h2>
          </div>

          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-2 px-3">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                      location.pathname === item.path
                        ? "bg-skin-button-accent text-white"
                        : "text-skin-text-base hover:bg-skin-fill hover:text-skin-button-accent"
                    }`}
                    onClick={() => setShowSidebar(false)}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t">
            <button
              onClick={() => {
                logout();
                setShowSidebar(false);
              }}
              className="flex items-center space-x-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <FaSignOutAlt className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar_User;
