import React from "react";
import SuccessfulImage from "../Images/95088-success.gif"; // import the image

const Success = () => {
  return (
    <div className="flex flex-col mt-4 items-center">
      <img src={SuccessfulImage} alt="GIF image" className="w-500 mx-auto" />
    </div>
  );
};

export default Success;
