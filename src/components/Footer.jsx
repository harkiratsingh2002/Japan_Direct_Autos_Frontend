import { useState } from "react";
import {
  Button,
  Grid,
  TextField,
  Typography,
  Divider,
  Box,
  Link as MuiLink,
} from "@mui/material";
import myColors from "../assets/util/myColors";
import { useDispatch } from "react-redux";
import { endLoader, startLoader } from "../reduxStore/loadingSlice";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram } from "@mui/icons-material";
import logo from "../assets/images/whatsappDP.jpg";
import links from "../assets/util/links";
import Swal from "sweetalert2";
import privacyPolicy from "../assets/privacyPolicy.pdf";

const Footer = () => {
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubscription = () => {
    if (!validateEmail(subscribeEmail)) {
      Swal.fire({
        title: "Error",
        text: "Please enter a valid email.",
        icon: "error",
      });
      return;
    }

    let url = links.backendUrl + "/subscribe";
    setLoading(true);
    dispatch(startLoader());
    fetch(url, {
      method: "POST",
      body: JSON.stringify({ to: subscribeEmail }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(endLoader());
        setLoading(false);
        console.log("data:-", data);
        Swal.fire({
          title: "Success",
          text: data.message,
          icon: "success",
        });
        setSubscribeEmail("");
      })
      .catch((error) => {
        console.error(error);
        dispatch(endLoader());
        setLoading(false);
        Swal.fire({
          title: "Error",
          text: "Subscription failed. Please try again.",
          icon: "error",
        });
      });
  };

  return (
    <Box
      sx={{
        backgroundColor: myColors.textBlack,
        color: myColors.myGrey,
        padding: 4,
      }}
    >
      {/* Horizontal Container for Two Halves */}
      <Grid
        container
        spacing={4}
        justifyContent="space-between"
        alignItems="flex-start"
      >
        {/* First Half: Links Section */}
        <Grid container item xs={12} md={6} spacing={4}>
          {/* Product Links */}
          <Grid item xs={6}>
            <Typography variant="h6" color={myColors.offWhite} mb={1.4}>
              Product
            </Typography>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <Link to="/new-cars" style={{ textDecoration: "none" }}>
                  <Typography
                    color={myColors.offWhite}
                    mb={0.7}
                    variant="body1"
                  >
                    Featured Cars
                  </Typography>
                </Link>
              </li>
              <li>
                <Link to="/used-cars" style={{ textDecoration: "none" }}>
                  <Typography
                    color={myColors.offWhite}
                    mb={0.7}
                    variant="body1"
                  >
                    Used Cars
                  </Typography>
                </Link>
              </li>
              <li>
                <Link to="/rental-cars" style={{ textDecoration: "none" }}>
                  <Typography
                    color={myColors.offWhite}
                    mb={0.7}
                    variant="body1"
                  >
                    Rental Cars
                  </Typography>
                </Link>
              </li>
            </ul>
          </Grid>

          {/* Contact Links */}
          <Grid item xs={6}>
            <Typography variant="h6" color={myColors.offWhite} mb={1.4}>
              Contact
            </Typography>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <Link to="/contact-us" style={{ textDecoration: "none" }}>
                  <Typography
                    color={myColors.offWhite}
                    mb={0.7}
                    variant="body1"
                  >
                    Contact Us
                  </Typography>
                </Link>
              </li>
              <li>
                <Link to="/about-us" style={{ textDecoration: "none" }}>
                  <Typography
                    color={myColors.offWhite}
                    mb={0.7}
                    variant="body1"
                  >
                    About Us
                  </Typography>
                </Link>
              </li>
              <li>
                <Link
                  to="https://api.whatsapp.com/send/?phone=61451420125&text=dsd"
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    color={myColors.offWhite}
                    mb={0.7}
                    variant="body1"
                  >
                    Whatsapp Us
                  </Typography>
                </Link>
              </li>
              <li>
                <a
                  href={privacyPolicy}
                  target="_blank" // Opens in a new tab
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  <Typography color={myColors.offWhite} mb={0.7} variant="body1">
                    Privacy Policy
                  </Typography>
                </a>
              </li>
            </ul>
          </Grid>
        </Grid>

        {/* Second Half: Newsletter & Social Media */}
        <Grid container item xs={12} md={6} direction="column" spacing={2}>
          {/* Newsletter Subscription and Logo */}
          <Grid item>
            <Typography variant="h6" color={myColors.offWhite} mb={1.4}>
              Subscribe to our Newsletter
            </Typography>
            <Grid container alignItems="center" spacing={2}>
              {/* Email Input */}
              <Grid item xs={8} md={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="Enter your email"
                  value={subscribeEmail}
                  onChange={(e) => setSubscribeEmail(e.target.value)}
                  InputProps={{
                    sx: {
                      backgroundColor: myColors.offWhite,
                      borderRadius: "4px",
                    },
                  }}
                  sx={{ mb: { xs: 2, md: 0 } }}
                />
                {/* Subscribe Button */}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubscription}
                  disabled={loading}
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Subscribe
                </Button>
              </Grid>

              {/* Logo
              <Grid item xs={4} md={3}>
                <img
                  src={logo} // Replace with the actual path to your logo
                  alt="Dealership Logo"
                  style={{ height: 80, marginLeft: '11em' }} // Adjust height as needed
                />
              </Grid> */}
            </Grid>
          </Grid>

          {/* Social Media Links */}
          <Grid item>
            <Box display="flex" gap={2}>
              <MuiLink
                href="https://facebook.com"
                target="_blank"
                color={myColors.offWhite}
              >
                <Facebook />
              </MuiLink>

              <MuiLink
                href="https://instagram.com"
                target="_blank"
                color={myColors.offWhite}
              >
                <Instagram />
              </MuiLink>
            </Box>
          </Grid>
        </Grid>
      </Grid>

      {/* Divider, Logo & Copyright */}
      <Divider sx={{ backgroundColor: myColors.myGrey, mt: 4, mb: 3 }} />

      {/* Copyright Statement */}
      <Typography variant="body2" color={myColors.offWhite}>
        &copy; {new Date().getFullYear()} Japan Direct Autos. All rights
        reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
