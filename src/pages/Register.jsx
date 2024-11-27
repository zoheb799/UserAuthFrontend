import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Container, Grid, Link, MenuItem } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import signupImage from '../assets/images/signup-image.jpg'; // Your signup image

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Viewer');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') setUsername(value);
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'role') setRole(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/v1/register', {
        username,
        email,
        password,
        role,
      });

      toast.success(response.data.message); // Success toast message
      setTimeout(() => {
        navigate('/'); // Redirect after success
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Registration failed'); // Error toast message
    }
  };

  return (
    <Container maxWidth="lg">
      <ToastContainer />
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh' }}
        spacing={2}
      >
        {/* Image Section */}
        <Grid item md={6} sm={12} xs={12} sx={{ display: { xs: 'none', md: 'block' } }}>
          <Box sx={{ textAlign: 'center' }}>
            <img src={signupImage} alt="Signup Image" style={{ width: '100%', borderRadius: '10px' }} />
          </Box>
        </Grid>

        {/* Signup Form */}
        <Grid item md={6} sm={12} xs={12}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 3,
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px',
              backgroundColor: 'white',
            }}
          >
            <Typography variant="h4" gutterBottom sx={{ marginBottom: 2 }}>
              Sign Up
            </Typography>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    name="username"
                    value={username}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    name="email"
                    type="email"
                    value={email}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    name="password"
                    type="password"
                    value={password}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    select
                    label="Role"
                    variant="outlined"
                    fullWidth
                    name="role"
                    value={role}
                    onChange={handleInputChange}
                    required
                  >
                    <MenuItem value="Viewer">Viewer</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" fullWidth type="submit">
                    Sign Up
                  </Button>
                </Grid>
              </Grid>
            </form>
            <Typography sx={{ textAlign: 'center', marginTop: 2 }}>
              Already have an account?{' '}
              <Link href="/login" variant="body2">
                Sign In
              </Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignupPage;
