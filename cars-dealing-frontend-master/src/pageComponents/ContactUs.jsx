import { Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import myColors from "../assets/util/myColors";

const ContactUs = () => {

    const inputStyles = {
        fontSize: "1.2em",
        width: '100%',
    
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
  return (
    <>
      <Grid container justifyContent={"center"}>
        <Grid my={5} sx={{
            backgroundColor: myColors.textBlack,
            padding: '3em',
            borderRadius: '5em'
        }} item xs={10} md={6}>
           
          <Typography mb={1} color={myColors.offWhite} variant="h6">
            Contact Us.
          </Typography>
          <Grid container>

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
          ></input>
          </Grid>
          <Grid container mt={2}>
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
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ContactUs
