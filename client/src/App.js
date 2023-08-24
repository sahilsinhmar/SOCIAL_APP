import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./index.css";
import { Login } from "./Pages/Login";
import { Home } from "./Pages/Home";
import { Profile } from "./Pages/Profile";
import { Signup } from "./Pages/Signup";
import { About } from "./Pages/About";

function App() {
  const token = useSelector((state) => state.token);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/home" /> : <Login />} />
        <Route
          path="/login"
          element={token ? <Navigate to="/home" /> : <Login />}
        />
        <Route
          path="/signup"
          element={token ? <Navigate to="/home" /> : <Signup />}
        />
        <Route path="/home" element={token ? <Home /> : <Navigate to="/" />} />
        <Route
          path="/profile/:userId"
          element={token ? <Profile /> : <Navigate to="/" />}
        />
        <Route
          path="/about"
          element={token ? <About /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
