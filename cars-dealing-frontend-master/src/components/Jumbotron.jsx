import {
  FormControl,
  Grid,
  InputAdornment,
  OutlinedInput,
  Pagination,
  Typography,
} from "@mui/material";
import jumbotronImg from "../assets/images/car-home-bg-3.jpeg";
import { useState } from "react";
import axios from "axios";
import CarCardComponent from "./carCardComponent";
import SearchIcon from "@mui/icons-material/Search";

const Jumbotron = () => {
  // const jumbotronContainerStyles = {
  //     backgroun
  // }

  return (
    <>
      <Grid
        container
        sx={{
          backgroundImage: `url(${jumbotronImg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "100vh", // Adjust height and width as needed
          width: "100vw",
          position: "absolute",
        }}
        xs={12}
      >
        <section
          style={{
            position: "relative",
            left: "10vw",
            top: "10vh",
          }}
        >
          <Typography color={"white"} variant="h3" component={"h1"}>
            Get your Dream Car Today!
          </Typography>
          <Typography mt={1} color={"white"} variant="h4" component={"h2"}>
            Discover Top-Notch New and Pre-Owned Japanese Cars at Unbeatable
            Prices!
          </Typography>
        </section>
      </Grid>

      <Grid container height={"100vh"}></Grid>
    </>
  );
};

export default Jumbotron;
