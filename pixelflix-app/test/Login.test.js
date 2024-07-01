import { fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../src/pages/Login/Login";
import { auth, signInWithEmailAndPassword } from "../src/firebase-config";

// Mock Firebase auth function
jest.mock("../src/firebase-config", () => ({
  auth: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
}));

describe("Login Page Rendering", () => {
  test("Should render Login form", () => {
    const { getByText, getByPlaceholderText, getByRole } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    expect(getByPlaceholderText("Email address")).toBeInTheDocument();
    expect(getByPlaceholderText("Password")).toBeInTheDocument();
    expect(getByRole("button", { name: "Login to your account"})).toBeInTheDocument();
    expect(getByText("Don't have an account?")).toBeInTheDocument();
  });
})

describe("Login Error Handling", () => {
  let getByPlaceholderText, getByRole, getByText, queryByText;

  beforeEach(() => {
    const renderOutput = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    getByPlaceholderText = renderOutput.getByPlaceholderText;
    getByRole = renderOutput.getByRole;
    getByText = renderOutput.getByText;
    queryByText = renderOutput.queryByText;

  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Should throw error message for empty fields", () => {
    test("Email is empty", async () => {
      const emailInput = getByPlaceholderText("Email address");
      const passwordInput = getByPlaceholderText("Password");
      const submitButton = getByRole("button", { name: "Login to your account" });

      // Make sure error is not initially present
      expect(queryByText("Can't be empty")).toBeNull();

      fireEvent.change(emailInput, { target: { value: "" } });
      fireEvent.change(passwordInput, { target: { value: "Strongp4ssw0rd!" } });

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(getByText("Can\'t be empty")).toBeInTheDocument();
        expect(signInWithEmailAndPassword).not.toHaveBeenCalled();
      });
    });

    test("Password is empty", async () => {
      const emailInput = getByPlaceholderText("Email address");
      const passwordInput = getByPlaceholderText("Password");
      const submitButton = getByRole("button", { name: "Login to your account" });

      // Make sure error is not initially present
      expect(queryByText("Can't be empty")).toBeNull();

      fireEvent.change(emailInput, { target: { value: "valid@email.com" } });
      fireEvent.change(passwordInput, { target: { value: "" } });

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(getByText("Can\'t be empty")).toBeInTheDocument();
        expect(signInWithEmailAndPassword).not.toHaveBeenCalled();
      });
    });

    test("All fields are empty", async() => {
      const emailInput = getByPlaceholderText("Email address");
      const passwordInput = getByPlaceholderText("Password");
      const submitButton = getByRole("button", { name: "Login to your account" });

      // Make sure error is not initially present
      expect(queryByText("Can't be empty")).toBeNull();

      fireEvent.change(emailInput, { target: { value: "" } });
      fireEvent.change(passwordInput, { target: { value: "" } });
      
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(getByText("Can\'t be empty")).toBeInTheDocument();
        expect(signInWithEmailAndPassword).not.toHaveBeenCalled();
      });

    });
  });

  test("Should throw error message for invalid email", async () => {
    const emailInput = getByPlaceholderText("Email address");
    const submitButton = getByRole("button", { name: "Login to your account" });

    // Make sure error is not initially present
    expect(queryByText("Invalid email")).toBeNull();

    fireEvent.change(emailInput, { target: { value: "invalidemail" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByText("Invalid email")).toBeInTheDocument();
      expect(signInWithEmailAndPassword).not.toHaveBeenCalled();
    });
  });

  // test("Should throw error message when password is incorrect for valid email", async () => {
  //   const emailInput = getByPlaceholderText("Email address");
  //   const passwordInput = getByPlaceholderText("Password");
  //   const submitButton = getByRole("button", { name: "Login to your account" });

  //   fireEvent.change(emailInput, { target: { value: "valid@email.com" } });
  //   fireEvent.change(passwordInput, { target: { value: "weak" } });

  //   fireEvent.click(submitButton);
  // });
})