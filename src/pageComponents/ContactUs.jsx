import { Button, Grid, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import contactbg from "../assets/images/contact-us-bg.png";
import myColors from "../assets/util/myColors";

const ContactUs = () => {

  const inputStyles = {
    fontSize: "1.2em",
    width: '100%',

    /* Set border radius for rounded corners */
    borderRadius: "5px",

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
      {/* FAQ Section */}
      <Grid container justifyContent={"center"} sx={{ backgroundImage: `url(${contactbg})`, backgroundSize: 'cover' }}>
        <Grid container justifyContent={"center"} sx={{ mt: 5, mb: 5 }}>
          <Grid item xs={10} md={6}>
            <Typography mb={2} variant="h4" sx={{ fontFamily: 'Garamond, serif', textAlign: 'center' }}>
              Frequently Asked Questions (FAQ)
            </Typography>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>How can I get in touch with a staff member?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  There are different ways to get in touch with our staff members. You can either send us an query using contact form below. You can also chat with our live agent by pressing the blue chat button at the bottom right of the screen. If you are in hurry and want to leave a WhatsApp message, press the green WhatsApp logo and follow the instructions.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>How can I get in touch with a live Agent?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  If you want to get in contact with our live agent for any query please press the blue chat button at the bottom right of the screen. Just provide your name and email to get the conversation started.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>What payment methods do you accept?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  We accept all major credit cards, PayPal, and bank transfers.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>What's the address of your shop?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  We are loacated at 44 Pirie St, Adelaide 5000.
                  Come pay us a visit and know more about us!
                </Typography>
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3271.2433260775038!2d138.59885077505982!3d-34.92543397455878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ab0ced707abc2d5%3A0x264df23bd797d1a4!2s44%20Pirie%20St%2C%20Adelaide%20SA%205000!5e0!3m2!1sen!2sau!4v1724211641575!5m2!1sen!2sau"
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>

        <Grid my={5} sx={{
          backgroundColor: myColors.myGrey,
          opacity: 0.9,
          padding: '3em',
          borderRadius: '1em',
          textAlign: "center",
        }} item xs={10} md={6}>

          <Typography mb={1} color={myColors.textBlack} variant="h3" sx={{ fontFamily: 'Garamond, serif' }}>
            Contact Us
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
              placeholder="E-mail"
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
          <Grid container justifyContent="center" mt={2}>
            <Button
              onClick={handleContactUs}
              size="large"
              variant="contained"
              color="info"
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
