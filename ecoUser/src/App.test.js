// import jest from "@testing-library/jest-dom";
import { __esModule } from "@testing-library/jest-dom/dist/matchers";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "./components/auth/Login";

jest.mock("axios", () => {
  __esModule: true;
});
test("email", () => {
  let { getByRole, getByPlaceholderText } = render(<Login />);
  const email = screen.getByPlaceholderText(/email/i);
  expect(email).toBeInTheDocument();
  expect(email.value).toBe("");

  fireEvent.change(email, { target: { value: "shubama@gmail.com" } });
  expect(email.value).toBe("shubama@gmail.com");
});
test("password", () => {
  let { getByRole, getByPlaceholderText } = render(<Login />);

  const password = screen.getByPlaceholderText(/password/i);
  expect(password).toBeInTheDocument();
  expect(password.value).toBe("");
  fireEvent.change(password, { target: { value: "harish123" } });
  expect(password.value).toBe("harish123");
});

test("login btn", () => {
  let { getByRole, getByPlaceholderText } = render(<Login />);

  const loginBtn = screen.getByTestId("login-btn");

  expect(loginBtn).toBeInTheDocument();
});
