import React, { useState, useEffect } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  IconButton,
  Box,
  Chip,
} from "@mui/material";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import Carousel from "react-material-ui-carousel";
import axios from "axios";
import Swal from "sweetalert2";
import links from "../assets/util/links";
import EnquireNowModal from "./EnquireNowModal";

const CarCardComponent = ({ car, inWishlist: propInWishlist, setWishlistCars }) => {
  const [openEnquiryModal, setOpenEnquiryModal] = useState(false);
  const [inWishlist, setInWishlist] = useState(propInWishlist);
  const [isHovered, setIsHovered] = useState(false);

  // Check if the car is in the wishlist when the component mounts
  useEffect(() => {
    if (localStorage.getItem("userData")) {
      const userToken = JSON.parse(localStorage.getItem("userData")).userToken;
      axios
        .get(links.backendUrl + "/is-in-wishlist", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
          params: { carId: car._id },
        })
        .then((response) => {
          setInWishlist(response.data.inWishlist);
        })
        .catch((error) => {
          console.error("Error checking wishlist status:", error);
        });
    }
  }, [car._id]);

  const handleOpenEnquiry = () => {
    setOpenEnquiryModal(true);
  };

  const handleCloseEnquiry = () => {
    setOpenEnquiryModal(false);
  };

  const handleWishlistToggle = () => {
    if (localStorage.getItem("userData")) {
      const userToken = JSON.parse(localStorage.getItem("userData")).userToken;
      const url = inWishlist
        ? links.backendUrl + "/remove-from-wishlist"
        : links.backendUrl + "/add-to-wishlist";

      axios
        .post(
          url,
          { carId: car._id },
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        )
        .then((response) => {
          Swal.fire({
            title: "Success",
            text: response.data.message,
            icon: "success",
          });
          setInWishlist(!inWishlist); // Toggle wishlist state
        })
        .catch((error) => {
          Swal.fire({
            title: "Error",
            text: error.response?.data?.message || "An error occurred",
            icon: "error",
          });
        });
    } else {
      Swal.fire({
        title: "Error",
        text: "Please login to manage your wishlist.",
        icon: "error",
      });
    }
  };

  const handleDeleteCar = () => {
    if (localStorage.getItem("userData")) {
      const userToken = JSON.parse(localStorage.getItem("userData")).userToken;
      axios
        .post(
          links.backendUrl + "/remove-from-wishlist",
          {
            carId: car._id,
          },
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        )
        .then((response) => {
          Swal.fire({
            title: "Success",
            text: response.data.message,
            icon: "success",
          });
          setWishlistCars((oldState) => {
            let newState = [...oldState];
            let index = newState.indexOf(car._id);
            newState.splice(index, 1);
            return newState;
          });
          setInWishlist(false); // Remove the car from wishlist
        })
        .catch((err) => {
          Swal.fire({
            title: "Error",
            text: err.response?.data?.message || "An error occurred",
            icon: "error",
          });
        });
    } else {
      Swal.fire({
        title: "Error",
        text: "Login before accessing wishlist.",
        icon: "error",
      });
    }
  };

  return (
    <>
      <Card
        sx={{
          width: 345,
          maxWidth: 345,
          minWidth: 280,
          display: "inline-flex",
          justifyContent: "space-between",
          flexDirection: "column",
          borderRadius: "15px",
          background: "#fff",
          // boxShadow: "24px 24px 26px #a8a8a8, -24px -24px 26px #ffffff",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Box sx={{ position: "relative" }}>
          <Carousel
            indicators={false}
            navButtonsAlwaysVisible={isHovered}
            autoPlay={false}
            animation="slide"
            navButtonsProps={{
              style: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: isHovered ? "block" : "none",
              },
            }}
            navButtonsWrapperProps={{
              style: {
                top: "calc(50% - 20px)",
                height: 0,
              },
            }}
          >
            {car.images.map((image, index) => (
              <img
                key={index}
                src={`${links.backendUrl}/${image}`}
                alt={`${car.name} image ${index + 1}`}
                style={{ width: "100%", height: 180, objectFit: "cover" }}
              />
            ))}
          </Carousel>
          <IconButton
            onClick={handleWishlistToggle}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: inWishlist ? "red" : "white",
            }}
          >
            {inWishlist ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {car.name}
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
            <Chip label={`$${car.price}`} color="primary" variant="outlined" />
            <Chip label={car.oldOrNew} color="secondary" variant="outlined" />
            <Chip label={car.body || car.carType} variant="outlined" />
            {car.year && <Chip label={` ${car.year}`} variant="outlined" />}
          </Box>
        </CardContent>
        <CardActions>
          <Link to={`/car-details/${car._id}`}>
            <Button size="small">Learn More</Button>
          </Link>
          {/* <Button size="small" onClick={handleOpenEnquiry}>
            Enquire
          </Button> */}
          {inWishlist && (
            <IconButton
              size="large"
              edge="start"
              color="error"
              aria-label="delete-car"
              sx={{ ml: "auto" }}
              onClick={handleDeleteCar}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </CardActions>
      </Card>
      <EnquireNowModal
        openModal={openEnquiryModal}
        handleCloseModal={handleCloseEnquiry}
        carId={car._id}
      />
    </>
  );
};

export default CarCardComponent;
