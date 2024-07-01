import { fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Signup from "../src/pages/Signup/Signup";
import { auth, createUserWithEmailAndPassword } from "../src/firebase-config";

// Mock Firebase auth function
jest.mock("../src/firebase-config", () => ({
  auth: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
}));

describe("Signup Page Rendering", () => {
  test("Should render Signup form", () => {
    const { getByText, getByPlaceholderText, getByRole } = render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );
    expect(getByPlaceholderText("Email address")).toBeInTheDocument();
    expect(getByPlaceholderText("Password")).toBeInTheDocument();
    expect(getByPlaceholderText("Repeat password")).toBeInTheDocument();
    expect(getByRole("button", { name: "Create an account" })).toBeInTheDocument();
    expect(getByText("Already have an account?")).toBeInTheDocument();
  });
})

describe("Signup Error Handling", () => {
  let getByPlaceholderText, getByRole, getByText, queryByText;

  beforeEach(() => {
    const renderOutput = render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );
    getByPlaceholderText = renderOutput.getByPlaceholderText;
    getByRole = renderOutput.getByRole;
    getByText = renderOutput.getByText;
    queryByText = renderOutput.queryByText;

    window.alert = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Should throw error message for empty fields", () => {

    test("Email is empty", async () => {
      const emailInput = getByPlaceholderText("Email address");
      const passwordInput = getByPlaceholderText("Password");
      const repeatPasswordInput = getByPlaceholderText("Repeat password");
      const submitButton = getByRole("button", { name: "Create an account" });

      // Make sure error is not initially present
      expect(queryByText("Can't be empty")).toBeNull();

      fireEvent.change(emailInput, { target: { value: "" } });
      fireEvent.change(passwordInput, { target: { value: "Strongp4ssw0rd!" } });
      fireEvent.change(repeatPasswordInput, { target: { value: "Strongp4ssw0rd!" } });

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(getByText("Can\'t be empty")).toBeInTheDocument();
        expect(createUserWithEmailAndPassword).not.toHaveBeenCalled();
      });
    });

    test("Password is empty", async () => {
      const emailInput = getByPlaceholderText("Email address");
      const passwordInput = getByPlaceholderText("Password");
      const repeatPasswordInput = getByPlaceholderText("Repeat password");
      const submitButton = getByRole("button", { name: "Create an account" });

      // Make sure error is not initially present
      expect(queryByText("Can't be empty")).toBeNull();

      fireEvent.change(emailInput, { target: { value: "valid@email.com" } });
      fireEvent.change(passwordInput, { target: { value: "" } });
      fireEvent.change(repeatPasswordInput, { target: { value: "Strongp4ssw0rd!" } });

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(getByText("Can\'t be empty")).toBeInTheDocument();
        expect(createUserWithEmailAndPassword).not.toHaveBeenCalled();
      });
    });

    test("Repeated Password is empty", async () => {
      const emailInput = getByPlaceholderText("Email address");
      const passwordInput = getByPlaceholderText("Password");
      const repeatPasswordInput = getByPlaceholderText("Repeat password");
      const submitButton = getByRole("button", { name: "Create an account" });

      // Make sure error is not initially present
      expect(queryByText("Can't be empty")).toBeNull();

      fireEvent.change(emailInput, { target: { value: "valid@email.com" } });
      fireEvent.change(passwordInput, { target: { value: "Strongp4ssw0rd!" } });
      fireEvent.change(repeatPasswordInput, { target: { value: "" } });

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(getByText("Can\'t be empty")).toBeInTheDocument();
        expect(createUserWithEmailAndPassword).not.toHaveBeenCalled();
      });
    });

    test("All fields are empty", async() => {
      const emailInput = getByPlaceholderText("Email address");
      const passwordInput = getByPlaceholderText("Password");
      const repeatPasswordInput = getByPlaceholderText("Repeat password");
      const submitButton = getByRole("button", { name: "Create an account" });

      // Make sure error is not initially present
      expect(queryByText("Can't be empty")).toBeNull();

      fireEvent.change(emailInput, { target: { value: "" } });
      fireEvent.change(passwordInput, { target: { value: "" } });
      fireEvent.change(repeatPasswordInput, { target: { value: "" } });
      
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(getByText("Can\'t be empty")).toBeInTheDocument();
        expect(createUserWithEmailAndPassword).not.toHaveBeenCalled();
      });
    });
  });

  test("Should throw error message for invalid email", async () => {
    const emailInput = getByPlaceholderText("Email address");
    const submitButton = getByRole("button", { name: "Create an account" });

    // Make sure error is not initially present
    expect(queryByText("Invalid email")).toBeNull();

    fireEvent.change(emailInput, { target: { value: "invalidemail" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByText("Invalid email")).toBeInTheDocument();
      expect(createUserWithEmailAndPassword).not.toHaveBeenCalled();
    });
  });

  test("Should throw error message when password does not follow password rules", async () => {
    const emailInput = getByPlaceholderText("Email address");
    const passwordInput = getByPlaceholderText("Password");
    const submitButton = getByRole("button", { name: "Create an account" });

    fireEvent.change(emailInput, { target: { value: "valid@email.com" } });
    fireEvent.change(passwordInput, { target: { value: "weak" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol, and be at least 8 characters long."
      );
      expect(createUserWithEmailAndPassword).not.toHaveBeenCalled();
    });
  });

  test("Should throw error message when repeated password does not match password", async () => {
    const emailInput = getByPlaceholderText("Email address");
    const passwordInput = getByPlaceholderText("Password");
    const repeatPasswordInput = getByPlaceholderText("Repeat password");
    const submitButton = getByRole("button", { name: "Create an account" });

    // Make sure error is not initially present
    expect(queryByText("Passwords don\'t match")).toBeNull();
    
    fireEvent.change(emailInput, { target: { value: "valid@email.com" } });
    fireEvent.change(passwordInput, { target: { value: "Strongp4ssw0rd!" } });
    fireEvent.change(repeatPasswordInput, { target: { value: "incorrect" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByText("Passwords don\'t match")).toBeInTheDocument();
      expect(createUserWithEmailAndPassword).not.toHaveBeenCalled();
    });
  });
})