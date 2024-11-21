import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography, Box } from '@mui/material';

const Homepage = () => {
  const navigate = useNavigate();

  const handleProfileRedirect = () => {
    navigate('/Userprofile'); 
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
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
          Welcome to the Homepage
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

        <Box sx={{ marginTop: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleProfileRedirect}
          >
            Take me to my Profile
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Homepage;
