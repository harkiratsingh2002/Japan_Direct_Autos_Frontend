import {
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import logo from "../assets/images/logo.png";
import { Password, Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import links from "../assets/util/links";
import { useDispatch } from "react-redux";
// import { userDataSlice } from "../reduxStore/store";
import { loginUser } from "../reduxStore/userDataSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// import GoogleLogin from "react-google-login";
// import { GoogleLogin } from '@react-oauth/google';
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import GoogleIcon from "@mui/icons-material/Google";
import { endLoader, startLoader } from "../reduxStore/loadingSlice";


// import { useAuth0 } from "@auth0/auth0-react";

const LoginPage = () => {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  // const { loginWithRedirect } = useAuth0();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // send data to backend
    console.log("signup data:- ", loginFormData);
    let error = {
      err: false,
      message: "",
    };
    function isValidEmail(email) {
      const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return emailRegex.test(email);
    }
    if (!isValidEmail(loginFormData.email)) {
      error.err = true;
      error.message = "Not a valid email.";
    }
    if (error.err) {
      // alert(error.message);
      Swal.fire({
        title: "error",
        text: error.message,
        icon: "error",
        // confirmButtonText: 'Cool'
      });
    }
    if (!error.err) {
      let url = links.backendUrl + "/login-customer";
      dispatch(startLoader());
      fetch(url, {
        method: "POST",
        body: JSON.stringify(loginFormData), // This is the data you want to send
        headers: { "Content-Type": "application/json" }, // Specify JSON content
      })
        .then((response) => {
          if (response.status < 200 || response.status > 299) {
            // alert("error while loging in.");
            response.json().then((err) => {
              // alert(err.message);
              Swal.fire({
                title: "error",
                text: err.message,
                icon: "error",
                // confirmButtonText: 'Cool'
              });
            });
            let newError = {
              message: "some error while loggin in.",
            };
            throw newError;
          }
          return response.json();
        })
        .then((data) => {
          console.log("login Data:- ", data);
          dispatch(endLoader())

          dispatch(loginUser({ userData: data.userData }));
          const now = Date.now();
          const expiry = now + 36000000;
          data.userData.expiry = expiry;
          localStorage.setItem("userData", JSON.stringify(data.userData));
          Swal.fire({
            title: "success",
            text: "Logged in succeessfully.",
            icon: "success",
            // confirmButtonText: 'Cool'
          });
          navigate("/", { replace: true });
        })
        .catch((error) => {
          console.error("login error:- ", error);
          dispatch(endLoader())

          // alert(error.message);
        });
    }
  };

  const handleForgotPassword = ()=>{
    if(loginFormData.email){
      dispatch(startLoader())
      let otp =  Math.floor(Math.random() * 9000) + 1000
      let currentTimeStamp = Date.now()
      localStorage.setItem('forgotPasswordOtp',JSON.stringify({otp,currentTimeStamp,email: loginFormData.email}))
      axios.post(links.backendUrl + '/forgot-password',{
        otp,
        email: loginFormData.email
      })
      .then(()=>{
        dispatch(endLoader())
        navigate("/forgot-password")
      })
      .catch(err=>{
        dispatch(endLoader())
        console.log('err while forgot password',err)
      })
    }
    else{
      Swal.fire({
        title: 'Error',
        text: 'Enter Email',
        icon: 'error'
      })
    }
  }

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  // const responseMessage = (response) => {
  //   console.log(response);
  // };
  // const errorMessage = (error) => {
  //   console.log(error);
  // };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (codeResponse) => {
      // setUser(codeResponse),
      console.log("google user:-", codeResponse);
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${codeResponse.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          console.log("res data", res.data);
          const userData = {
            firstName: res.data.given_name.split(" ")[0],
            lastName: res.data.family_name,
            email: res.data.email,
            role: "customer",
          };
          console.log("user data:-", userData);
          axios
            .post(links.backendUrl + "/sign-up-google", userData)
            .then(function (response) {
              console.log("google login response:-", response.data);
              dispatch(loginUser({ userData: response.data.userData }));
              const now = Date.now();
              const expiry = now + 3600000;
              response.data.userData.expiry = expiry;
              localStorage.setItem(
                "userData",
                JSON.stringify(response.data.userData)
              );
              Swal.fire({
                title: "success",
                text: "Logged in succeessfully.",
                icon: "success",
                // confirmButtonText: 'Cool'
              });
              navigate("/", { replace: true });
            })
            .catch(function (error) {
              console.error(error);
            });
        })
        .catch((err) => console.log(err));
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  // function onSignIn(googleUser) {
  //   var profile = googleUser.getBasicProfile();
  //   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  //   console.log('Name: ' + profile.getName());
  //   console.log('Image URL: ' + profile.getImageUrl());
  //   console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  // }

  return (
    <>
      <Grid container p={4} justifyContent={"center"}>
        <Grid id={"logoContainer"} item xs={11} md={6}>
          <Grid container textAlign={"center"}>
            <img
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                height: "7.5rem",
                width: "7.5rem",
              }}
              src={logo}
              alt="Japan Direct Autos"
            ></img>
          </Grid>
          <Grid container mt={2} textAlign={"center"}>
            <Grid ml={"auto"} mr={"auto"} item>
              <Typography variant="h5">
                Welcome Back, You Were Missed.
              </Typography>
            </Grid>
          </Grid>
          <form>
            <Grid
              container
              p={2}
              mt={2}
              ml={"auto"}
              mr={"auto"}
              xs={11}
              md={7}
              justifyContent={"center"}
            >
              <Grid container mb={2} justifyContent={"center"} xs={12}>
                <TextField
                  fullWidth
                  onChange={(e) => {
                    setLoginFormData((oldData) => {
                      let newData = { ...oldData };
                      newData.email = e.target.value;
                      return newData;
                    });
                  }}
                  value={loginFormData.email}
                  size="small"
                  id="Email-basic"
                  label="Email"
                  placeholder="Email"
                  variant="outlined"
                />
              </Grid>
              <Grid container mb={2} xs={12}>
                <FormControl fullWidth size="small" variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>

                  <OutlinedInput
                    fullWidth
                    label="Password"
                    onChange={(e) => {
                      setLoginFormData((oldData) => {
                        let newData = { ...oldData };
                        newData.password = e.target.value;
                        return newData;
                      });
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    value={loginFormData.password}
                    size="small"
                    id="outlined-adornment-password"
                    // placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    // variant="outlined"
                  />
                </FormControl>
              </Grid>
              <Grid container mb={2} xs={12}>
                <Button
                  mt={2}
                  onClick={handleLogin}
                  fullWidth
                  variant="contained"
                >
                  Login
                </Button>
              </Grid>
              <Divider>Or</Divider>
              <Grid container mt={2} mb={2} xs={12}>
                <Button
                  mt={2}
                  onClick={() => loginWithGoogle()}
                  fullWidth
                  startIcon={<GoogleIcon />}
                  variant="outlined"
                >
                  Login with Google
                </Button>

                {/* <GoogleLogin
                  style={{
                    width: '100%'
                  }}
                  onSuccess={responseMessage}
                  onError={errorMessage}
                /> */}
              </Grid>
              <Grid container mt={2} xs={12}>
                <Button
                  mt={2}
                  onClick={handleForgotPassword}
                  fullWidth
                  variant="contained"
                >
                  Forgot Password
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default LoginPage;
