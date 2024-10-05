import React from 'react';
import { Container, Grid, Typography, Paper, Box } from '@mui/material';
import carImage from '../assets/images/aboutUs.jpeg';
import familyImage from '../assets/images/aboutUs2.jpeg';
import headingImage from '../assets/images/aboutUsHeading.jpg';

const AboutUsPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          color: '#fff',
          py: { xs: 6, md: 8 },
          textAlign: 'center',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${headingImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(4px)', // Adjust the blur intensity here
            zIndex: -1,
          },
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" component="h1" gutterBottom>
            About Us
          </Typography>
          <Typography variant="h5">
            Bringing Reliable Japanese Cars to Adelaide Since 1995
          </Typography>
        </Container>
      </Box>

      {/* Introduction */}
      <Container sx={{ py: { xs: 4, md: 6 } }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <img
              src={familyImage}
              alt="Our Family"
              style={{ width: '100%', borderRadius: 8 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              Our Story
            </Typography>
            <Typography variant="body1" paragraph>
              Welcome to <strong>Japan Direct Autos</strong>, a family-owned business
              based in Adelaide, Australia. We specialize in importing high-quality,
              reliable, and affordable cars from Japan to provide our customers with the
              best driving experience without breaking the bank.
            </Typography>
            <Typography variant="body1" paragraph>
              Our passion for cars started over 25 years ago when we realized the
              potential of Japanese vehicles in offering unmatched reliability and value.
              Since then, we've been committed to connecting the people of Adelaide with
              their perfect car.
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* Our Values */}
      <Box sx={{ bgcolor: 'grey.100', py: { xs: 4, md: 6 } }}>
        <Container>
          <Typography variant="h4" align="center" gutterBottom>
            Our Values
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                title: 'Quality',
                description:
                  'We ensure every car meets our strict quality standards before offering it to you.',
              },
              {
                title: 'Integrity',
                description:
                  'Honesty and transparency are at the core of our business practices.',
              },
              {
                title: 'Customer Satisfaction',
                description:
                  'Your happiness is our success. We strive to exceed your expectations.',
              },
            ].map((value, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="h5" gutterBottom>
                    {value.title}
                  </Typography>
                  <Typography variant="body1">{value.description}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Why Choose Us */}
      <Container sx={{ py: { xs: 4, md: 6 } }}>
        <Typography variant="h4" align="center" gutterBottom>
          Why Choose Us?
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            {[
              {
                title: 'Extensive Selection',
                description:
                  'We offer a wide range of vehicles to suit all needs and budgets.',
              },
              {
                title: 'Expert Guidance',
                description:
                  'Our knowledgeable team is here to help you make the best choice.',
              },
              {
                title: 'After-Sales Support',
                description:
                  'We provide ongoing support to ensure your complete satisfaction.',
              },
            ].map((item, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body1">{item.description}</Typography>
              </Box>
            ))}
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              src={carImage}
              alt="Japanese Car"
              style={{ width: '100%', borderRadius: 8 }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Contact Information */}
      <Box
        sx={{
          bgcolor: '#1b3142',
          color: 'primary.contrastText',
          py: { xs: 4, md: 6 },
          textAlign: 'center',
        }}
      >
        <Container>
          <Typography variant="h4" gutterBottom>
            Get in Touch
          </Typography>
          <Typography variant="body1" paragraph>
            Ready to find your next car? Contact us today or visit our showroom.
          </Typography>
          <Typography variant="body1">
            Phone: (08) 1234 5678 | Email: info@JDAimports.com.au
          </Typography>
          <Typography variant="body1">
            Address: 123 Main Street, Adelaide, SA 5000
          </Typography>
        </Container>
      </Box>
    </div>
  );
};

export default AboutUsPage;
