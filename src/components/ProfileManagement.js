import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Box,
  Avatar,
  Button,
  TextField,
  Grid,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { PhotoCamera, Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";

function ProfileManagement() {
  const [values, setValues] = useState({
    name: "",
    email: "user@example.com", // Placeholder email
    previousPassword: "",
    newPassword: "",
    confirmPassword: "",
    showPreviousPassword: false,
    showNewPassword: false,
    showConfirmPassword: false,
    phone: "",
    avatar: "/public/imgs/image.png", // Placeholder for avatar image
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = (prop) => () => {
    setValues({ ...values, [prop]: !values[prop] });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setValues({ ...values, avatar: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic, including password verification
    if (values.newPassword !== values.confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }

    // Implement logic to verify the previous password before allowing the update
  };
  const { userId } = useParams();
  console.log(userId);
  useEffect(() => {
    axios
      .get(`http://localhost/admin/users.php?id=${userId}`)
      .then((response) => {
        let name=response.data.userData.name
        let email=response.data.userData.email
        setValues({...values,name:name,email:email})
      });
  }, []);
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{ m: 1, width: 80, height: 80 }}
          src={values.avatar}
          alt="Profile Avatar"
        />
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <input
            hidden
            accept="image/*"
            type="file"
            onChange={handleAvatarChange}
          />
          <PhotoCamera />
        </IconButton>
        <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
          Profile Management
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                autoComplete="name"
                value={values.name}
                onChange={handleChange("name")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={values.email}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="previousPassword"
                label="Previous Password"
                type={values.showPreviousPassword ? "text" : "password"}
                id="previous-password"
                value={values.previousPassword}
                onChange={handleChange("previousPassword")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword(
                          "showPreviousPassword"
                        )}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPreviousPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="newPassword"
                label="New Password"
                type={values.showNewPassword ? "text" : "password"}
                id="new-password"
                value={values.newPassword}
                onChange={handleChange("newPassword")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword("showNewPassword")}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showNewPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Confirm New Password"
                type={values.showConfirmPassword ? "text" : "password"}
                id="confirm-password"
                value={values.confirmPassword}
                onChange={handleChange("confirmPassword")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword("showConfirmPassword")}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showConfirmPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                autoComplete="tel"
                value={values.phone}
                onChange={handleChange("phone")}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Save Changes
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default ProfileManagement;
