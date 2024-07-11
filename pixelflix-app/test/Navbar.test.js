import { BrowserRouter, useLocation } from "react-router-dom";
import { fireEvent } from "@testing-library/react";
import Navbar from "../src/components/Navbar/Navbar";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn().mockReturnValue({ pathname: "/" }),
}));

describe("Navbar Component Rendering", () => {
  test("Should render svgs correctly", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(getByTestId("navbar-section")).toBeInTheDocument();
    expect(getByTestId("navbar-logo")).toBeInTheDocument();
    expect(getByTestId("navbar-home-icon")).toBeInTheDocument();
    expect(getByTestId("navbar-movies-icon")).toBeInTheDocument();
    expect(getByTestId("navbar-tv-icon")).toBeInTheDocument();
    expect(getByTestId("navbar-bookmarks-icon")).toBeInTheDocument();
    expect(getByTestId("navbar-profile-picture")).toBeInTheDocument();
  });
});

describe("Navbar Functionality", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Should navigate to correct routes", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    fireEvent.click(getByTestId("navbar-home-icon"));
    expect(window.location.pathname).toBe("/home");

    fireEvent.click(getByTestId("navbar-movies-icon"));
    expect(window.location.pathname).toBe("/movies");

    fireEvent.click(getByTestId("navbar-tv-icon"));
    expect(window.location.pathname).toBe("/tv");

    fireEvent.click(getByTestId("navbar-bookmarks-icon"));
    expect(window.location.pathname).toBe("/bookmarks");
  });

  const routes = [
    { path: "/home", label: "navbar-home-icon" },
    { path: "/movies", label: "navbar-movies-icon" },
    { path: "/tv", label: "navbar-tv-icon" },
    { path: "/bookmarks", label: "navbar-bookmarks-icon" },
  ];

  routes.forEach(({ path, label }) => {
    test(`Should highlight active link for "${path}"`, () => {
      useLocation.mockReturnValue({pathname: path});

      const { getByTestId } = render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      expect(getByTestId(label).classList.contains("highlight")).toBe(true);
    });
  });
});