import { BrowserRouter } from 'react-router-dom';
import { fireEvent } from "@testing-library/react";
import Home from "../src/pages/Home/Home";
import Movies from '../src/pages/Movies/Movies';

jest.mock("../src/context/VideosContext", () => {
  const setSearchQuery = jest.fn();
  return {
    useVideos: jest.fn().mockReturnValue({
      setSearchQuery,
    }),
  }
});

describe('Movie Page Rendering', () => {
  beforeEach(() => {
    const homeOutput = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    fireEvent.click(homeOutput.getByTestId("navbar-movies-icon"));
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  describe('Should render components properly', () => {
    let getByTestId;

    beforeEach(() => {
      const renderOutput = render(
        <BrowserRouter>
          <Movies />
        </BrowserRouter>
      );
      getByTestId = renderOutput.getByTestId;
    });

    test('Should render Navbar', () =>  {
      // expect(getByTestId('movies-header')).toBeInTheDocument();
      expect(getByTestId("navbar-section")).toBeInTheDocument();
    });
    test('Should render Searchbar', () => {
      // expect(getByTestId('movies-header')).toBeInTheDocument();
      expect(getByTestId("searchbar-section")).toBeInTheDocument();
    });
    // test('Should render Movies', () => {
    //   expect(getByTestId('movies-header')).toBeInTheDocument();
    //   expect(getByTestId("video-list")).toBeInTheDocument();
    // });
  });
});
