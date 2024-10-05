import { Button, Grid, Pagination, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { endLoader, startLoader } from "../reduxStore/loadingSlice";
import links from "../assets/util/links";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import YourEnquiriesTable from "../components/YourEnquiriesTable";
import axios from "axios";
import EditUserModal from "../components/EditUserModal";

const YourEnquiries = () => {
  const headerCells = ["Subject", "Details", "Car Details", "Status"];
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [userData, setUserData] = useState({});
  const [twoStepVerify, setTwoStepVerify] = useState(false);
  const dispatch = useDispatch();
  let userToken = "";
  if (localStorage.getItem("userData")) {
    userToken = JSON.parse(localStorage.getItem("userData")).userToken;
  }
  let navigate = useNavigate();
  const handleChange = (event, value) => {
    setPage(value);
    if (userToken.length > 0) {
      dispatch(startLoader());
      axios
        .post(
          links.backendUrl + "/get-your-enquiries",
          { page },
          {
            headers: {
              Authorization: `Bearer ${userToken}`, // Assuming it's a Bearer token
            },
          }
        )
        .then((response) => {
          dispatch(endLoader());
          if (response.status < 200 || response.status > 299) {
            let newError = {
              message: response.data.message,
            };
            throw newError;
          }
          setRows(response.data.yourEnquiries);
          setTotal(response.data.total);
        })
        .catch((err) => {
          console.log("error while getting your enquiries.", err);
          Swal.fire({
            title: "Error",
            text: err.message ? err.message : err.data.message,
            icon: "error",
          });
        });
    } else {
      Swal.fire({
        title: "UnAuthorized",
        text: "Login to view your enquiries.",
        icon: "error",
      });
      navigate("/login");
    }
  };

  const enableTwoStep = () => {
    dispatch(startLoader());
    axios
      .get(links.backendUrl + "/enable-two-step-verify", {
        headers: {
          Authorization: `Bearer ${userToken}`, // Assuming it's a Bearer token
        },
      })
      .then((response) => {
        dispatch(endLoader());
        setTwoStepVerify(true);
        Swal.fire({
          title: "Success",
          text: response.data.message,
          icon: "success",
        });
      })
      .catch((err) => {
        dispatch(endLoader());
        Swal.fire({
          title: "Error",
          text: err.data.message,
          icon: "error",
        });
      });
  };
  const disableTwoStep = () => {
    dispatch(startLoader());
    axios
      .get(links.backendUrl + "/disable-two-step-verify", {
        headers: {
          Authorization: `Bearer ${userToken}`, // Assuming it's a Bearer token
        },
      })
      .then((response) => {
        dispatch(endLoader());
        setTwoStepVerify(false);
        Swal.fire({
          title: "Success",
          text: response.data.message,
          icon: "success",
        });
      })
      .catch((err) => {
        dispatch(endLoader());
        Swal.fire({
          title: "Error",
          text: err.data.message,
          icon: "error",
        });
      });
  };

  useEffect(() => {
    if (userToken.length > 0) {
      dispatch(startLoader());
      axios
        .post(
          links.backendUrl + "/get-your-enquiries",
          { page },
          {
            headers: {
              Authorization: `Bearer ${userToken}`, // Assuming it's a Bearer token
            },
          }
        )
        .then((response) => {
          dispatch(endLoader());
          if (response.status < 200 || response.status > 299) {
            let newError = {
              message: response.data.message,
            };
            throw newError;
          }
          setRows(response.data.yourEnquiries);
          setTotal(response.data.total);
        })
        .catch((err) => {
          console.log("error while getting your enquiries.", err);
          Swal.fire({
            title: "Error",
            text: err.message ? err.message : err.data.message,
            icon: "error",
          });
        });
      dispatch(startLoader());
      axios
        .post(
          links.backendUrl + "/get-user",
          {},
          {
            headers: {
              Authorization: `Bearer ${userToken}`, // Assuming it's a Bearer token
            },
          }
        )
        .then((result) => {
          dispatch(endLoader());
          if (result.data.status < 200 || result.data.status > 299) {
            let newError = {
              message: "some error while geting user data.",
            };
            throw newError;
          }
          console.log("user data from get user:- ", result.data.user);
          localStorage.setItem("oldEmail", result.data.user.email);
          setTwoStepVerify(result.data.twoStepVerify);
          setUserData(result.data.user);
        })
        .catch((err) => {
          console.log("err while getting user data:- ", err);
        });
    } else {
      Swal.fire({
        title: "UnAuthorized",
        text: "Login to view your enquiries.",
        icon: "error",
      });
      navigate("/login");
    }
  }, []);

  const [openEditUserModal, setOpenEditUserModal] = useState(false);
  //   let carId = params.carId;
  // let myRows = [];
  const handleOpenEditUserModal = () => {
    setOpenEditUserModal(true);
  };
  const handleCloseEditUserModal = () => {
    setOpenEditUserModal(false);
  };
  const handleForgotPassword = () => {
    if (userData.email) {
      dispatch(startLoader());
      let otp = Math.floor(Math.random() * 9000) + 1000;
      let currentTimeStamp = Date.now();
      localStorage.setItem(
        "forgotPasswordOtp",
        JSON.stringify({ otp, currentTimeStamp, email: userData.email })
      );
      axios
        .post(links.backendUrl + "/forgot-password", {
          otp,
          email: userData.email,
        })
        .then(() => {
          dispatch(endLoader());
          navigate("/forgot-password");
        })
        .catch((err) => {
          dispatch(endLoader());
          console.log("Error while sending forgot password request:", err);
          Swal.fire({
            title: "Error",
            text: "Failed to send reset password email.",
            icon: "error",
          });
        });
    } else {
      Swal.fire({
        title: "Error",
        text: "Email not found.",
        icon: "error",
      });
    }
  };

  return (
    <>
      <Grid ml={"auto"} mr={"auto"} container xs={10}>
        <Grid item xs={12}>
          <Typography mt={5} variant="h4">
            Your Profile Data
          </Typography>
        </Grid>
        <Grid container mt={3} >
          <Grid item mb={1} xs={11} md={8}>
            First Name:
            <span
              style={{
                marginLeft: "1em",
              }}
            >
              {userData.firstName}
            </span>
          </Grid>
          <Grid item mb={1} xs={11} md={8}>
            Last Name:
            <span
              style={{
                marginLeft: "1em",
              }}
            >
              {userData.lastName}
            </span>
          </Grid>
          <Grid item mb={1} xs={11} md={8}>
            Email:
            <span
              style={{
                marginLeft: "1em",
              }}
            >
              {userData.email}
            </span>
          </Grid>
          <Grid item mb={1} xs={11} md={8}>
            Role:
            <span
              style={{
                marginLeft: "1em",
              }}
            >
              {userData.role}
            </span>
          </Grid>
        </Grid>
        <Grid container xs={11} mt={2} md={8}>
          <Button
            onClick={handleOpenEditUserModal}
            variant="contained"
            color="primary"
          >
            Edit Profile
          </Button>
          <Button sx={{ marginLeft: "1em" }}
            onClick={handleForgotPassword}

            variant="contained"
            color="primary"
          >
            Change Password
          </Button>

        </Grid>
        <Grid item xs={12}>
          <Typography mt={3} variant="h6">
            Two step verification
          </Typography>
          <Typography mt={1} variant="h6">
            Status : {twoStepVerify ? "Enabled" : "Disabled"}
          </Typography>
          <Typography mt={1} variant="h6">

            {twoStepVerify ? (
              <Button variant="contained" onClick={disableTwoStep}>
                Disable
              </Button>
            ) : (
              <Button variant="contained" onClick={enableTwoStep}>
                Enable
              </Button>
            )}
          </Typography>
        </Grid>
      </Grid>
      <Grid justifyContent={"center"} ml={"auto"} mr={"auto"} container xs={10}>
        <Grid item xs={12}>
          <Typography mt={5} variant="h4">
            Your Enquiries
          </Typography>
        </Grid>
        <Grid item xs={12} mt={3}>
          {/* Enquiries Table */}
          <YourEnquiriesTable
            headerCells={headerCells}
            rows={rows}
          ></YourEnquiriesTable>
        </Grid>
        <Grid container mt={3} justifyContent={"center"} pb={3} xs={10}>
          {total && (
            <Pagination
              color="primary"
              onChange={handleChange}
              count={Math.ceil(total / 5)}
            />
          )}
        </Grid>
      </Grid>
      <EditUserModal
        setUserData={setUserData}
        userData={userData}
        openModal={openEditUserModal}
        handleCloseModal={handleCloseEditUserModal}
      />
    </>
  );
};

export default YourEnquiries;
