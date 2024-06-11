import "./App.scss";
import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Bookmarks from "./pages/Bookmarks/Bookmarks";
import Movies from "./pages/Movies/Movies";
import TV from "./pages/TV/TV";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/Bookmarks" element={<Bookmarks />} />
      <Route path="/Movies" element={<Movies />} />
      <Route path="/TV" element={<TV />} />
    </Routes>
  );
}

export default App;
