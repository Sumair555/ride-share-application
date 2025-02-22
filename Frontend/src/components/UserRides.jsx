import React, { useEffect, useState } from "react";
import img1 from "../../public/img1.jpeg";
import Sidebar_User from "./Sidebar_User";
import axios from "axios";
function UserRides() {
  const [data, setData] = useState();

  useEffect(() => {
    const getData = async () => {
      const res = await axios.post(
        "http://localhost:3000/user/recent",
        {
          id: localStorage.getItem("id"),
        },
        {
          headers: {
            Authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      // const data =await res.json();
      console.log(res.data);
      setData(res.data.rides);
    };
    getData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    // Format the date as dd/mm/yyyy
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div
      style={{ backgroundImage: `url(${img1})` }}
      className="min-h-screen bg-no-repeat bg-cover flex flex-col items-center p-10"
    >
      <Sidebar_User />
      <h1 className="text-4xl font-bold">Recent Rides</h1>

      {/* <ul className="text-black mt-10  p-5 w-3/4 backdrop-blur-xl mb-10 overflow-y-scroll  h-[500px] rounded-lg shadow-lg">
        <li className="p-2 border-black  w-full flex items-center justify-around font-bold text-xl m-2 shadow-2xl">
          <div className="flex gap-x-6 items-start">
            <p>1.</p>
            <div>
              <p>11/11/11</p>
              <div className="flex gap-x-4">
                <p>from : guntur </p>
                <p>to : vijayawada</p>
              </div>
              <p>seats : 5 </p>
            </div>
          </div>
          <div className="flex gap-x-2">
            <p>price</p>
          </div>
        </li>
      </ul> */}

      {data && (
        <ul className="text-black mt-10 p-5 w-3/4 backdrop-blur-xl mb-10 overflow-y-scroll h-[500px] rounded-lg shadow-lg">
          {data.map((ride, index) => (
            <li
              key={ride.id || index}
              className="p-2 border-black w-full flex items-center justify-around font-bold text-xl m-2 shadow-2xl"
            >
              <div className="flex gap-x-6 items-start">
                <p>{index + 1}.</p>
                <div>
                  <p>{formatDate(ride.date)}</p>{" "}
                  {/* Use formatDate function here */}
                  <div className="flex gap-x-4">
                    <p>From: {ride.from}</p>
                    <p>To: {ride.to}</p>
                  </div>

                </div>
              </div>
              <div className="flex gap-x-2">
                <p>{`Price: ${ride.cost}`}</p>
              </div>
              
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserRides;
