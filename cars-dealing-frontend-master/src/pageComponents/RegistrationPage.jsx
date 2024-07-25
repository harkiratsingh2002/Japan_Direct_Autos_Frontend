import { Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import signUpImg from "../assets/images/signup-img.jpg"
import { useState } from "react";
import links from "../assets/util/links";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import GoogleIcon from "@mui/icons-material/Google";
import { loginUser } from "../reduxStore/userDataSlice";
import { endLoader, startLoader } from "../reduxStore/loadingSlice";



const RegistrationPage = () => {
    const navigate = useNavigate();
    const [registerformdata,setRegisterFormData] = useState({
        firstName:'',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const handleSignup = (e)=>{
        console.log('signup data:- ',registerformdata)
        let error = {
            err: false,
            message: ''
        }
        // checking required
        Object.keys(registerformdata).some((key)=>{
            if(registerformdata[key]=='' || registerformdata[key].length== 0){
                error.err = true
                error.message = 'All feilds are Required.'
                return true;
            }
            return false;
        }) 
        // checking email
        if(!error.err){
            function isValidEmail(email) {
                const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return emailRegex.test(email);
              }
            if(!isValidEmail(registerformdata.email)){
                error.err = true;
                error.message = 'Not a valid email.'
            }
        }
        // checking confirm password
        if(!error.err){
            if(registerformdata.password != registerformdata.confirmPassword){
                error.err = true;
                error.message = 'Password and confirm password dosen\'t match';
            }

        }
        if(error.err){
            // alert(error.message);
            Swal.fire({
              title: 'error',
              text: error.message,
              icon: 'error',
              // confirmButtonText: 'Cool'
            })
        }
        if(!error.err){
            // send data to backend.
            let url = links.backendUrl + '/signup-customer'
            dispatch(startLoader())
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(registerformdata), // This is the data you want to send
                headers: { 'Content-Type': 'application/json' } // Specify JSON content
              })
              .then(response =>{
                if(response.status<200 || response.status>299){
                    response.json().then((err)=>{
                      Swal.fire({
                        title: 'error',
                        text: err.message,
                        icon: 'error',
                        // confirmButtonText: 'Cool'
                      })
                      
                    })
                  // ('error while signing up');
                }
                return response.json();
                
              } )
              .then(data => {
                console.log(data);
                Swal.fire({
                  title: 'Success',
                  text: 'Signed Up Successfully.',
                  icon: 'success',
                  // confirmButtonText: 'Cool'
                })
            dispatch(endLoader)

                navigate('/login')
              })
              .catch(error => {
                console.error(error);
                // alert(error.message)
              });
        }
    }

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
  
    const handleMouseDownConfirmPassword = (event) => {
      event.preventDefault();
    };
    const loginWithGoogle = useGoogleLogin({
      onSuccess: (codeResponse) => {
        // setUser(codeResponse),
        console.log("google user:-", codeResponse);
        dispatch(startLoader())
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
                dispatch(endLoader())
                Swal.fire({
                  title: "success",
                  text: "Logged in succeessfully.",
                  icon: "success",
                  // confirmButtonText: 'Cool'
                });
                navigate("/", { replace: true });
              })
              .catch(function (error) {
                dispatch(endLoader())

                console.error(error);
              });
          })
          .catch((err) => console.log(err));
      },
      onError: (error) => console.log("Login Failed:", error),
    });
    const dispatch = useDispatch();
  return (
    <Grid container justifyContent={"center"}>
      <Grid item sx={{
        display:{
            xs: 'none',
            md: 'flex-item'
        }
      }} xs={11} md={6}>
        <img style={{
            margin: '3em 0 0 3em'
        }} src={signUpImg} width={'400px'} height={'400px'} alt="sign up image"></img>
      </Grid>
      <Grid item xs={11} md={6}>
        <form>
          <Grid container p={4}>
            <Grid container mt={2} xs={12}>
              <Typography variant="h5">Registration</Typography>
            </Grid>

            <Grid container mt={2} xs={12}>
              <TextField
                size="small"
                onChange={(e)=>{
                    setRegisterFormData(oldData=>{
                        let newData = {...oldData}
                        newData.firstName = e.target.value
                        return newData;
                    })
                    
                }}
                value={registerformdata.firstName}
                fullWidth
                id="firstName-basic"
                label="First Name"
                variant="outlined"
              />
            </Grid>
            <Grid container  mt={2} xs={12}>
              <TextField
               size="small"
               onChange={(e)=>{
                setRegisterFormData(oldData=>{
                    let newData = {...oldData}
                    newData.lastName = e.target.value
                    return newData;
                })
                
            }}
            value={registerformdata.lastName}
                fullWidth
                id="LasttName-basic"
                label="Last Name"
                variant="outlined"
              />
            </Grid>
            <Grid container  mt={2} xs={12}>
              <TextField
                fullWidth
                onChange={(e)=>{
                    setRegisterFormData(oldData=>{
                        let newData = {...oldData}
                        newData.email = e.target.value
                        return newData;
                    })
                    
                }}
                value={registerformdata.email}
                size="small"
                id="Email-basic"
                label="Email"
                variant="outlined"
              />
            </Grid>
            <Grid container  mt={2} xs={12}>
            <FormControl fullWidth size="small" variant="outlined">
            <InputLabel htmlFor="Password-basic">Password</InputLabel>
              <OutlinedInput
                fullWidth
                size="small"
                onChange={(e)=>{
                    setRegisterFormData(oldData=>{
                        let newData = {...oldData}
                        newData.password = e.target.value
                        return newData;
                    })
                    
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
                value={registerformdata.password}
                id="Password-basic"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                // variant="outlined"
              />
              </FormControl>
            </Grid>
            <Grid container  mt={2} xs={12}>
            <FormControl fullWidth size="small" variant="outlined">
            <InputLabel htmlFor="Confirm-Password-basic">Confirm Password</InputLabel>
              <OutlinedInput
                fullWidth
                size="small"
                onChange={(e)=>{
                    setRegisterFormData(oldData=>{
                        let newData = {...oldData}
                        newData.confirmPassword= e.target.value
                        return newData;
                    })
                    
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                value={registerformdata.confirmPassword}
                id="Confirm-Password-basic"
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                // variant="outlined"
              />
              </FormControl>
            </Grid>

            <Grid container mt={3} ml={'auto'} mr={'auto'} textAlign={'center'} xs={10}>
              <Button onClick={handleSignup} fullWidth variant="contained">
                Register
              </Button>
            </Grid>
            <Grid container mt={3} ml={'auto'} mr={'auto'} textAlign={'center'} xs={10}>

            <Button
                  mt={2}
                  onClick={() => loginWithGoogle()}
                  fullWidth
                  startIcon={<GoogleIcon />}
                  variant="outlined"
                >
                  Continue with Google
                </Button>
            </Grid>
                
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default RegistrationPage;
