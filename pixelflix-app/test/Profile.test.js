import { BrowserRouter } from 'react-router-dom';
import { fireEvent, waitFor } from "@testing-library/react";
import Home from "../src/pages/Home/Home";
import Profile from '../src/pages/Profile/Profile';
import { signOut } from 'firebase/auth';
import { auth } from '../src/firebase-config'; 
import { useLocation } from "react-router-dom";
import userInfo from "../src/pages/Profile/Profile"

jest.mock("../src/context/VideosContext", () => {
  const setSearchQuery = jest.fn();
  return {
    useVideos: jest.fn().mockReturnValue({
      setSearchQuery,
    }),
  }
});

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn().mockReturnValue({ pathname: "/" }),
}));


// jest.mock("../src/firebase-config", () => ({
//   getAuth: jest.fn(() => ({
//     signOut: jest.fn(() => Promise.resolve()),
//   })),
// }));

// jest.mock('react-router-dom', () => ({
//   useNavigate: jest.fn(),
// }));

describe('Profile Page Rendering', () => {
  beforeEach(() => {
    const homeOutput = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    fireEvent.click(homeOutput.getByTestId("navbar-profile-picture"));
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  describe('Should render components properly', () => {
    let getByTestId;

    beforeEach(() => {
      const renderOutput = render(
        <BrowserRouter>
          <Profile />
        </BrowserRouter>
      );
      getByTestId = renderOutput.getByTestId;
    });

    test('Should render Navbar', () =>  {
      // expect(getByTestId('profile-header')).toBeInTheDocument();
      expect(getByTestId("navbar-section")).toBeInTheDocument();
    });
    test('Should render Searchbar', () => {
      // expect(getByTestId('profile-header')).toBeInTheDocument();
      expect(getByTestId("searchbar-section")).toBeInTheDocument();
    });
    // test('Should render Profile', () => {
    //   expect(getByTestId('profile-header')).toBeInTheDocument();
    // });
  });
});

describe('Profile Page Functionality', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should Signout and redirect to /Login upon clicking Signout button ', async () =>{

    const { getByRole } = render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );

    fireEvent.click(getByRole("button", { name: "Sign Out" }));
    expect(signOut).toHaveBeenCalled();

    await waitFor(() => {
      expect(window.location.pathname).toBe('/login');
    });
  });
});

describe('username should render from email name', () => {
  test('username displays', () => {
    const { getByTestId } = render(<userInfo/>)
    const userName = getByTestId('user-info')
    expect(userName).toBe(email)
  })
})
