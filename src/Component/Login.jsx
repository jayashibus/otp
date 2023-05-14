import React, { useState, useEffect, useRef } from "react";
import useCountdown from "../Hooks/useCountDown";
import Success from "./Success";
import { CONSTANTS } from "../Constants/constants";
import OtpForm from "./OtpForm";

const Login = () => {
  //Setting up Local State
  const [email, setEmail] = useState("");
  const { secondsLeft, start, stop } = useCountdown();
  const [message, setMessage] = useState("");
  const [successmessage, setSuccessmessage] = useState(false);
  const [otpform, setOtpform] = useState(false);
  const [disabled, setDisabled] = useState("");

  // Validate the email and generate six digit OTP
  const handleSubmit = (e) => {
    try {
      e.preventDefault();

      const generateOTP = generate_OTP_email(email);
      setMessage(generateOTP);

      if (generateOTP == "Email containing OTP has been sent successfully") {
        start(60);
        setMessage("");
        setOtpform(true);
      }
    } catch (error) {
      console.error(error);
      setMessage(
        "Error occurred while generating OTP. Please try again later."
      );
    }
  };

  const generate_OTP_email = (user_email) => {
    try {
      // Validate email domain,length sub domain, Symbols, domain
      const regex = /^[a-zA-Z0-9._%+-]+@(dso\.org\.sg)$/i;
      if (
        user_email.length < 1 ||
        user_email.length > 60 ||
        !regex.test(user_email)
      ) {
        return CONSTANTS.statusMsg.STATUS_EMAIL_INVALID;
      }

      //Random OTP generator combination range starting from  000000 t0 999999
      const otp = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");

      const start_time = new Date().getTime();

      //Store OTP and user details in local Memory
      storeOTP(user_email, otp);

      const email_body = `Your OTP Code is ${otp}. The code is valid for 1 minute.`;
      if (!send_email(user_email, email_body)) {
        return CONSTANTS.statusMsg.STATUS_EMAIL_FAIL;
      }

      return CONSTANTS.statusMsg.STATUS_EMAIL_OK;
    } catch (error) {
      // handle the error here
      console.error(error);
      return CONSTANTS.statusMsg.STATUS_EMAIL_FAIL;
    }
  };

  //Store data in local mempry
  const storeOTP = (email, otp) => {
    try {
      // retrieve existing data from localStorage
      const existingData = JSON.parse(localStorage.getItem("otpData")) || [];

      // check if there is any data with the same email
      const duplicateIndex = existingData.findIndex(
        (data) => data.email === email
      );

      // if a duplicate is found, remove it from the array
      if (duplicateIndex !== -1) {
        existingData.splice(duplicateIndex, 1);
      }

      // implement OTP storage logic here
      const expiryTime = new Date().getTime() + 60000; // expiry time = 1 minute from now
      const tries = 0;
      const otpData = { email, otp, expiryTime, tries };
      existingData.push(otpData);
      localStorage.setItem("otpData", JSON.stringify(existingData));
    } catch (error) {
      // handle the error here
      console.error(error);
    }
  };

  // Send email logic comes here
  const send_email = (email_address, email_body) => {
    try {
      console.log(email_body);
      return true;
    } catch (error) {
      // handle the error here
      console.error(error);
      return false;
    }
  };

  // Validate the given Six Digit OTP with all numeric
  const validateOTP = (otp) => {
    const re = /^[0-9]{6}$/;
    return re.test(otp);
  };

  // OTP Handler function
  const handleOtpValidate = (event) => {
    event.preventDefault();

    const otp =
      event.target.first.value +
      event.target.second.value +
      event.target.third.value +
      event.target.fourth.value +
      event.target.fifth.value +
      event.target.sixth.value;

    const userDetails = { user_email: email, otp: otp };
    const verifyOTP = check_OTP(userDetails);

    setMessage(verifyOTP);
    if (verifyOTP == "OTP is valid and checked") {
      setSuccessmessage(true);
      setMessage("");
      setEmail("");
      setOtpform(false);
      stop(0);
    }
    if (verifyOTP == "OTP is wrong after 10 tries") {
      setMessage("OTP is wrong after 10 tries");
      stop(0);
    }
  };

  const handleResendOTP = () => {
    try {
      const generateOTP = generate_OTP_email(email);
      setMessage(generateOTP);

      if (generateOTP == "Email containing OTP has been sent successfully") {
        start(60);
        setMessage("");
        setOtpform(true);
      }
    } catch (error) {
      console.error(error);
      setMessage(
        "Error occurred while generating OTP. Please try again later."
      );
    }
  };

  const check_OTP = (input) => {
    try {
      let enteredOtp = input.otp;

      // retrieve existing data from localStorage
      const existingData = JSON.parse(localStorage.getItem("otpData")) || [];

      // find the OTP data object for the given email ID
      const otpData = existingData.find(
        (data) => data.email === input.user_email
      );

      if (!otpData) {
        throw new Error("Invalid email address. OTP data not found.");
      }

      // const otpData = JSON.parse(localStorage.getItem("otpData"));
      if (otpData.tries < 10) {
        const elapsed_time = new Date().getTime();
        if (elapsed_time >= otpData.expiryTime) {
          return CONSTANTS.statusMsg.STATUS_OTP_TIMEOUT;
        }

        // Validate OTP
        if (validateOTP(enteredOtp) && enteredOtp === otpData.otp) {
          return CONSTANTS.statusMsg.STATUS_OTP_OK;
        } else {
          updateTries(otpData.email);
          otpData.tries++;
          const remaining_tries = 10 - otpData.tries;
          if (remaining_tries === 0) {
            return CONSTANTS.statusMsg.STATUS_OTP_FAIL;
          } else {
            return `Invalid OTP code. ${remaining_tries} tries remaining.`;
          }
        }
      }
    } catch (error) {
      console.error(error);
      return "An error occurred while checking OTP. Please try again later.";
    }
  };

  // Update the increment for failed tries
  const updateTries = (email) => {
    try {
      const existingData = JSON.parse(localStorage.getItem("otpData")) || [];

      // find the OTP data object for the given email ID
      const dataIndex = existingData.findIndex((data) => data.email === email);

      if (dataIndex !== -1) {
        existingData[dataIndex].tries += 1;

        // update localStorage with the modified data object
        localStorage.setItem("otpData", JSON.stringify(existingData));
      }
    } catch (error) {
      console.log("Error while updating OTP data: ", error);
    }
  };

  return (
    <div>
      {!otpform ? (
        successmessage ? (
          <Success />
        ) : (
          <div className="min-h-screen flex items-center justify-center bg-blue-400">
            <div className="bg-white p-16 rounded shadow-2x1 w-1/3">
              <h2 className="text-3xl font-bold mb-10 text-gray-800">Login</h2>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label className="block mb-1 font-bold text-gray-500">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    maxLength={60}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter the email"
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
        )
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-blue-400">
          <div className="bg-white p-16 rounded shadow-2x1 w-1/2">
            <h1 className="text-2xl font-bold text-center">OTP Verification</h1>
            <div className="flex flex-col mt-4 items-center">
              <span>Enter the OTP you received at </span>
              <span className="font-bold">{email}</span>
            </div>

            <OtpForm
              handleOtpValidate={handleOtpValidate}
              message={message}
              secondsLeft={secondsLeft}
              disabled={disabled}
              handleResendOTP={handleResendOTP}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
