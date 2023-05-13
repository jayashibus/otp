import React, { useRef } from "react";

const OtpForm = ({ handleOtpValidate, message, secondsLeft }) => {
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);
  const input5Ref = useRef(null);
  const input6Ref = useRef(null);

  const handleInputChange = (e, inputRef) => {
    const input = e.target;
    const maxLength = input.maxLength;

    if (input.value.length === maxLength && inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div>
      <form
        className="space-y-5"
        onSubmit={handleOtpValidate}
        data-testid="otp-input"
      >
        <div
          id="otp"
          className="flex flex-row justify-center text-center px-2 mt-5"
        >
          <input
            className="m-2 border h-10 w-10 text-center form-control rounded"
            type="number"
            name="first"
            data-testid="otp-first"
            maxLength="1"
            min="0"
            max="9"
            ref={input1Ref}
            onChange={(e) => handleInputChange(e, input2Ref)}
            required
          />

          <input
            className="m-2 border h-10 w-10 text-center form-control rounded"
            type="number"
            data-testid="otp-second"
            name="second"
            maxLength="1"
            min="0"
            max="9"
            ref={input2Ref}
            onChange={(e) => handleInputChange(e, input3Ref)}
            required
          />
          <input
            className="m-2 border h-10 w-10 text-center form-control rounded"
            type="number"
            name="third"
            data-testid="otp-third"
            maxLength="1"
            min="0"
            max="9"
            ref={input3Ref}
            onChange={(e) => handleInputChange(e, input4Ref)}
            required
          />
          <input
            className="m-2 border h-10 w-10 text-center form-control rounded"
            type="number"
            name="fourth"
            data-testid="otp-fourth"
            maxLength="1"
            min="0"
            max="9"
            ref={input4Ref}
            onChange={(e) => handleInputChange(e, input5Ref)}
            required
          />
          <input
            className="m-2 border h-10 w-10 text-center form-control rounded"
            type="number"
            name="fifth"
            data-testid="otp-fifth"
            maxLength="1"
            min="0"
            max="9"
            ref={input5Ref}
            onChange={(e) => handleInputChange(e, input6Ref)}
            required
          />
          <input
            className="m-2 border h-10 w-10 text-center form-control rounded"
            type="number"
            name="sixth"
            data-testid="otp-sixth"
            maxLength="1"
            min="0"
            max="9"
            ref={input6Ref}
            onChange={(e) => handleInputChange(e, input6Ref)}
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
              Code expire in {secondsLeft > 0 && `${secondsLeft}`} seconds
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
    </div>
  );
};

export default OtpForm;
