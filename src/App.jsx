import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import Admin from './components/Admin';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProfilePage from './components/userProfile';


const App = () => {
  return (
    <div style={{width:'100%', height:'100vh'}}>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />


        <Route path="/register" element={<Register />} />
        
        <Route path="/Admin" element={<Admin />} />

        <Route path="/homepage" element={<Homepage />} />
        <Route path="/Userprofile" element={<UserProfilePage />} />


      </Routes>
    </Router>
    </div>
  );
};

export default App;