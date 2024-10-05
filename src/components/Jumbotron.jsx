import { Button, FormControl, Grid, InputAdornment, OutlinedInput, Pagination, Typography } from "@mui/material";

import bgHome from "../assets/images/bg_home.jpeg";
import { useState } from "react";
import { useRef } from "react";

import axios from "axios";
import CarCardComponent from "./carCardComponent";
import SearchIcon from "@mui/icons-material/Search";
import "../assets/styles/jumbotron.css";
import SearchCarsComponent from "./SearchCarsComponent";

const Jumbotron = () => {
  const inventoryRef = useRef(scrollTo);  // Create a reference for the scrolling target


  const scrollToInventory = () => {
    const element = inventoryRef.current;
    if (element) {
      // Scroll the element into view
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Additional adjustment to center the element vertically
      const elementRect = element.getBoundingClientRect();
      const absoluteElementTop = elementRect.top + window.pageYOffset;
      const middleOffset = (window.innerHeight / 2) - (elementRect.height / 2);
      const scrollToPosition = absoluteElementTop - middleOffset;

      // Scroll to the calculated position
      window.setTimeout(() => {
        window.scrollTo({
          top: scrollToPosition,
          behavior: 'smooth'
        });
      }, 300); // Adjust time as necessary for the initial scroll to complete
    }
  };


  return (
    <>
      <Grid
        container
        sx={{
          backgroundImage: `url(${bgHome})`,
          backgroundPosition: "fixed",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "100vh", // Adjust height and width as needed
          width: "100vw",
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



        </section>
      </Grid >

    </>
  );
};

export default Jumbotron;
