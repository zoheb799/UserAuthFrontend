import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProfilePage from "./components/userProfile";
import { UserContext } from "./context/Usercontex";
import Adminpage from "./components/Admin";

const App = () => {
  const { userId } = useContext(UserContext);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Router>
        <Routes>
          <Route path="/" element={userId ? <Homepage /> : <Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Admin" element={userId ? <Adminpage /> : <Login />} />
          <Route path="/homepage" element={userId ? <Homepage /> : <Login />} />
          <Route path="/Userprofile" element={userId ? <UserProfilePage /> : <Login />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
