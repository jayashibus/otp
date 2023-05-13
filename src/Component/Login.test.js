import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import Login from "./Login";
import useCountdown from "../Hooks/useCountDown";
import Success from "./Success";
import { generate_OTP_email, check_OTP } from "emailotp";

describe("Login", () => {
  it("should render the component correctly", () => {
    const { getByText, getByPlaceholderText } = render(<Login />);
    const emailInput = getByText("Email");
    const generateOtpButton = getByText("Generate OTP");
    expect(getByText("Login")).toBeTruthy();
    expect(emailInput).toBeInTheDocument();
    expect(getByPlaceholderText("Enter the email")).toBeTruthy();
    expect(generateOtpButton).toBeInTheDocument();
  });

  it("Check invalid email button is clicked", async () => {
    const { getByText, getByPlaceholderText, getByLabelText } = render(
      <Login />
    );

    const emailInput = getByPlaceholderText("Enter the email");
    const submitButton = getByText("Generate OTP");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.click(submitButton);

    // expect("Email address is invalid").toBeInTheDocument();
    const errorMessage = await waitFor(() =>
      getByText("Email address is invalid")
    );
    expect(errorMessage).toBeInTheDocument();

    //expect(mockGenerateOTPEmail).toBeCalledWith("test@example.com");
  });

  it("Check valid email. when the `Submit` button is clicked", async () => {
    const { getByText, getByPlaceholderText, getByLabelText } = render(
      <Login />
    );

    const emailInput = getByPlaceholderText("Enter the email");
    const submitButton = getByText("Generate OTP");

    fireEvent.change(emailInput, { target: { value: "tester1@dso.org.sg" } });
    fireEvent.click(submitButton);

    // expect("Email address is invalid").toBeInTheDocument();
    const errorMessage = await waitFor(() => getByText("OTP Verification"));
    expect(errorMessage).toBeInTheDocument();

    //expect(mockGenerateOTPEmail).toBeCalledWith("test@example.com");
  });

  test("generates OTP on form submission", () => {
    const { getByLabelText, getByText, getByPlaceholderText } = render(
      <Login />
    );
    const emailInput = getByPlaceholderText("Enter the email");
    const generateOtpButton = getByText("Generate OTP");
    fireEvent.change(emailInput, { target: { value: "tester1@dso.org.sg" } });
    fireEvent.click(generateOtpButton);

    const verifyOtpButton = getByText("Verify");

    expect(verifyOtpButton).toBeInTheDocument();
  });

  //   test("Verifies OTP on form submission", async () => {
  //     const { getByLabelText, getByText, getByPlaceholderText, getByTestId } =
  //       render(<Login />);
  //     const emailInput = getByPlaceholderText("Enter the email");
  //     const generateOtpButton = getByText("Generate OTP");
  //     fireEvent.change(emailInput, { target: { value: "tester1@dso.org.sg" } });
  //     fireEvent.click(generateOtpButton);
  //     const otpInput = getByText("Verify");

  //     const userDetails = { user_email: "tester1@dso.org.sg", otp: "123456" };
  //     //const verifyOTP = check_OTP(userDetails);

  //     fireEvent.change({ check_OTP: { value: userDetails } });

  //     fireEvent.click(otpInput);

  //     const successMessage = await waitFor(() =>
  //       getByText("Invalid OTP code. 9 tries remaining.")
  //     );
  //     expect(successMessage).toBeInTheDocument();
  //   });

  //   it("should display error message when email is invalid", () => {
  //     const { getByLabelText, getByTestId } = render(<Login />);
  //     const emailInput = getByLabelText("Email");
  //     const submitButton = getByTestId("submit-button");
  //     fireEvent.change(emailInput, { target: { value: "invalid-email" } });
  //     fireEvent.click(submitButton);
  //     const errorMessage = getByTestId("email-error");
  //     expect(errorMessage).toBeInTheDocument();
  //   });
});
