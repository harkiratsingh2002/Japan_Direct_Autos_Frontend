import { Button, Grid, TextField, Typography } from "@mui/material";
import myColors from "../assets/util/myColors";
import { Label } from "@mui/icons-material";
import { useState } from "react";
import links from "../assets/util/links";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { endLoader, startLoader } from "../reduxStore/loadingSlice";
import { Link } from "react-router-dom";

const Footer = () => {
  const inputStyles = {
    fontSize: "1.2em",

    /* Set border radius for rounded corners */
    borderRadius: "25px",

    /* Remove default border */
    border: "none",

    /* Add some padding for better readability */
    padding: "10px 20px",

    /* Add a subtle box-shadow for a more rounded appearance (optional) */
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  };
  const buttonStyles = {
    display: "inline-block",
    padding: "8px 16px" /* Adjust padding as needed */,
    border: "none",
    borderRadius: "50px" /* Creates the cylindrical shape */,
    backgroundColor: "#F9F9F9",
    color: myColors.textBlack /* Adjust text color as desired */,
    // cursor: pointer,
    transition:
      "all 0.2s ease-in-out" /* Add a smooth hover effect (optional) */,

    /* Text styling */
    fontSize: "1.3rem" /* Very small text size */,
    textAlign: "center",
    whiteSpace: "nowrap",
    margin: "0.4rem",
  };
  const [contactUsData, setContactUsData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [subscribeEmail, setSubscribeEmail] = useState("");
  const dispatch = useDispatch()
  const handleContactUs = () => {
    let url = links.backendUrl + "/contact-us";
    dispatch(startLoader())
    fetch(url, {
      method: "POST",
      body: JSON.stringify(contactUsData), // This is the data you want to send
      headers: { "Content-Type": "application/json" }, // Specify JSON content
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
    dispatch(endLoader())

        alert(data.message);
        setContactUsData({
          name: "",
          email: "",
          message: "",
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleSubscribtion = () => {
    let url = links.backendUrl + "/subscribe";
    dispatch(startLoader())
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        to: subscribeEmail,
      }), // This is the data you want to send
      headers: { "Content-Type": "application/json" }, // Specify JSON content
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(endLoader())
        Swal.fire({

          title: 'Success',
          text:data.message ,
          icon: 'success',
        }
        )
        setSubscribeEmail("");
      })
      .catch((error) => {
        dispatch(endLoader())
        console.error(error);
      });
  };
  return (
    <>
      <Grid
        mt={"auto"}
        container
        p={4}
        xs={12}
        sx={{
          backgroundColor: myColors.textBlack,
          color: myColors.myGrey,
        }}
        justifyContent={'space-between'}
      >
        <Grid item mb={3.2}  xs={10} md={6}>
         
          {/* <Typography  mb={1} color={myColors.offWhite} variant="h6">
            Sign Up For News-Letter.
          </Typography>
          <input
            id="newsletter"
            onChange={(e) => {
              setSubscribeEmail(e.target.value);
            }}
            value={subscribeEmail}
            style={inputStyles}
            placeholder="email"
            type="text"
            // onClick={handleSubscribtion}
          ></input>
          <Grid ml={2}
              mt={2} container>
            <Button
              variant="contained"
              size="small"
              onClick={handleSubscribtion}
            >
              Subscribe
            </Button>
          </Grid> */}
          <Grid container  ml={1} justifyContent={'center'}>
            <Grid item xs={12}>
            <Typography mb={1.4} variant="h5">
                Links
              </Typography>
              <Link to={'/'}>
              
              <Typography color={myColors.offWhite} mb={0.7} variant="body1">
                Home
              </Typography>
              </Link>
              <Link to={'/new-cars'}>
              <Typography  color={myColors.offWhite} mb={0.7} variant="body1">
                New Cars
              </Typography>
              </Link>
              <Link  to={'/used-cars'}>
              <Typography color={myColors.offWhite} mb={0.7} variant="body1">
                Used Cars
              </Typography>
              </Link>
              <Link to={'/rental-cars'}>
              
              <Typography color={myColors.offWhite} mb={0.7} variant="body1">
                Rental Cars
              </Typography>
              </Link>
              <Link to={'/contact-us'}>
              <Typography color={myColors.offWhite} mb={0.7} variant="body1">
                Contact Us
              </Typography>
              </Link>
             
            </Grid>
          </Grid>
        </Grid>
        <Grid item  mb={3.2} xs={10} md={4}>
        <Typography  mb={1} color={myColors.offWhite} variant="h6">
            Sign Up For News-Letter.
          </Typography>
          <input
            id="newsletter"
            onChange={(e) => {
              setSubscribeEmail(e.target.value);
            }}
            value={subscribeEmail}
            style={inputStyles}
            placeholder="email"
            type="text"
            // onClick={handleSubscribtion}
          ></input>
          <Grid ml={2}
              mt={2} container>
            <Button
              variant="contained"
              size="small"
              onClick={handleSubscribtion}
            >
              Subscribe
            </Button>
          </Grid>
          {/* <Typography  mb={1} color={myColors.offWhite} variant="h6">
            Contact Us.
          </Typography>
          <input
            id="name"
            onChange={(e) => {
              setContactUsData((state) => {
                let newState = { ...state };
                newState.name = e.target.value;
                return newState;
              });
            }}
            style={inputStyles}
            value={contactUsData.name}
            placeholder="Name"
            type="text"
          ></input> */}
          {/* <Grid container mt={2}>
            <input
              id="email"
              onChange={(e) => {
                setContactUsData((state) => {
                  let newState = { ...state };
                  newState.email = e.target.value;
                  return newState;
                });
              }}
              style={inputStyles}
              value={contactUsData.email}
              placeholder="email"
              type="text"
            ></input>
          </Grid>
          <Grid container mt={2}>
            <textarea
              onChange={(e) => {
                setContactUsData((state) => {
                  let newState = { ...state };
                  newState.message = e.target.value;
                  return newState;
                });
              }}
              rows="10"
              cols="50"
              id="message"
              value={contactUsData.message}
              style={inputStyles}
              placeholder="Your Message... "
            ></textarea>
          </Grid>
          <Grid container ml={2} mt={2}>
            <Button
              onClick={handleContactUs}
              size="large"
              variant="contained"
              color="primary"
            >
              Send
            </Button>
          </Grid> */}
        </Grid>
      </Grid>
    </>
  );
};

export default Footer;
