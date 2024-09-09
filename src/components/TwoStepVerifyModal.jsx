import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid, TextField } from "@mui/material";
import axios from "axios";
import links from "../assets/util/links";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { loginUser } from "../reduxStore/userDataSlice";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function TwoStepVerifyModal({
  openVerifyModal,
  setOpenVerifyModal,
  email,
}) {
  //   const [open, setOpen] = React.useState(false);
  //   const handleOpen = () => setOpen(true);
  //   const handleClose = () => setOpen(false);

  const [checkOtp, setCheckOtp] = React.useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const verifyTwostep = () => {
    if (checkOtp == localStorage.getItem("twoStepOtp")) {
      // send payload data for token and login
      let url = links.backendUrl + "/check-two-step-verify";
      let data1 = {
        payloadData: JSON.parse(localStorage.getItem("payloadData")),
      };
      axios
        .post(url, data1)
        .then(({ data }) => {
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
          setOpenVerifyModal(false);
          navigate("/", { replace: true });
        })
        .catch((error) => {
          console.log("error while otp check:- ", error);
        });
    } else {
      Swal.fire({
        title: "Error",
        text: "Wrong Otp",
        icon: "error",
      });
    }
  };

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={openVerifyModal}
        onClose={() => {
          setOpenVerifyModal(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
          <Grid container>
            <Grid item mt={2} xs={12}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Enter Otp sent to {email}
              </Typography>
            </Grid>
            <Grid item mt={2} xs={12}>
              <TextField
                id="outlined-basic"
                label="OTP"
                variant="outlined"
                onChange={(e) => {
                  setCheckOtp(e.target.value);
                }}
              />
            </Grid>
            <Grid item mt={2} xs={12}>
              <Button onClick={verifyTwostep} variant="contained">
                Verify
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
