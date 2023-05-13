import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Login from "./Login";
import useCountdown from "../Hooks/useCountDown";
import Success from "./Success";
import OtpForm from "./OtpForm";

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

  //   it("displays a success message when entering a valid OTP", async () => {
  //     const {
  //       getByLabelText,
  //       getByText,
  //       getByPlaceholderText,
  //       getAllByTestId,
  //       getByTestId,
  //     } = render(<Login />);
  //     const emailInput = getByPlaceholderText("Enter the email");
  //     const submitButton = getByText("Generate OTP");

  //     fireEvent.change(emailInput, { target: { value: "valid@dso.org.sg" } });
  //     fireEvent.click(submitButton);

  //     const firstInput = getByTestId("otp-first");
  //     const secondInput = getByTestId("otp-second");
  //     const thirdInput = getByTestId("otp-third");
  //     const fourthInput = getByTestId("otp-fourth");
  //     const fifthInput = getByTestId("otp-fifth");
  //     const sixthInput = getByTestId("otp-sixth");

  //     fireEvent.change(firstInput, { target: { value: "1" } });
  //     fireEvent.change(secondInput, { target: { value: "2" } });
  //     fireEvent.change(thirdInput, { target: { value: "3" } });
  //     fireEvent.change(fourthInput, { target: { value: "4" } });
  //     fireEvent.change(fifthInput, { target: { value: "5" } });
  //     fireEvent.change(sixthInput, { target: { value: "6" } });

  //     fireEvent.submit(getByTestId("otp-input"));

  //     //expect(getByText("Invalid OTP code")).toBeInTheDocument();

  //     const errorMessage = await waitFor(() => getByText("Invalid"));
  //     expect(errorMessage).toBeInTheDocument();
  //   });

  //   test("displays an error message when an invalid OTP code is entered", async () => {
  //     const { getByLabelText, getByText, getByPlaceholderText, getByTestId } =
  //       render(<OtpForm />);

  //     const otpInput = screen.getByTestId("otp-input");
  //     // Fill out the form
  //     const firstInput = getByTestId("first");
  //     const secondInput = getByTestId("second");
  //     const thirdInput = getByTestId("third");
  //     const fourthInput = getByTestId("fourth");
  //     const fifthInput = getByTestId("fifth");
  //     const sixthInput = getByTestId("sixth");

  //     fireEvent.change(firstInput, { target: { value: "1" } });
  //     fireEvent.change(secondInput, { target: { value: "2" } });
  //     fireEvent.change(thirdInput, { target: { value: "3" } });
  //     fireEvent.change(fourthInput, { target: { value: "4" } });
  //     fireEvent.change(fifthInput, { target: { value: "5" } });
  //     fireEvent.change(sixthInput, { target: { value: "6" } });

  //     // fireEvent.change(otpInput, { target: { value: "123456" } });

  //     const submitButton = screen.getByRole("button", { name: /Verify/i });
  //     fireEvent.click(submitButton);

  //     await waitFor(() => {
  //       expect(screen.getByText("OTP is valid and checked")).toBeInTheDocument();
  //     });
  //   });

  //   test("should show countdown timer after successful email submission", async () => {
  //     jest.useFakeTimers();

  //     const {
  //       getByLabelText,
  //       getByRole,
  //       findByText,
  //       getByText,
  //       getByPlaceholderText,
  //     } = render(<Login />);

  //     const emailInput = getByPlaceholderText("Enter the email");
  //     const submitButton = getByText("Generate OTP");

  //     fireEvent.change(emailInput, { target: { value: "tester1@dso.org.sg" } });
  //     fireEvent.click(submitButton);

  //     expect(await findByText(/OTP Verification/i)).toBeInTheDocument();
  //     expect(await findByText(/Code expire in/i)).toBeInTheDocument();

  //     act(() => {
  //       jest.advanceTimersByTime(60000);
  //     });

  //     expect(await findByText(/Verify/i)).toBeInTheDocument();
  //   });

  //   test("should display success message if otp is valid", () => {
  //     const { getByLabelText, getByRole, getByText, getByPlaceholderText } =
  //       render(<Login />);
  //     const emailInput = getByPlaceholderText("Enter the email");
  //     const sendOtpButton = getByText("Generate OTP");
  //     fireEvent.change(emailInput, { target: { value: "test@dso.org.sg" } });
  //     fireEvent.click(sendOtpButton);
  //     const otpInputs = getByText(/OTP Verification/i);
  //     otpInputs.textContent = "123456";
  //     const verifyOtpButton = getByText("Verify");
  //     fireEvent.click(verifyOtpButton);
  //     const successMessage = getByText("Invalid OTP code. 9 tries remaining.");
  //     expect(successMessage).toBeInTheDocument();
  //   });
});

// describe("Login component", () => {
//   const validEmail = "test@dso.org.sg";

//   beforeAll(() => {
//     // mock localStorage
//     const localStorageMock = (() => {
//       let store = {};
//       return {
//         getItem: (key) => store[key] || null,
//         setItem: (key, value) => (store[key] = value.toString()),
//         removeItem: (key) => delete store[key],
//         clear: () => (store = {}),
//       };
//     })();
//     Object.defineProperty(window, "localStorage", {
//       value: localStorageMock,
//     });
//   });

//   afterEach(() => {
//     localStorage.clear();
//   });

//   it("submits a valid email address and OTP", async () => {
//     const { getByLabelText, getByText, getByPlaceholderText, getByTestId } =
//       render(<Login />);
//     const emailInput = getByPlaceholderText("Enter the email");
//     const submitButton = getByText("Generate OTP");
//     fireEvent.change(emailInput, { target: { value: validEmail } });
//     fireEvent.click(submitButton);

//     await act(async () => {
//       // wait for the OTP to be generated and displayed
//       await new Promise((resolve) => setTimeout(resolve, 500));
//     });

//     // Fill out the form
//     const firstInput = getByTestId("first");
//     const secondInput = getByTestId("second");
//     const thirdInput = getByTestId("third");
//     const fourthInput = getByTestId("fourth");
//     const fifthInput = getByTestId("fifth");
//     const sixthInput = getByTestId("sixth");

//     fireEvent.change(firstInput, { target: { value: "1" } });
//     fireEvent.change(secondInput, { target: { value: "2" } });
//     fireEvent.change(thirdInput, { target: { value: "3" } });
//     fireEvent.change(fourthInput, { target: { value: "4" } });
//     fireEvent.change(fifthInput, { target: { value: "5" } });
//     fireEvent.change(sixthInput, { target: { value: "6" } });

//     // Submit the form
//     const submitVButton = getByText("Verify");
//     fireEvent.click(submitVButton);

//     // wait for the success message to be displayed

//     const successMessage = getByText("Invalid OTP code. 9 tries remaining");
//     expect(successMessage).toBeInTheDocument();

//     await waitFor(() => {
//       expect(
//         screen.getByText(/Invalid OTP code\. \d+ tries remaining\./i)
//       ).toBeInTheDocument();
//     });
//   });
// });
