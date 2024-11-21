import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Box, Grid, Avatar, IconButton } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

const UserProfilePage = () => {
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [profileImg, setprofileImg] = useState(null); 
  const [base64Image, setBase64Image] = useState(''); 
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') setUsername(value);
    if (name === 'bio') setBio(value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setprofileImg(URL.createObjectURL(file)); 
        setBase64Image(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axios.post('/api/v1/postbio', {
        username,
        bio,
        profileImg: base64Image,
      });

      setSuccessMessage(response.data.message);
    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'Profile update failed');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <Typography variant="h4" gutterBottom>
          User Profile
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Avatar
            src={profileImg || 'https://via.placeholder.com/150'} 
            sx={{ width: 150, height: 150 }}
          />
          <label htmlFor="profile-picture">
            <input
              accept="image/*"
              id="profile-picture"
              type="file"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
            <IconButton color="primary" component="span" sx={{ mt: 2 }}>
              <PhotoCamera />
            </IconButton>
          </label>
        </Box>

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Grid container spacing={2}>
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
                label="Bio"
                variant="outlined"
                fullWidth
                name="bio"
                value={bio}
                onChange={handleInputChange}
                multiline
                rows={4}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" fullWidth type="submit">
                Update Profile
              </Button>
            </Grid>
          </Grid>
        </form>

        {errorMessage && (
          <Typography color="error" variant="body2" sx={{ marginTop: 2 }}>
            {errorMessage}
          </Typography>
        )}
        {successMessage && (
          <Typography color="primary" variant="body2" sx={{ marginTop: 2 }}>
            {successMessage}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default UserProfilePage;
