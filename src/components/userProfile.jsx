import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Grid,
  Avatar,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
} from "@mui/material";
import { PhotoCamera, Edit as EditIcon } from "@mui/icons-material";
import { UserContext } from "../context/Usercontex";

const UserProfilePage = () => {
  const { userId } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [bio, setBio] = useState("");
  const [profileImg, setProfileImg] = useState(null);
  const [base64Image, setBase64Image] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`/api/v1/user/${userId}`);
      const { user } = response.data;

      if (user) {
        console.log(user, "user data");

        setUserData(user);
        setUsername(user.username || "");
        setBio(user.bio || "");
        setProfileImg(user.profileImg || "");
      } else {
        console.error("User data is not available in response");
        setErrorMessage("User data is missing.");
      }
    } catch (error) {
      console.error("Failed to fetch user details", error);
      setErrorMessage("Failed to load user data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImg(URL.createObjectURL(file));
        setBase64Image(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.put(`/api/v1/user/${userId}`, {
        username,
        bio,
        profileImg: base64Image,
      });
      setSuccessMessage(response.data.message);
      setLoading(true);
      fetchUserDetails();
      setLoading(false);
      handleCloseDialog();
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "Profile update failed");
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Typography variant="h4" gutterBottom>
          User Profile
        </Typography>

        {/* Check if userData is available */}
        {userData ? (
          <>
            <Box sx={{ mb: 3 }}>
              <Avatar
                src={profileImg || "https://via.placeholder.com/150"}
                sx={{ width: 150, height: 150 }}
              />
              <IconButton onClick={handleOpenDialog}>
                <EditIcon />
              </IconButton>
            </Box>

            <form style={{ width: "100%" }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    name="username"
                    value={username || ""} // Ensure value is not undefined
                    onChange={(e) => setUsername(e.target.value)}
                    disabled // Disabled until editing
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Bio"
                    variant="outlined"
                    fullWidth
                    name="bio"
                    value={bio || ""} // Ensure value is not undefined
                    onChange={(e) => setBio(e.target.value)}
                    multiline
                    rows={4}
                    disabled // Disabled until editing
                  />
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

            {/* Dialog for Editing */}
            <Dialog open={open} onClose={handleCloseDialog} fullWidth>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogContent>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    src={profileImg || "https://via.placeholder.com/150"}
                    sx={{ width: 100, height: 100, mb: 2 }}
                  />
                  <label htmlFor="profile-picture">
                    <input
                      accept="image/*"
                      id="profile-picture"
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                    />
                    <IconButton color="primary" component="span">
                      <PhotoCamera />
                    </IconButton>
                  </label>
                </Box>
                <TextField
                  margin="normal"
                  label="Username"
                  variant="outlined"
                  fullWidth
                  name="username"
                  value={username || ""}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  margin="normal"
                  label="Bio"
                  variant="outlined"
                  fullWidth
                  name="bio"
                  value={bio || ""}
                  onChange={(e) => setBio(e.target.value)}
                  multiline
                  rows={4}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog} color="secondary">
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  color="primary"
                  variant="contained"
                >
                  Save
                </Button>
              </DialogActions>
            </Dialog>
          </>
        ) : (
          <Typography variant="h6" color="error">
            User data not found
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default UserProfilePage;
