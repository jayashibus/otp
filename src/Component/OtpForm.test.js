import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import OtpForm from "./OtpForm";

describe("OtpForm", () => {
  it("render six OTP input fields", () => {
    render(<OtpForm />);
    const inputFields = screen.getAllByTestId(
      /otp-(first|second|third|fourth|fifth|sixth)/i
    );
    expect(inputFields.length).toBe(6);
  });

  it("allow numeric OTP input fields", () => {
    render(<OtpForm />);
    const inputFields = screen.getAllByTestId(
      /otp-(first|second|third|fourth|fifth|sixth)/i
    );
    inputFields.forEach((input) => {
      fireEvent.change(input, { target: { value: "a" } });
      expect(input.value).toBe("");
      fireEvent.change(input, { target: { value: "1" } });
      expect(input.value).toBe("1");
    });
  });

  it("focus next input field when a digit is entered", () => {
    render(<OtpForm />);
    const inputFields = screen.getAllByTestId(
      /otp-(first|second|third|fourth|fifth|sixth)/i
    );
    const [firstInput, secondInput, thirdInput] = inputFields;

    fireEvent.change(firstInput, { target: { value: "1" } });
    expect(document.activeElement).toBe(secondInput);

    fireEvent.change(secondInput, { target: { value: "2" } });
    expect(document.activeElement).toBe(thirdInput);
  });

  it("call handleOtpValidate when the form is submitted", () => {
    const handleOtpValidate = jest.fn();
    render(<OtpForm handleOtpValidate={handleOtpValidate} />);
    const form = screen.getByTestId("otp-form");
    fireEvent.submit(form);
    expect(handleOtpValidate).toHaveBeenCalledTimes(1);
  });

  it("show invalid message", () => {
    const message = "Invalid OTP";
    render(<OtpForm message={message} />);
    const messageElement = screen.getByText(message);
    expect(messageElement).toBeInTheDocument();
  });

  it("check remaining time left", () => {
    const secondsLeft = 30;
    render(<OtpForm secondsLeft={secondsLeft} />);
    const timeElement = screen.getByText(
      `Code expire in ${secondsLeft} seconds`
    );
    expect(timeElement).toBeInTheDocument();
  });

  it("show the 'Verify' button if secondsLeft is greater than 0", () => {
    const secondsLeft = 30;
    render(<OtpForm secondsLeft={secondsLeft} />);
    const verifyButton = screen.getByText("Verify");
    expect(verifyButton).toBeInTheDocument();
  });

  it("OTP Time out", () => {
    const secondsLeft = 0;
    const handleResendOTP = jest.fn();
    render(
      <OtpForm secondsLeft={secondsLeft} handleResendOTP={handleResendOTP} />
    );
    const resendButton = screen.getByText("Resend New OTP");
    expect(resendButton).toBeInTheDocument();
  });

  test("displays code expired message and resend button when OTP retries exhausted", () => {
    const handleOtpValidate = jest.fn();
    const handleResendOTP = jest.fn();
    const message = "Incorrect OTP. 1 attempt left";
    const secondsLeft = 0;

    const { getByText } = render(
      <OtpForm
        handleOtpValidate={handleOtpValidate}
        handleResendOTP={handleResendOTP}
        message={message}
        secondsLeft={secondsLeft}
      />
    );

    expect(getByText("Code expired. Request new OTP")).toBeInTheDocument();
    expect(getByText("Resend New OTP")).toBeInTheDocument();

    const resendButton = screen.getByText("Resend New OTP");
    expect(resendButton).toBeInTheDocument();
  });

  it(" valid OTP", () => {
    const handleOtpValidate = jest.fn();
    const { getByTestId } = render(
      <OtpForm handleOtpValidate={handleOtpValidate} />
    );

    // Enter a valid OTP
    fireEvent.change(getByTestId("otp-first"), { target: { value: "1" } });
    fireEvent.change(getByTestId("otp-second"), { target: { value: "2" } });
    fireEvent.change(getByTestId("otp-third"), { target: { value: "3" } });
    fireEvent.change(getByTestId("otp-fourth"), { target: { value: "4" } });
    fireEvent.change(getByTestId("otp-fifth"), { target: { value: "5" } });
    fireEvent.change(getByTestId("otp-sixth"), { target: { value: "6" } });
    fireEvent.submit(getByTestId("otp-form"));

    expect(handleOtpValidate).toHaveBeenCalled();
  });
});
