import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Container, Grid, Link } from '@mui/material';
import { UserContext } from '../context/Usercontex';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import signup from '../assets/images/signup-image.jpg';

const LoginPage = () => {
  const { setUserId } = useContext(UserContext);
  const {setUserRole} = useContext(UserContext)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/v1/login', {
        email,
        password,
      });

      // Save the token in cookies
      document.cookie = `token=${response.data.token}; path=/; max-age=3600`;

      // Store user data
      localStorage.setItem('user', JSON.stringify(response.data.user));
      console.log(response.data.user);
      

      setUserId(response.data.user._id);
      setUserRole(response.data.user.role)
      toast.success(response.data.message);

      // Navigate based on role
      if (response.data.user.role === 'Admin') {
        navigate('/Admin');
      } else if (response.data.user.role === 'Viewer') {
        navigate('/Homepage');
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Login failed');
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
            <img src={signup} alt="image logo" style={{ width: '100%', borderRadius: '10px' }} />
          </Box>
        </Grid>

        {/* Login Form */}
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
              Login
            </Typography>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <Grid container spacing={3}>
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
                  <Button variant="contained" color="primary" fullWidth type="submit">
                    Login
                  </Button>
                </Grid>
              </Grid>
            </form>
            <Typography sx={{ textAlign: 'center', marginTop: 2 }}>
              Don&apos;t have an account?{' '}
              <Link href="/register" variant="body2">
                Sign up
              </Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
