import { BrowserRouter } from 'react-router-dom';
import { fireEvent } from "@testing-library/react";
import Home from "../src/pages/Home/Home";
import Bookmarks from '../src/pages/Bookmarks/Bookmarks';

jest.mock("../src/context/VideosContext", () => {
  const setSearchQuery = jest.fn();
  return {
    useVideos: jest.fn().mockReturnValue({
      setSearchQuery,
    }),
  }
});

describe('Bookmarks Page Rendering', () => {
  beforeEach(() => {
    const homeOutput = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    fireEvent.click(homeOutput.getByTestId("navbar-bookmarks-icon"));
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  describe('Should render components properly', () => {
    let getByTestId;

    beforeEach(() => {
      const renderOutput = render(
        <BrowserRouter>
          <Bookmarks />
        </BrowserRouter>
      );
      getByTestId = renderOutput.getByTestId;
    });

    test('Should render Navbar', () =>  {
      // expect(getByTestId('bookmarks-header')).toBeInTheDocument();
      expect(getByTestId("navbar-section")).toBeInTheDocument();
    });
    test('Should render Searchbar', () => {
      // expect(getByTestId('bookmarks-header')).toBeInTheDocument();
      expect(getByTestId("searchbar-section")).toBeInTheDocument();
    });
    // test('Should render Bookmarks series', () => {
    //   expect(getByTestId('bookmarks-header')).toBeInTheDocument();
    // });
  });
});
