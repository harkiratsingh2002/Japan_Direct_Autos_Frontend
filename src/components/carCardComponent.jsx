import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import myColors from "../assets/util/myColors";
import links from "../assets/util/links";
import { Link } from "react-router-dom";
import EnquireNowModal from "./EnquireNowModal";
import DeleteIcon from "@mui/icons-material/Delete";
import { colors, IconButton } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";

const CarCardComponent = (props) => {
  const buttonStyles = {
    display: "inline-block",
    padding: "8px 16px" /* Adjust padding as needed */,
    border: "none",
    borderRadius: "8px" /* Creates the cylindrical shape */,
    backgroundColor: "#d3d3d3",
    color: myColors.textBlack /* Adjust text color as desired */,
    // cursor: pointer,
    transition:
      "all 0.2s ease-in-out" /* Add a smooth hover effect (optional) */,

    /* Text styling */
    fontSize: "0.8rem" /* Very small text size */,
    textAlign: "center",
    whiteSpace: "nowrap",
    margin: "0.4rem",
  };
  const [openEnquiryModal, setOpenEnquiryModal] = React.useState(false);
  const handleOpenEnquiry = () => {
    setOpenEnquiryModal(true);
  };
  const handleCloseEnquiry = () => {
    setOpenEnquiryModal(false);
  };
  const handleDeleteCar = () => {
    if (localStorage.getItem("userData")) {
      // console.log(JSON.parse(localStorage.getItem("userData")));
      let userToken = JSON.parse(localStorage.getItem("userData")).userToken;
      axios
        .post(
          links.backendUrl + "/remove-from-wishlist",
          {
            carId: props.car._id,
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
          props.setWishlistCars((oldState) => {
            let newState = [...oldState];
            let index = newState.indexOf(props.car._id);
            newState.splice(index, 1);
            return newState;
          });
          let carCount = localStorage.getItem("wishlistLen")
            ? localStorage.getItem("wishlistLen")
            : 1;
          carCount--;
          localStorage.setItem("wishlistLen", carCount);
        })
        .catch((err) => {
          Swal.fire({
            title: "Error",
            text: err.response.data.message,
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
          maxWidth: 345,
          // width: props.inMobile ? 280 : 345,
          minWidth: 280,
          display: "inline-flex",
          justifyContent: "space-between",
          flexDirection: "column",
          borderRadius: "15px",
          background: "#e0e0e0",
          // boxShadow: "24px 24px 26px #a8a8a8, -24px -24px 26px #ffffff",
        }}
      >
        <CardMedia
          sx={{ height: 140 }}
          image={links.backendUrl + "/" + props.car.images[0]}
          title={props.car.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" >
            {props.car.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <button style={buttonStyles}>${props.car.price}</button>
            <button style={buttonStyles}>{props.car.oldOrNew}</button>
            <button style={buttonStyles}>
              {props.car.body ? props.car.body : props.car.carType}
            </button>

            {/* <Button m={1} variant='outlined'>{props.car.oldOrNew}</Button>
          <Button m={1} variant='outlined'>Type: {props.car.carType}</Button>
          <Button m={1} variant='outlined'>Model: {props.car.year}</Button>
          <Button m={1} variant='outlined'>SeatingCapacity: {props.car.seatingCapacity}</Button> */}
          </Typography>
        </CardContent>
        <CardActions>
          <Link to={`/car-details/${props.car._id}`}>
            <Button
              size="small"
              onClick={() => {
                console.log("car id:- ", props.car._id);
              }}
            >
              Learn More
            </Button>
          </Link>
          <Button size="small" onClick={handleOpenEnquiry}>
            Enquire
          </Button>
          {props.inWishlist && (
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
        carId={props.car._id}
      />
    </>
  );
};
export default CarCardComponent;
