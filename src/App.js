import "./App.css";

import Login from "./components/Login";
import { createTheme, ThemeProvider } from "@mui/material";
import { Link, Route, Routes } from "react-router-dom";
import Singup from "./components/Signup";

import React from "react";
import { CssBaseline, Container } from "@mui/material";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import AddUserForm from "./components/AddUserForm";
import AddCategories from "./components/AddCategories";
import ProductManagement from "./components/ProductManagement";
import ProfileManagement from "./components/ProfileManagement";
const theme = createTheme({
  typography: {
    fontFamily: ["Amiri"],
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<Singup />} />
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <div>
                <CssBaseline />
                <Navbar />
                <Sidebar />
                <Dashboard />
              </div>
            }
          />
          <Route
            path="/dashboard/adduser"
            element={
              <div>
                <CssBaseline />
                <Navbar />
                <Sidebar />
                <Container sx={{ mt: 8 }}>
                  {" "}
                  {/* Adjust top margin for Navbar */}
                  <AddUserForm />
                </Container>
              </div>
            }
          />
          <Route
            path="/dashboard/addcategory"
            element={
              <div>
                <CssBaseline />
                <Navbar />
                <Sidebar />
                <Container sx={{ mt: 8, ml: 33 }}>
                  <AddCategories />
                </Container>{" "}
              </div>
            }
          />
          <Route
            path="/dashboard/productmanagement"
            element={
              <div>
                <CssBaseline />
                <Navbar />
                <Sidebar />
                <Container sx={{ mt: 8, ml: 33 }}>
                  <ProductManagement />
                </Container>{" "}
              </div>
            }
          />
          <Route
            path=":userId"
            element={
              <div>
                <CssBaseline />
                <Container sx={{ mt: 8 }}>
                  <ProfileManagement />
                </Container>{" "}
              </div>
            }
          />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
