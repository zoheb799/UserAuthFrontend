import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography, Box } from '@mui/material';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { UserContext } from '../context/Usercontex';
const Adminpage = () => {
  const { setUserId } = useContext(UserContext);
  const {setUserRole} = useContext(UserContext)
  const navigate = useNavigate();

  const handleProfileRedirect = () => {
    navigate('/Userprofile'); 
  };

  const handlelogout = async () => {
    try {
      await axios.post("/api/v1/logout", {}, { withCredentials: true });

      localStorage.removeItem("token");
      setUserId(null);
      setUserRole(null)
      toast.success("redirecting to login page ....");
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <ToastContainer />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 3,
          borderRadius: 1,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome to the Adminpage
        </Typography>

        <Typography variant="body1" paragraph>
          In this project, we have implemented two main tasks:
        </Typography>

        <Typography variant="body2" paragraph>
          <strong>Task 1:</strong> User Login and Registration with JWT Authentication. This allows users to securely log in, register, and authenticate their sessions using a JWT token.
        </Typography>

        <Typography variant="body2" paragraph>
          <strong>Task 2:</strong> Users can edit their bio and profile picture on the Profile page. After logging in, users can upload a new profile image and update their bio, which is saved and displayed on their profile.
        </Typography>

        <Box sx={{ marginTop: 3, display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleProfileRedirect}
          >
            Take me to my Profile
          </Button>
          <Button variant="contained" color="primary" onClick={handlelogout}>
            Logout
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Adminpage;
