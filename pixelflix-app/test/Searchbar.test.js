import { useLocation } from "react-router-dom";
import Searchbar from "../src/components/Searchbar/Searchbar";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn().mockReturnValue({ pathname: "/" }),
}));

describe("Navbar Component Rendering", () => {
  test("Should render searchbar correctly", () => {
    const { getByTestId } = render(<Searchbar />);

    expect(getByTestId("searchbar-section")).toBeInTheDocument();
    expect(getByTestId("search-icon")).toBeInTheDocument();
  });

  describe("Displays correct text based on route", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    const routes = [
      { path: "/home", text: "Search for movies or TV series"},
      { path: "/movies", text: "Search for movies"},
      { path: "/tv", text: "Search for TV series"},
      { path: "/bookmarks", text: "Search for bookmarked shows"},
    ];
    routes.forEach(({ path, text }) => {
      test(`Should display correct text for "${path}"`, () => {
        useLocation.mockReturnValue({ pathname: path });
        const { getByPlaceholderText } = render(<Searchbar />);
        expect(getByPlaceholderText(text)).toBeInTheDocument();
      });
    });
  });
});