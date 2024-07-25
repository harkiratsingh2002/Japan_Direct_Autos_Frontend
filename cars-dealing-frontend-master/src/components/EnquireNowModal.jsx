import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid, Rating, TextField } from "@mui/material";
import importantFormFunctions from "../assets/util/importantFormFunctions";
import links from "../assets/util/links";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { endLoader, startLoader } from "../reduxStore/loadingSlice";

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

const EnquireNowModal = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  // const [carRatingValue,setCarRatingValue] = React.useState(0);
  let userToken = null;
  if (localStorage.getItem("userData")) {
    userToken = JSON.parse(localStorage.getItem("userData")).userToken;
    console.log("userToken", userToken);
  }
  const [EnquiryFormData, setEnquiryFormData] = React.useState({
    subject: {
      value: "",
      error: "",
      hasError: false,
    },
    enquiryText: {
      value: "",
      error: "",
      hasError: false,
    },
  });
  const dispatch = useDispatch()

  const handleReviewFormDataSubmit = () => {
    if (importantFormFunctions.checkRequired(EnquiryFormData.subject.value)) {
      // alert('Rating feild is required.');
      Swal.fire({
        title: "error",
        text: "Subject is required.",
        icon: "error",
        // confirmButtonText: 'Cool'
      });
    } else if (
      importantFormFunctions.checkRequired(EnquiryFormData.enquiryText.value)
    ) {
      // alert('Please add a review to continue.');
      Swal.fire({
        title: "error",
        text: "Please add enquiry message to continue.",
        icon: "error",
        // confirmButtonText: 'Cool'
      });
    } else if (
      !importantFormFunctions.checkReviewLength(
        EnquiryFormData.enquiryText.value
      )
    ) {
      // alert('review must be less than 500 words');
      Swal.fire({
        title: "error",
        text: "Enquiry must be less than 500 words",
        icon: "error",
        // confirmButtonText: 'Cool'
      });
    } else {
      // post Review
      let enquiryData = {
        // carRating: reviewFormData.carRating.value,
        // carReviewText: reviewFormData.carReviewText.value,
        enquirySubject: EnquiryFormData.subject.value,
        enquiryText: EnquiryFormData.enquiryText.value,
        carId: props.carId,
        carLink: window.location.href,
      };
      if (userToken) {
        dispatch(startLoader());
        fetch(links.backendUrl + "/send-enquiry", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify(enquiryData),
        })
          .then((res) => {
            if (res.status < 200 || res.status > 299) {
              res.json().then((err) => {
                // alert(err.message)})
                dispatch(endLoader())
                Swal.fire({
                  title: "error",
                  text: err.message,
                  icon: "error",
                  // confirmButtonText: 'Cool'
                });
              });
            }

            return res.json();
          })
          .then((result) => {
            // alert(result.message);
            dispatch(endLoader())

            Swal.fire({
              title: "Success",
              text: result.message,
              icon: "info",
              // confirmButtonText: 'Cool'
            });
            props.handleCloseModal();
            setEnquiryFormData({
              subject: {
                value: "",
                error: "",
                hasError: false,
              },
              enquiryText: {
                value: "",
                error: "",
                hasError: false,
              },
            });
            // window.location.reload(true);
          });
      } else {
        Swal.fire({
          title: "error",
          text: "Login before placing an enquiry.",
          icon: "error",
          // confirmButtonText: 'Cool'
        });
        navigate("/login");
      }
    }
    // let emailTest = importantFormFunctions.checkEmail
  };
  return (
    <>
      <div>
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <Modal
          open={props.openModal}
          onClose={props.handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Grid container>
              <Grid item xs={12}>
                {/* <Typography component="legend">Enquiry Subject</Typography> */}
                <TextField
                  value={EnquiryFormData.subject.value}
                  onChange={(e) => {
                    setEnquiryFormData((oldState) => {
                      let newState = { ...oldState };
                      newState.subject.value = e.target.value;
                      return newState;
                    });
                  }}
                  fullWidth
                  id="standard-basic"
                  label="Subject"
                  variant="standard"
                />
              </Grid>
              <Grid item mt={2} xs={12}>
                <TextField
                  value={EnquiryFormData.enquiryText.value}
                  onChange={(e) => {
                    setEnquiryFormData((oldState) => {
                      let newState = { ...oldState };
                      newState.enquiryText.value = e.target.value;
                      return newState;
                    });
                  }}
                  fullWidth
                  multiline
                  rows={4}
                  id="standard-basic"
                  label="Your Enquiry"
                  variant="standard"
                />
              </Grid>
              <Grid
                onClick={handleReviewFormDataSubmit}
                item
                mt={3}
                xs={8}
                alignSelf={"center"}
              >
                <Button variant="contained" color="primary">
                  Send Enquiry
                </Button>
              </Grid>
            </Grid>
            {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default EnquireNowModal;
