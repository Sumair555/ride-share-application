import React, { useEffect, useState } from "react";
import img1 from "../../public/img1.jpeg";

import Sidebar_User from "./Sidebar_User";
import axios from "axios";
function UserProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const temp = async () => {
      const res = await axios.post(
        "http://localhost:3000/user/details",
        {
          id: localStorage.getItem("id"),
        },
        {
          headers: {
            Authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      console.log(res.data);
      setName(res.data.name);
      setPhone(res.data.phone);
      setEmail(res.data.email);
    };
    temp();
  }, []);
  return (
    <div
      style={{ backgroundImage: `url(${img1})` }}
      className="min-h-screen bg-no-repeat bg-cover flex flex-col items-center p-10"
    >
      <Sidebar_User />
      <h1 className="text-4xl font-bold">Profile</h1>
      <div className="flex justify-around w-full ">
        <div className="backdrop-blur-lg text-2xl p-10 flex gap-y-4 flex-col rounded-xl w-1/3 mt-5">
          <h1 className="flex justify-around">
            <p>Name</p> <p>:</p> <p>{name}</p>
          </h1>

          <h1 className="flex justify-around">
            <p>Email</p> <p>:</p> <p>{email}</p>
          </h1>
          <h1 className="flex justify-around">
            <p>Phone</p> <p>:</p> <p>{phone}</p>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
