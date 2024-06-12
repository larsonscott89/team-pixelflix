import "./App.scss";
import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Bookmarks from "./pages/Bookmarks/Bookmarks";
import Movies from "./pages/Movies/Movies";
import TV from "./pages/TV/TV";
import { useAuth } from "./context/AuthContext";

function App() {
  const { currentUser } = useAuth();

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/home"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
      <Route
        path="/Bookmarks"
        element={
          <RequireAuth>
            <Bookmarks />
          </RequireAuth>
        }
      />
      <Route
        path="/Movies"
        element={
          <RequireAuth>
            <Movies />
          </RequireAuth>
        }
      />
      <Route
        path="/TV"
        element={
          <RequireAuth>
            <TV />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;
