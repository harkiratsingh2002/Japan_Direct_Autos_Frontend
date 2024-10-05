import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import contactImage from '../assets/images/contact-us-bg.png';
import { FloatingWhatsApp } from '@carlos8a/react-whatsapp-floating-button';
import whatsappDP from '../assets/images/whatsappDP.jpg';
import { IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

const ContactUs = () => {
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleInputChange = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  // Validate form fields
  const validate = () => {
    let tempErrors = {};
    tempErrors.name = contactData.name ? '' : 'Name is required';
    tempErrors.email = /^\S+@\S+\.\S+$/.test(contactData.email)
      ? ''
      : 'Email is not valid';
    tempErrors.message = contactData.message ? '' : 'Message is required';
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === '');
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Process form data (e.g., send to server)
      console.log('Form data:', contactData);
      // Reset form fields
      setContactData({ name: '', email: '', message: '' });
      setErrors({});
      alert('Thank you for contacting us!');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        padding: { xs: 2, md: 4 },
        backgroundColor: '#f5f5f5', // Solid background color
      }}
    >
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          <Paper
            elevation={3}
            sx={{
              padding: { xs: 2, md: 4 },
              borderRadius: 2,
            }}
          >
            <Grid container spacing={2}>
              {/* Contact Form */}
              <Grid item xs={12} md={6}>
                <Typography variant="h4" gutterBottom>
                  Contact Us
                </Typography>
                <Typography variant="body1" gutterBottom>
                  We'd love to hear from you! Please fill out the form below.
                </Typography>
                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Name"
                    name="name"
                    variant="outlined"
                    value={contactData.name}
                    onChange={handleInputChange}
                    error={Boolean(errors.name)}
                    helperText={errors.name}
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Email"
                    name="email"
                    variant="outlined"
                    value={contactData.email}
                    onChange={handleInputChange}
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Message"
                    name="message"
                    variant="outlined"
                    multiline
                    rows={6}
                    value={contactData.message}
                    onChange={handleInputChange}
                    error={Boolean(errors.message)}
                    helperText={errors.message}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    Send Message
                  </Button>
                  <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <IconButton href="https://facebook.com">
                      <Facebook />
                    </IconButton>
                    <IconButton href="https://twitter.com">
                      <Twitter />
                    </IconButton>
                    <IconButton href="https://instagram.com">
                      <Instagram />
                    </IconButton>
                  </Box>
                </form>
              </Grid>

              {/* Image */}
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    height: '100%',
                    backgroundImage: `url(${contactImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: 2,
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* FAQs */}
        <Grid item xs={12} md={8} sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Frequently Asked Questions
          </Typography>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>How can I get in touch with a staff member?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                There are different ways to get in touch with our staff members. You can either send us an query using contact form below. You can also chat with our live agent by pressing the blue chat button at the bottom right of the screen. If you are in hurry and want to leave a WhatsApp message, press the green WhatsApp logo and follow the instructions.              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>How can I get in touch with a live Agent?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                If you want to get in contact with our live agent for any query please press the blue chat button at the bottom right of the screen. Just provide your name and email to get the conversation started.        </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>What are your business hours?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                We are open from 9 AM to 5 PM, Monday to Friday.
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
                Come pay us a visit and know more about us!              </Typography>
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
          {/* Add more FAQs as needed */}
        </Grid>


      </Grid>
      <div>
        <FloatingWhatsApp
          buttonStyle={{ marginRight: '5.5%', marginBottom: '-0.5%' }}
          phoneNumber='61451420125' // Required
          accountName='Japan Direct Autos' // Optional
          avatar={whatsappDP} // Optional
          initialMessageByServer='Hi there! How can we assist you?' // Optional
          statusMessage='Available' // Optional
          placeholder='Write here...' // Optional
          allowEsc={true}
        />
      </div>
    </Box>
  );
};

export default ContactUs;
