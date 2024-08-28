// import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid, Rating, TextField } from "@mui/material";
import importantFormFunctions from "../assets/util/importantFormFunctions";
import links from "../assets/util/links";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { endLoader, startLoader } from "../reduxStore/loadingSlice";
import { useMediaQuery } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { logoutUser } from "../reduxStore/userDataSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const EditUserModal = (props) => {
  const matches = useMediaQuery("(max-width:600px)");

  if (matches) {
    style.width = "65%";
  }

  // const [newUserData,setNewUserData] = useState(null);
  // useEffect(()=>{
  //     setNewUserData(props.userData)
  // },[])
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const updateUser = () => {
    dispatch(startLoader());
    axios
      .post(links.backendUrl + "/update-user", {
        newUserData: props.userData,
        oldEmail: localStorage.getItem("oldEmail"),
      })
      .then((result) => {
        dispatch(endLoader());
        if (result.data.status < 200 || result.data.status > 299) {
          let newError = {
            message: result.data.message,
          };
          throw newError;
        }
        props.handleCloseModal();
        Swal.fire({
          title: "Success",
          text: "User updated successfully.",
          icon: "success",
        });
        dispatch(logoutUser());
        localStorage.removeItem("userData");

        navigate("/login", { replace: true });
      })
      .catch((err) => {
        dispatch(endLoader());
        console.log("error while updating user:- ", err);
        Swal.fire({
          title: "Error",
          text: err.message,
          icon: "error",
        });
      });
  };
  return (
    <>
      {
        <Modal
          open={props.openModal}
          onClose={props.handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Grid container>
              <Grid item xs={12} md={12} mb={1}>
                {/* <Typography component="legend">Enquiry Subject</Typography> */}
                <TextField
                  value={props.userData.firstName}
                  onChange={(e) => {
                    props.setUserData((oldState) => {
                      let newState = { ...oldState };
                      newState.firstName = e.target.value;
                      return newState;
                    });
                  }}
                  fullWidth
                  id="standard-basic"
                  label="First Name"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={12} mb={1}>
                {/* <Typography component="legend">Enquiry Subject</Typography> */}
                <TextField
                  value={props.userData.lastName}
                  onChange={(e) => {
                    props.setUserData((oldState) => {
                      let newState = { ...oldState };
                      newState.lastName = e.target.value;
                      return newState;
                    });
                  }}
                  fullWidth
                  id="standard-basic"
                  label="Last Name"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={12} mb={1}>
                {/* <Typography component="legend">Enquiry Subject</Typography> */}
                <TextField
                  value={props.userData.email}
                  onChange={(e) => {
                    props.setUserData((oldState) => {
                      let newState = { ...oldState };
                      newState.email = e.target.value;
                      return newState;
                    });
                  }}
                  fullWidth
                  id="standard-basic"
                  label="Email"
                  variant="standard"
                />
              </Grid>
              <Grid item mt={3} xs={8} md={12} alignSelf={"center"}>
                <Button
                  onClick={updateUser}
                  variant="contained"
                  color="primary"
                >
                  Update
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      }
    </>
  );
};

export default EditUserModal;
