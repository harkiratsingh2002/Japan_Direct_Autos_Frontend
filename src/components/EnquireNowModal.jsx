import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Box, Button, Grid, Modal, TextField } from "@mui/material";
import Swal from "sweetalert2";
import { endLoader, startLoader } from "../reduxStore/loadingSlice";
import links from "../assets/util/links";

const EnquireNowModal = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const matches = useMediaQuery("(max-width:600px)");
  const dispatch = useDispatch();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [EnquiryFormData, setEnquiryFormData] = useState({
    subject: {
      value: "",
      error: "",
      hasError: false,
    },
    enquiryText: {
      value: "Hello, is this car still available?",
      error: "",
      hasError: false,
    },
    email: {
      value: "",
      error: "",
      hasError: false,
    },
  });

  useEffect(() => {
    if (localStorage.getItem("userData")) {
      setIsLoggedIn(true);
    }
  }, []);

  const carId = props.carId;

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: matches ? "65%" : 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const handleSendEnquiry = () => {
    const userData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : null;
    let userToken = userData ? userData.userToken : null;
    let email = userData ? userData.email : null; // Retrieve email from userData

    let enquiryData = {
      enquirySubject: EnquiryFormData.subject.value.trim(),
      enquiryText: EnquiryFormData.enquiryText.value.trim(),
      carId: carId,
      carLink: window.location.href,
      email: email, // Include email
    };

    // Validate form fields
    if (
      enquiryData.enquirySubject.length === 0 ||
      enquiryData.enquiryText.length === 0
    ) {
      Swal.fire({
        title: "Error",
        text: "Both subject and comments are required.",
        icon: "error",
      });
      return;
    }

    // Handle anonymous users
    if (!isLoggedIn) {
      const emailValue = EnquiryFormData.email.value.trim();
      if (emailValue.length === 0) {
        Swal.fire({
          title: "Error",
          text: "Email is required.",
          icon: "error",
        });
        return;
      } else {
        // Basic email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailValue)) {
          Swal.fire({
            title: "Error",
            text: "Please enter a valid email address.",
            icon: "error",
          });
          return;
        }
        enquiryData.email = emailValue; // Overwrite email with user input
      }
    }

    dispatch(startLoader());

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(userToken && { Authorization: `Bearer ${userToken}` }),
      },
      body: JSON.stringify(enquiryData),
    };

    fetch(`${links.backendUrl}/send-enquiry`, fetchOptions)
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            dispatch(endLoader());
            Swal.fire({
              title: "Error",
              text: err.message,
              icon: "error",
            });
            throw new Error(err.message);
          });
        }
        return res.json();
      })
      .then((result) => {
        dispatch(endLoader());
        Swal.fire({
          title: "Success",
          text: result.message,
          icon: "success",
        });
        setEnquiryFormData({
          subject: { value: "", error: "", hasError: false },
          enquiryText: { value: "", error: "", hasError: false },
          email: { value: "", error: "", hasError: false },
        });
      })
      .catch((error) => {
        dispatch(endLoader());
        console.error("Error:", error);
        Swal.fire({
          title: "Error",
          text: error.message || "An unexpected error occurred.",
          icon: "error",
        });
      });
  };

  return (
    <Modal
      open={props.openModal}
      onClose={props.handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid container>
          <Grid item xs={12} md={12}>
            {/* Conditionally render Email field */}
            {!isLoggedIn && (
              <TextField
                fullWidth
                label="Email"
                value={EnquiryFormData.email.value}
                required
                onChange={(e) => {
                  setEnquiryFormData((state) => ({
                    ...state,
                    email: { ...state.email, value: e.target.value },
                  }));
                }}
                variant="outlined"
                margin="dense"
              />
            )}

            {/* Subject Field */}
            <TextField
              fullWidth
              label="Subject"
              value={EnquiryFormData.subject.value}
              required
              onChange={(e) => {
                setEnquiryFormData((state) => ({
                  ...state,
                  subject: { ...state.subject, value: e.target.value },
                }));
              }}
              variant="outlined"
              margin="dense"
            />

            {/* Comments Field */}
            <TextField
              fullWidth
              label="Comments"
              value={EnquiryFormData.enquiryText.value}
              onChange={(e) => {
                setEnquiryFormData((state) => ({
                  ...state,
                  enquiryText: { ...state.enquiryText, value: e.target.value },
                }));
              }}
              variant="outlined"
              margin="normal"
              multiline
              rows={2}
            />

            <Button
              variant="contained"
              onClick={handleSendEnquiry}
              color="warning"
              fullWidth
            >
              Send Enquiry
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default EnquireNowModal;
