import React, { useState } from "react";
import useCountdown from "../Hooks/useCountDown";
import Success from "./Success";

import { generate_OTP_email, check_OTP } from "emailotp";

const Login = () => {
  const [email, setEmail] = useState("");
  const { secondsLeft, start } = useCountdown();
  const [sentotp, setSentotp] = useState(0);
  const [message, setMessage] = useState("");
  const [successmessage, setSuccessmessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);

    const generateOTP = generate_OTP_email(email);
    setMessage(generateOTP);

    if (generateOTP == "Email containing OTP has been sent successfully") {
      setSentotp(1);
      start(60);
      setMessage("");
    }
  };

  const handleOtpValidate = (event) => {
    event.preventDefault();

    const otp =
      event.target.first.value +
      event.target.second.value +
      event.target.third.value +
      event.target.fourth.value +
      event.target.fifth.value +
      event.target.sixth.value;
    console.log(otp);

    const userDetails = { user_email: email, otp: otp };
    const verifyOTP = check_OTP(userDetails);
    setMessage(verifyOTP);
    if (verifyOTP == "OTP is valid and checked") {
      setSuccessmessage(true);
    }

    console.log(verifyOTP);
  };

  return (
    <div>
      {secondsLeft === 0 ? (
        <div className="min-h-screen flex items-center justify-center bg-blue-400">
          <div className="bg-white p-16 rounded shadow-2x1 w-1/2">
            <h2 className="text-3xl font-bold mb-10 text-gray-800">Login</h2>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-1 font-bold text-gray-500">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
                  required
                />
                {message && (
                  <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                    {message}
                  </span>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  className="block w-full bg-yellow-400 hover:bg-yellow-300 p-4 rounded text-yellow-900 hover:text-yellow-800 transition duration-300"
                >
                  Generate OTP
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-blue-400">
          <div className="bg-white p-16 rounded shadow-2x1 w-1/2">
            <h1 className="text-2xl font-bold text-center">OTP Verification</h1>
            <div className="flex flex-col mt-4 items-center">
              <span>Enter the OTP you received at</span>
              <span className="font-bold">{email}</span>
            </div>

            {!successmessage ? (
              <form className="space-y-5" onSubmit={handleOtpValidate}>
                <div
                  id="otp"
                  className="flex flex-row justify-center text-center px-2 mt-5"
                >
                  <input
                    className="m-2 border h-10 w-10 text-center form-control rounded"
                    type="number"
                    name="first"
                    maxLength="1"
                    min="0"
                    max="9"
                    required
                  />

                  <input
                    className="m-2 border h-10 w-10 text-center form-control rounded"
                    type="number"
                    name="second"
                    maxLength="1"
                    min="0"
                    max="9"
                    required
                  />
                  <input
                    className="m-2 border h-10 w-10 text-center form-control rounded"
                    type="number"
                    name="third"
                    maxLength="1"
                    min="0"
                    max="9"
                    required
                  />
                  <input
                    className="m-2 border h-10 w-10 text-center form-control rounded"
                    type="number"
                    name="fourth"
                    maxLength="1"
                    min="0"
                    max="9"
                    required
                  />
                  <input
                    className="m-2 border h-10 w-10 text-center form-control rounded"
                    type="number"
                    name="fifth"
                    maxLength="1"
                    min="0"
                    max="9"
                    required
                  />
                  <input
                    className="m-2 border h-10 w-10 text-center form-control rounded"
                    type="number"
                    name="sixth"
                    maxLength="1"
                    min="0"
                    max="9"
                    required
                  />
                </div>

                {message && (
                  <div className="flex justify-center text-center mt-5">
                    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                      {message}
                    </span>
                  </div>
                )}

                {secondsLeft > 0 && (
                  <div className="flex justify-center text-center mt-5">
                    <span className="font-bold">
                      Code expire in {secondsLeft > 0 && `${secondsLeft}`}{" "}
                      seconds
                    </span>
                  </div>
                )}
                <div className="flex justify-center text-center mt-5">
                  <button
                    type="submit"
                    className="block w-full bg-yellow-400 hover:bg-yellow-300 p-4 rounded text-yellow-900 hover:text-yellow-800 transition duration-300"
                  >
                    Verify
                  </button>
                </div>
              </form>
            ) : (
              <Success />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
