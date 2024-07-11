import { fireEvent } from "@testing-library/react";
import { useLocation } from "react-router-dom";
import { useVideos } from '../src/context/VideosContext';
import Searchbar from "../src/components/Searchbar/Searchbar";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn().mockReturnValue({ pathname: "/" }),
}));

jest.mock("../src/context/VideosContext", () => {
  const setSearchQuery = jest.fn();
  return {
    useVideos: jest.fn().mockReturnValue({
    setSearchQuery,
    }),
  }
});

describe("Searchbar Component Rendering", () => {
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

describe("Searchbar Component Functionality", () => {
  test('Should call setSearchQuery with input value', () => {

    const { getByPlaceholderText } = render(
      <Searchbar />
    );

    const searchInput = getByPlaceholderText(/Search for/);
    fireEvent.change(searchInput, { target: { value: 'Comedy' } });

    expect(useVideos().setSearchQuery).toHaveBeenCalledWith('Comedy');
  });
});