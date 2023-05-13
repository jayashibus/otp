import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Login from "./Login";
import useCountdown from "../Hooks/useCountDown";
import Success from "./Success";
import { generate_OTP_email, check_OTP } from "emailotp";

describe("Login Form  Component", () => {
  it("should render the component correctly", () => {
    const { getByText, getByPlaceholderText } = render(<Login />);
    const emailInput = getByText("Email");
    const generateOtpButton = getByText("Generate OTP");
    expect(getByText("Login")).toBeTruthy();
    expect(emailInput).toBeInTheDocument();
    expect(getByPlaceholderText("Enter the email")).toBeTruthy();
    expect(generateOtpButton).toBeInTheDocument();
  });

  it("rejects an invalid email address format", async () => {
    const { getByText, getByPlaceholderText, getByLabelText } = render(
      <Login />
    );

    const emailInput = getByPlaceholderText("Enter the email");
    const submitButton = getByText("Generate OTP");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.click(submitButton);

    const errorMessage = await waitFor(() =>
      getByText("Email address is invalid")
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it("accepts a valid email address", async () => {
    const { getByText, getByPlaceholderText, getByLabelText } = render(
      <Login />
    );

    const emailInput = getByPlaceholderText("Enter the email");
    const submitButton = getByText("Generate OTP");

    fireEvent.change(emailInput, { target: { value: "tester1@dso.org.sg" } });
    fireEvent.click(submitButton);

    const errorMessage = await waitFor(() => getByText("OTP Verification"));
    expect(errorMessage).toBeInTheDocument();
  });

  it("Reject invalid email subdoamin", async () => {
    const { getByText, getByPlaceholderText, getByLabelText } = render(
      <Login />
    );

    const emailInput = getByPlaceholderText("Enter the email");
    const submitButton = getByText("Generate OTP");

    fireEvent.change(emailInput, {
      target: { value: "test@tester1@proc.dso.org.sg" },
    });
    fireEvent.click(submitButton);

    const errorMessage = await waitFor(() =>
      getByText("Email address is invalid")
    );
    expect(errorMessage).toBeInTheDocument();
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
});
