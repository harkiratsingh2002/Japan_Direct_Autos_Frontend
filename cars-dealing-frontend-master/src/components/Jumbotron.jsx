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
          <Typography color={"white"} variant="h1" component={"h1"} sx={{ fontFamily: 'Garamond, serif' }}>
            Get your Dream Car Today!
          </Typography>
          <Typography mt={1} color={"white"} variant="h3" component={"h2"} sx={{ fontFamily: 'Garamond, serif' }}>
            Specialist in new and old japanese vehicles.
          </Typography>
        </section>
      </Grid>

      <Grid container height={"100vh"}></Grid>
    </>
  );
};

export default Jumbotron;
