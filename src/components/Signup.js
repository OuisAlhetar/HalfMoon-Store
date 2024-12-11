import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { InputAdornment } from "@mui/material";
import KeyIcon from "@mui/icons-material/Key";
import Button from "@mui/material/Button";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import { Link } from "react-router-dom";

import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import "../App.css";
export default function Singup() {
  // useEffect(() => {
  //   axios
  //     .get("http://localhost/loginApi.php", { withCredentials: true })
  //     .then((response) => {
  //       console.log(response);
  //     });
  // }, []);
  // true

  const [inputInfo, setInputInfo] = useState({
    email: "",
    password: "",
    confirmPass: "",
    phoneNumber: null,
  });
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  let validEmail = emailRegex.test(inputInfo.email);
  let validPass = passRegex.test(inputInfo.password);

  return (
    <Container maxWidth="sm">
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(126, 114, 114, 0.2)",
            width: "100%",
            minHeight: "40%",
            borderRadius: "10px",
            padding: "10px",
          }}
        >
          <div dir="rtl">
            <AccountCircleIcon
              style={{ fontSize: "50px", color: "white", fontWeight: "bold" }}
            />
            <Typography variant="h4" style={{ color: "white" }}>
              تسجيل حساب جديد
            </Typography>
            <HorizontalRuleIcon style={{ fontSize: "40px" }} />
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleIcon />
                  </InputAdornment>
                ),
              }}
              placeholder="اسم المستخدم"
              style={{
                width: "100%",
                backgroundColor: "white",
                borderRadius: "10px",
                border: "none",
                outlineColor: "none",
              }}
              value={inputInfo.email}
              onChange={(e) => {
                setInputInfo({ ...inputInfo, email: e.target.value });
              }}
              name="email"
            />
            {inputInfo.email && (
              <Typography
                variant="h6"
                style={{
                  color: validEmail ? "green" : "red",
                  textAlign: "right",
                }}
              >
                {validEmail
                  ? "تم ادخال الايميل بشكل صحيح"
                  : "يرجى ادخال الايميل بشكل صحيح"}
              </Typography>
            )}
            <br />
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyIcon />
                  </InputAdornment>
                ),
              }}
              value={inputInfo.password}
              onChange={(e) => {
                setInputInfo({ ...inputInfo, password: e.target.value });
              }}
              style={{
                marginTop: !inputInfo.email ? "20px" : "",
                width: "100%",
                backgroundColor: "white",
                borderRadius: "10px",
                border: "none",
                outlineColor: "none",
              }}
              placeholder=" كلمة المرور"
              name="password"
            />
            {inputInfo.password && (
              <Typography
                variant="h6"
                style={{
                  color: validPass ? "green" : "red",
                  textAlign: "right",
                }}
              >
                {!validPass
                  ? "يجب ان تكون كلمة المرور قوية "
                  : "كلمة المرور صحيحة"}
              </Typography>
            )}

            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyIcon />
                  </InputAdornment>
                ),
              }}
              value={inputInfo.confirmPass}
              onChange={(e) => {
                setInputInfo({ ...inputInfo, confirmPass: e.target.value });
              }}
              style={{
                marginTop:  "20px" ,
                width: "100%",
                backgroundColor: "white",
                borderRadius: "10px",
                border: "none",
                outlineColor: "none",
              }}
              placeholder="  تاكيد كلمة المرور "
              name="confirmPass"
            />

            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneAndroidIcon />
                  </InputAdornment>
                ),
              }}
              value={inputInfo.phoneNumber}
              onChange={(e) => {
                setInputInfo({ ...inputInfo, phoneNumber: e.target.value });
              }}
              style={{
                marginTop:  "20px",
                width: "100%",
                backgroundColor: "white",
                borderRadius: "10px",
                border: "none",
                outlineColor: "none",
              }}
              placeholder="  رقم الهاتف"
              name="phoneNumber"
            />

            <Button
              style={{
                width: "100%",
                height: "50px",
                backgroundColor: "white",
                color: "#585757",
                fontSize: "20px",
                borderRadius: "10px",
                marginTop:   "20px",
                marginBottom: "20px",
              }}
              disabled={
                validEmail && validPass && inputInfo.password ? false : true
              }
              onClick={() => {
                axios
                  .post(
                    "http://localhost/auth system/signup.php",
                    {
                      email: inputInfo.email,
                      password: inputInfo.password,
                      confirmPass:inputInfo.confirmPass,
                      phoneNumber:inputInfo.phoneNumber
                    },
                    {
                      headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                      },
                      withCredentials: true,
                    }
                  )
                  .then((response) => {
                    console.log(response);
                  });
              }}

              // disabled={true}
            >
              تسجيل الدخول
            </Button>
            <Typography
              variant="h6"
              style={{ color: "rgba(250, 249, 249, 0.64)", cursor: "pointer" }}
            >
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <Link to={"/"} className="singup-pass">
                  تسجيل دخول
                </Link>
                {/* <a className="forget-pass">نسيت كلمةالسر؟</a> */}
              </div>
            </Typography>
          </div>
        </div>
      </div>
    </Container>
  );
}
