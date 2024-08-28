import { useRef, useState } from 'react';
import { Card, CardContent, CardMedia, Grid, Paper, Typography, IconButton } from "@mui/material";
import CarCardComponent from "./carCardComponent";
import styles from "./ScrollContainer.module.css";
import myColors from "../assets/util/myColors";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function ScrollContainer(props) {
  const matches = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();

  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    if (direction === 'left') {
      scrollRef.current.scrollLeft -= 200; // Adjust the value as needed
    } else {
      scrollRef.current.scrollLeft += 200; // Adjust the value as needed
    }
  };


  return (
    <>
      <IconButton onClick={() => handleScroll('left')} style={{ position: 'absolute', left: 60, zIndex: 1, marginTop: 150 }}>
        <ArrowBackIosNewIcon />
      </IconButton>
      <Grid
        ref={scrollRef}
        sx={{
          overflowX: "scroll",
          whiteSpace: "nowrap",
          display: "flex",
          scrollbarWidth: "none", // Hides the scrollbar
          msOverflowStyle: "none",  // For IE and Edge
          "&::-webkit-scrollbar": {
            display: "none"  // For Chrome, Safari, and Opera
          }

        }}
      >
        <>
          {props.cars.map((car, index) => {
            return (
              <>
                {/* <Grid m={3} item sx={{
                            display:'inline-flex'
                        }}  > */}
                <div key={index}
                  style={{
                    margin: "2em",
                  }}
                >
                  <CarCardComponent inMobile={matches} car={car} />
                </div>
                {/* </Grid> */}
              </>
            );
          })}
          <Card
            sx={{
              maxWidth: 345,
              // width: props.inMobile ? 280 : 345,
              minWidth: 280,
              maxHeight: 280,
              marginTop: 5,
              display: "inline-flex",
              justifyContent: "space-between",
              flexDirection: "column",
              borderRadius: "32px",
              background: "#e0e0e0",
              boxShadow: "24px 24px 26px #a8a8a8, -24px -24px 26px #ffffff",
              cursor: 'pointer'
            }}
            onClick={() => {
              if (props.carType == 'new') {
                navigate('/new-cars')
              }
              else if (props.carType == 'used') {
                navigate('/used-cars')
              }
              else if (props.carType == 'rental') {
                navigate('/rental-cars')
              }
            }}
          >
            {/* <CardMedia
              sx={{ height: 140 }}
              // image={links.backendUrl + "/" + props.car.images[0]}
              // title={props.car.name}
            /> */}
            <CardContent sx={{
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: '35%'
            }}>
              <Typography variant="h6">

                See More
              </Typography>

            </CardContent>
          </Card>

        </>
      </Grid>
      <IconButton onClick={() => handleScroll('right')} style={{ position: 'absolute', right: 60, zIndex: 1, marginTop: 150 }}>
        <ArrowForwardIosIcon />
      </IconButton>
    </>
  );
}

export default ScrollContainer;
