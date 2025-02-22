import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const loc = useLocation();
  const [val, setVal] = useState(true);
  // console.log(loc.pathname);
  const logout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login", { replace: true });
  };
  // useEffect(() => {
  //   if (localStorage.getItem("accessToken")) {
  //     setVal(true);
  //   }
  // }, []);
  return (
    <>
      <h1 className="font-semibold ml-10 text-5xl text-skin-heading-1 tracking-wider pt-2">
        <Link to="/">BeatBuddy</Link>
      </h1>
      
    </>
  );
}

export default Header;
