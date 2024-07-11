import { BrowserRouter } from 'react-router-dom';
import { fireEvent } from "@testing-library/react";
import Home from "../src/pages/Home/Home";
import TV from '../src/pages/TV/TV';

jest.mock("../src/context/VideosContext", () => {
  const setSearchQuery = jest.fn();
  return {
    useVideos: jest.fn().mockReturnValue({
      setSearchQuery,
    }),
  }
});

describe('TV Page Rendering', () => {
  beforeEach(() => {
    const homeOutput = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    fireEvent.click(homeOutput.getByTestId("navbar-tv-icon"));
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  describe('Should render components properly', () => {
    let getByTestId;

    beforeEach(() => {
      const renderOutput = render(
        <BrowserRouter>
          <TV />
        </BrowserRouter>
      );
      getByTestId = renderOutput.getByTestId;
    });

    test('Should render Navbar', () =>  {
      // expect(getByTestId('tv-header')).toBeInTheDocument();
      expect(getByTestId("navbar-section")).toBeInTheDocument();
    });
    test('Should render Searchbar', () => {
      // expect(getByTestId('tv-header')).toBeInTheDocument();
      expect(getByTestId("searchbar-section")).toBeInTheDocument();
    });
    // test('Should render TV series', () => {
    //   expect(getByTestId('tv-header')).toBeInTheDocument();
    //   expect(getByTestId("video-list")).toBeInTheDocument();
    // });
  });
});
