import React from "react";
import SuccessfulImage from "../Images/95088-success.gif"; // import the image

const Success = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-400">
      <div className="bg-white p-16 rounded shadow-2x1 w-1/2">
        <h1 className="text-2xl font-bold text-center">OTP Verification</h1>
        <div className="flex flex-col mt-4 items-center">
          <span className="font-bold">OTP is valid and checked</span>
        </div>
        <div className="flex flex-col mt-4 items-center">
          <img src={SuccessfulImage} alt="Success" className="w-500 mx-auto" />
        </div>
      </div>
    </div>
  );
};

export default Success;
