import { BrowserRouter } from 'react-router-dom';
import Home, { DefaultContent } from "../src/pages/Home/Home";

describe('Home Page Rendering', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  describe('Should render components properly', () => {
    let getByText, getByTestId;

    beforeEach(() => {
      const renderOutput = render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      );
      getByText = renderOutput.getByText;
      getByTestId = renderOutput.getByTestId;

    });

    test('Should render Navbar', () =>  {
      expect(getByTestId("navbar-section")).toBeInTheDocument();
    });
    test('Should render Searchbar', () => {
      expect(getByTestId("searchbar-section")).toBeInTheDocument();
    });
    test('Should render Trending Videos', () => {
      expect(getByText('Trending')).toBeInTheDocument();
      expect(getByTestId("trending-list")).toBeInTheDocument();
    });
    test('Should render Recommended Videos', () => {
      expect(getByText('Recommended for you')).toBeInTheDocument();
      expect(getByTestId("video-list")).toBeInTheDocument();
    });
  });
});
