import { useRef, useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";
import CarCardComponent from "./carCardComponent";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function ScrollContainer(props) {
  const matches = useMediaQuery("(max-width:600px)"); // Media query for responsiveness
  const navigate = useNavigate();

  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    if (direction === "left") {
      scrollRef.current.scrollLeft -= matches ? 280 : 400; // Adjust scroll amount for mobile
    } else {
      scrollRef.current.scrollLeft += matches ? 280 : 400; // Adjust scroll amount for mobile
    }
  };


  return (
    <>
      <IconButton
        onClick={() => handleScroll("left")}
        style={{
          position: "absolute",
          left: matches ? 10 : 60, // Adjust the position for mobile screens
          zIndex: 1,
          marginTop: 150,
          marginLeft: matches ? -12 : 0, // Adjust the margin for mobile screens

        }}
      >
        <ArrowBackIosNewIcon />
      </IconButton>
      <Grid
        ref={scrollRef}
        sx={{
          overflowX: "scroll",
          whiteSpace: "nowrap",
          display: "flex",
          scrollbarWidth: "none", // Hides the scrollbar
          msOverflowStyle: "none", // For IE and Edge
          "&::-webkit-scrollbar": {
            display: "none", // For Chrome, Safari, and Opera
          },
        }}
      >
        <>
          {props.cars.map((car, index) => {
            return (
              <div
                key={index}
                style={{
                  margin: matches ? "0.5em" : "2em", // Smaller margin for mobile
                }}
              >
                <CarCardComponent inMobile={matches} car={car} />
              </div>
            );
          })}
          <Card
            sx={{
              maxWidth: matches ? 240 : 360, // Reduced card width for mobile
              minWidth: 240,
              maxHeight: 360, // Smaller height for mobile
              marginTop: 5,
              display: "inline-flex",
              justifyContent: "space-between",
              flexDirection: "column",
              borderRadius: "10px",
              background: "#e0e0e0",
              // boxShadow: "24px 24px 26px #a8a8a8, -24px -24px 26px #ffffff",
              cursor: "pointer",
            }}
            onClick={() => {
              if (props.carType === "Featured") {
                navigate("/new-cars");
              } else if (props.carType === "used") {
                navigate("/used-cars");
              } else if (props.carType === "Rental") {
                navigate("/rental-cars");
              }
            }}
          >
            <CardContent
              sx={{
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: matches ? "20%" : "35%", // Adjusted content alignment for mobile
              }}
            >
              <Typography variant="h6">See More</Typography>
            </CardContent>
          </Card>
        </>
      </Grid>
      <IconButton
        onClick={() => handleScroll("right")}
        style={{
          position: "absolute",
          right: matches ? 10 : 60, // Adjust the position for mobile screens
          zIndex: 1,
          marginTop: 150,
          marginRight: matches ? -15 : 0, // Adjust the margin for mobile screens
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </>
  );
}

export default ScrollContainer;
