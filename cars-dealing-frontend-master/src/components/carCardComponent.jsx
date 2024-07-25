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

const CarCardComponent = (props) => {
  const buttonStyles = {
    display: "inline-block",
    padding: "8px 16px" /* Adjust padding as needed */,
    border: "none",
    borderRadius: "50px" /* Creates the cylindrical shape */,
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
  const handleOpenEnquiry = ()=>{
    setOpenEnquiryModal(true);
  }
  const handleCloseEnquiry = ()=>{
    setOpenEnquiryModal(false);
  }
  return (
    <>
    
    <Card
      sx={{
        maxWidth: 345,
        minWidth: 280,
        display: "inline-flex",
        justifyContent: "space-between",
        flexDirection: "column",
        borderRadius: '32px',
        background: '#e0e0e0',
        boxShadow:  '24px 24px 26px #a8a8a8, -24px -24px 26px #ffffff'
      }}
    >
      <CardMedia
        sx={{ height: 140 }}
        image={links.backendUrl + "/" + props.car.images[0]}
        title={props.car.name}
      />
      <CardContent>
        <Typography gutterBottom variant="body2" component="div">
          {props.car.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <button style={buttonStyles}>{props.car.price}</button>
          <button style={buttonStyles}>{props.car.oldOrNew}</button>
          <button style={buttonStyles}>{props.car.carType}</button>

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
        <Button size="small" onClick={handleOpenEnquiry}>Enquire</Button>
      </CardActions>
    </Card>
    <EnquireNowModal openModal={openEnquiryModal} handleCloseModal={handleCloseEnquiry} carId={props.car._id}  />

    </>
  );
};
export default CarCardComponent;
