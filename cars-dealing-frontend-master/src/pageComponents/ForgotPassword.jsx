import {
    Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Password, Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { startLoader, endLoader } from "../reduxStore/loadingSlice";
import links from "../assets/util/links";


const ForgotPassword = () => {
  const [forgotPasswordData, setForgotPasswordData] = useState({});
  const [enteredOtp, setEnteredOtp] = useState(null);
  const [otpVerified, setOtpVerified] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("forgotPasswordOtp")) {
      let fpData = JSON.parse(localStorage.getItem("forgotPasswordOtp"));
      setForgotPasswordData(fpData);
    }
  }, []);

  const verifyOtp = () => {
    if (forgotPasswordData.currentTimeStamp + 600000 > Date.now()) {
      if (forgotPasswordData.otp == enteredOtp) {
        setOtpVerified(true);
      } else {
        Swal.fire({
          title: "Error",
          text: "Wrong Otp",
          icon: "error",
        });
      }
    } else {
      Swal.fire({
        title: "Error",
        text: "Otp Expired",
        icon: "error",
      });
      navigate("/login", { replace: true });
    }
  };

  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowConfirmNewPassword = () => setShowConfirmNewPassword((show)=> !show)
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChangePassword = ()=>{
    if(newPassword == confirmNewPassword){

      dispatch(startLoader())
      axios.post( links.backendUrl +  '/change-password',{
        email: forgotPasswordData.email,
        newPassword
      })
      .then((result)=>{
        dispatch(endLoader())
        if(result.data.status<200 || result.data.status>299){
          let newError = {
            message: result.data.message
          }
          throw newError
        }
        Swal.fire({
          title: 'Success',
          text: 'Password Changed Successfully',
          icon: 'success'
        })
        navigate("/login",{ replace: true})
      })
      .catch(err=>{
        dispatch(endLoader())
        console.log('error while changing password',err);
      })
    }
    else {
      Swal.fire({
        title: 'Error',
        text: 'New password and confirm password must be same.',
        icon: 'error'
      })
    }
  }
  return (
    <>
      <Grid container xs={12} justifyContent={"center"}>
        {!otpVerified && (
          <>
          <Grid container my={7} sx={{
            // border: '1px solid black'
          }}  xs={11} ml={'auto'} mr={'auto'} md={5}>

            <Grid item xs={12} mb={2} >
              <Typography variant="h6">
                Enter otp sent to {forgotPasswordData.email}
              </Typography>
            </Grid>
            <Grid mb={2} item xs={12} >
              <TextField
                id="standard-basic"
                onChange={(e) => {
                  setEnteredOtp(e.target.value);
                }}
                label="Otp"
                fullwidth
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} >
              <Button variant={"contained"} onClick={verifyOtp}>
                Verify
              </Button>
            </Grid>
          </Grid>
          </>
        )}
        {otpVerified && (
          <>
          <Grid container my={7} sx={{
            // border: '1px solid black'
          }}  xs={11} ml={'auto'} mr={'auto'} md={5}>
          
            <Grid mb={1} my={5} item xs={12} >
              {/* <TextField id="outlinedbasic" label="New Password" variant="outlined" /> */}
              <FormControl fullWidth size="small" variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>

                <OutlinedInput
                  fullWidth
                  label="Password"
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowNewPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  value={newPassword}
                  size="small"
                  id="outlined-adornment-password"
                  // placeholder="Password"
                  type={showNewPassword ? "text" : "password"}
                  // variant="outlined"
                />
              </FormControl>
            </Grid>
            <Grid mb={1} item xs={12} >
            <FormControl fullWidth size="small" variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Confirm New Password
                </InputLabel>

                <OutlinedInput
                  fullWidth
                  label="Confirm New Password"
                  onChange={(e) => {
                    setConfirmNewPassword(e.target.value);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmNewPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showConfirmNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  value={confirmNewPassword}
                  size="small"
                  id="outlined-adornment-password"
                  // placeholder="Password"
                  type={showConfirmNewPassword ? "text" : "password"}
                  // variant="outlined"
                />
              </FormControl>
            </Grid>
            <Grid mb={2} my={5} item xs={12} >
              <Button variant="contained" onClick={handleChangePassword} color="primary">Change Password</Button>
            </Grid>
          </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default ForgotPassword;
