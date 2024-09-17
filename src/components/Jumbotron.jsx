import { Button, FormControl, Grid, InputAdornment, OutlinedInput, Pagination, Typography } from "@mui/material";

import jumbotronImg from "../assets/images/car-home-bg-3.jpeg";
import { useState } from "react";
import { useRef } from "react";

import axios from "axios";
import CarCardComponent from "./carCardComponent";
import SearchIcon from "@mui/icons-material/Search";
import "../components/jumbotron.css";
import SearchCarsComponent from "./SearchCarsComponent";

const Jumbotron = () => {
  const inventoryRef = useRef(scrollTo);  // Create a reference for the scrolling target

  const scrollToInventory = () => {
    inventoryRef.current.scrollIntoView({ behavior: 'smooth' });
  };


  return (
    <>
      <Grid
        container
        sx={{
          backgroundImage: `url(${jumbotronImg})`,
          backgroundPosition: "absolute",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "100vh", // Adjust height and width as needed
          width: "100vw",
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        xs={12}
      >
        <section
          style={{
            paddingBottom: "20em",
            textAlign: "center",

          }}
        >
          <Typography color={"#fafafa"} variant="h2" component={"h4"} sx={{ fontFamily: 'Garamond, serif', fontSize: '80px' }} id="Tagline" marginTop={10}>
            Find your Family Budget Car
          </Typography>

          <Grid container my={5}>
            <Grid item mb={2} xs={8} ml={"auto"} mr={"auto"}>

            </Grid>
            <SearchCarsComponent />

          </Grid>
          <Button variant="contained" onClick={scrollToInventory} sx={{ mt: 2, backgroundColor: "#1b3142", color: "#AF8863", }}>
            All Cars
          </Button>

        </section>
      </Grid>

      <Grid className='scrollTo' container height={"100vh"}></Grid>
    </>
  );
};

export default Jumbotron;
