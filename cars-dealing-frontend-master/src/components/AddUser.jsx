import { Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import links from "../assets/util/links";
import { useDispatch } from "react-redux";
import { endLoader, startLoader } from "../reduxStore/loadingSlice";
import Swal from "sweetalert2";
import { useSearchParams } from "react-router-dom";


const AddUser = () => {

    const [userData,setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        role: '',
        password: '',
        confirmPassword: ''
    })

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

    const userToken = (JSON.parse(localStorage.getItem('userData'))).userToken ;
    console.log('userToken',userToken);
    let dispatch = useDispatch();
    const validateAndAddUser = ()=>{
      console.log('signup data:- ',userData)
      let error = {
          err: false,
          message: ''
      }
      // checking required
      Object.keys(userData).some((key)=>{
          if(userData[key]=='' || userData[key].length== 0){
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
          if(!isValidEmail(userData.email)){
              error.err = true;
              error.message = 'Not a valid email.'
          }
      }
      // checking confirm password
      if(!error.err){
          if(userData.password != userData.confirmPassword){
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
        dispatch(startLoader())
        axios.post(links.backendUrl + '/add-user-admin',userData,{
          headers: {
             'authorization': `Bearer ${userToken}`
          }})
        .then(response=>{
          dispatch(endLoader());
          if(response.status <200 || response.status>299){
            Swal.fire({
              title: 'Error',
              text: response.data.message,
              icon: 'error'
            })
          }
          else {
            Swal.fire({
              title: 'Success',
              text: response.data.message,
              icon: 'success'
            })
          }
        })
        .catch(err=>{
          dispatch(endLoader());
          console.log('add user admin err:-',err);
          Swal.fire({
            title: 'Error',
            text: err.response.data.message,
            icon: 'error'
          })
        })
      }
    }
    const [searchParams, setSearchParams] = useSearchParams();
    let edit = false
    let userId = ''

    const validateAndUpdateUser = ()=>{
      let error = {
        err: false,
        message: ''
    }
       // checking required
       Object.keys(userData).some((key)=>{
        if(userData[key]=='' || userData[key].length== 0){
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
        if(!isValidEmail(userData.email)){
            error.err = true;
            error.message = 'Not a valid email.'
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
    dispatch(startLoader())
    axios.post(links.backendUrl + '/edit-user-admin',{...userData, userId},{
      headers: {
         'authorization': `Bearer ${userToken}`
      }})
    .then(response=>{
      dispatch(endLoader());
      if(response.status <200 || response.status>299){
        Swal.fire({
          title: 'Error',
          text: response.data.message,
          icon: 'error'
        })
      }
      else {
        Swal.fire({
          title: 'Success',
          text: response.data.message,
          icon: 'success'
        })
      }
    })
    .catch(err=>{
      dispatch(endLoader());
      console.log('add user admin err:-',err);
      Swal.fire({
        title: 'Error',
        text: err.response.data.message,
        icon: 'error'
      })
    })
  }
    }

    
    if(searchParams.get('edit')){
      if(searchParams.get('edit') == 'true'){
        edit = true;
        userId = searchParams.get('userId');
      }
    }
    // const dispatch = useDispatch()
    useEffect(()=>{
      if(edit){
        dispatch(startLoader())
        axios.post(links.backendUrl + '/get-user-data',{
          userId
        })
        .then(response=>{
          dispatch(endLoader())
          if(response.status <200 || response.status> 299){
            
            let newError = {
              message: response.data.message
            }
            throw newError;
           
          }
          let ud = response.data.userData;
          setUserData(ud);
        })
        .catch(err=>{
          console.log('err while edit:- ',err)
          Swal.fire({
            title: 'Error',
            text: 'some error occurred',
            icon: 'error'
          }

          )
        })
      }
    },[])


  return (
    <>
      <Grid container p={3} ml={'auto'} mr={'auto'} justifyContent={"center"} xs={10} md={7} mt={3}>
        <Grid item xs={12}>
          <Typography textAlign={"center"} variant="h4">
            {edit ? 'Update User': 'Add User'} 
          </Typography>
        </Grid>
        <Grid item mt={3} xs={10}>
          <TextField
            id="outlined-basic-fname"
            label="First Name"
             size="small"
            variant="outlined"
            onChange={(e)=>{
                setUserData((oldData)=>{
                    let newData = {...oldData};
                    newData.firstName = e.target.value;
                    return newData
                })
            }}
            value={userData.firstName}
            fullWidth
          />
        </Grid>
        <Grid item mt={2} xs={10}>
          <TextField
            id="outlined-basic-lname"
            label="Last Name"
            fullWidth

             size="small"
            variant="outlined"
            onChange={(e)=>{
                setUserData((oldData)=>{
                    let newData = {...oldData};
                    newData.lastName = e.target.value;
                    return newData
                })
            }}
            value={userData.lastName}
          />
        </Grid>
        <Grid item mt={2} xs={10}>
          <TextField
            id="outlined-basic-Email"
            label="Email"
            fullWidth

             size="small"
            variant="outlined"
            onChange={(e)=>{
                setUserData((oldData)=>{
                    let newData = {...oldData};
                    newData.email = e.target.value;
                    return newData
                })
            }}
            value={userData.email}
          />
        </Grid>
        <Grid item mt={2} xs={10}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={userData.role}
              label="Role"
              //  size="small"
              onChange={(e)=>{
                setUserData(oldData=>{
                    let newData = {...oldData}
                    newData.role = e.target.value
                    return newData;
                })
              }}
            >
              <MenuItem value={'admin'}>admin</MenuItem>
              <MenuItem value={'customer'}>customer</MenuItem>
              {/* <MenuItem value={30}>Thirty</MenuItem> */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item mt={2} xs={10}>
        <FormControl fullWidth size="small" variant="outlined">
            <InputLabel htmlFor="Password-basic">Password</InputLabel>
              <OutlinedInput
                fullWidth
                size="small"
                onChange={(e)=>{
                    setUserData(oldData=>{
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
                value={userData.password}
                id="Password-basic"
                label="Password"
                readOnly={edit}
                type={showPassword ? 'text' : 'password'}
                // variant="outlined"
              />
              </FormControl>
        </Grid>
        <Grid item mt={2} xs={10}>
        <FormControl fullWidth size="small" variant="outlined">
            <InputLabel htmlFor="Password-basic">Confirm Password</InputLabel>
              <OutlinedInput
                fullWidth
                size="small"
                onChange={(e)=>{
                    setUserData(oldData=>{
                        let newData = {...oldData}
                        newData.confirmPassword = e.target.value
                        return newData;
                    })
                    
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                value={userData.confirmPassword}
                id="Confirm-Password-basic"
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                // variant="outlined"
                readOnly={edit}
              />
              </FormControl>
        </Grid>
        <Grid item mt={3} xs={10}>
                {
                  edit && (
                    <Button onClick={validateAndUpdateUser} fullWidth variant="contained" color="primary">
                  Update
                </Button>
                  )
                  
                }
                {
                  !edit && (
                    <Button onClick={validateAndAddUser} fullWidth variant="contained" color="primary">
                  Add User
                </Button>
                  )
                }
        </Grid>
      </Grid>
    </>
  );
};

export default AddUser;
