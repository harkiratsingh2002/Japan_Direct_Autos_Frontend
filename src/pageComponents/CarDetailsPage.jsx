import {
  Button,
  Grid,
  Typography,
  TextField,
  Container,
  Box,
  FormControlLabel,
  Checkbox,
  ToggleButtonGroup,
  ToggleButton,
  useMediaQuery, useTheme
} from "@mui/material";

import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import links from "../assets/util/links"; ``
import CustomizedTable from "../components/CustomizedTable";
import ScrollingImageComponent from "../components/ScrollingImageComponent";
import ReviewsComponent from "../components/ReviewsComponent";
import EnquireNowModal from "../components/EnquireNowModal";
import { useDispatch, useSelector } from "react-redux";
import { endLoader, startLoader } from "../reduxStore/loadingSlice";
import { BorderAllOutlined } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import * as React from "react";
import axios from "axios";
import Swal from "sweetalert2";

const CarDetailsPage = (props) => {
  // const [images, setImages] = useState([]);
  const imageStyles = {};
  // useEffect to get params
  const params = useParams();
  const [carInfo, setCarInfo] = useState(null);
  // const [loadingData, setLoadingData] = useState(true);
  const [rows, setRows] = useState([]);
  // const [price, setPrice] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [userData, setUserData] = useState({});

  const [currentImage, setCurrentImage] = useState(null);
  const [openEnquiryModal, setOpenEnquiryModal] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const [EnquiryFormData, setEnquiryFormData] = useState({
    subject: {
      value: "",
      error: "",
      hasError: false,
    },
    enquiryText: {
      value: "Hello, is this car still available?",
      error: "",
      hasError: false,
    },
    email: {
      value: "", // Initially empty
      error: "",
      hasError: false,
    },
  });

  let userToken = "";
  const wishlist = useSelector((state) => state.userDataSlice.wishlist);
  useEffect(() => {
    // Check if user is logged in and pre-fill email
    if (localStorage.getItem("userData")) {
      const storedUserData = JSON.parse(localStorage.getItem("userData"));
      userToken = storedUserData.userToken;

      setEnquiryFormData((prevState) => ({
        ...prevState,
        email: { ...prevState.email, value: storedUserData.email }, // Pre-fill email from localStorage
      }));
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (userToken.length > 0) {
      axios
        .post(
          links.backendUrl + "/get-user",
          {},
          {
            headers: {
              Authorization: `Bearer ${userToken}`, // Assuming it's a Bearer token
            },
          }
        )
        .then((result) => {
          dispatch(endLoader());
          if (result.data.status < 200 || result.data.status > 299) {
            throw new Error("Error while getting user data.");
          }
          console.log("user data from get-user:", result.data.user);
          localStorage.setItem("oldEmail", result.data.user.email);
          setUserData(result.data.user); // Set user data in state
        })
        .catch((err) => {
          console.log("Error while getting user data:", err);
        });
    }
  }, [userToken]);

  // Update EnquiryFormData when userData is fetched
  useEffect(() => {
    if (userData.email) {
      setEnquiryFormData((prevState) => ({
        ...prevState,
        email: { ...prevState.email, value: userData.email }, // Update email field with fetched userData
      }));
    }
  }, [userData]);


  const [isLoggedIn, setIsLoggedIn] = useState(false);




  const navigate = useNavigate();

  let carId = params.carId;
  const handleSendEnquiry = () => {
    let userToken = null;

    // If the user is logged in, get the token (this part stays the same)
    if (localStorage.getItem("userData")) {
      const userData = JSON.parse(localStorage.getItem("userData"));
      userToken = userData.userToken;
    }

    let enquiryData = {
      enquirySubject: EnquiryFormData.subject.value,
      enquiryText: EnquiryFormData.enquiryText.value,
      carId: carId,
      carLink: window.location.href,
      enquiredByEmail: EnquiryFormData.email.value, // Always use the email from the input field
    };

    // Validate form fields
    if (
      EnquiryFormData.subject.value.length === 0 ||
      EnquiryFormData.enquiryText.value.length === 0
    ) {
      Swal.fire({
        title: "Error",
        text: "Both subject and comments are required.",
        icon: "error",
      });
      return;
    }

    // Validate email
    if (EnquiryFormData.email.value.length === 0) {
      Swal.fire({
        title: "Error",
        text: "Email is required.",
        icon: "error",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(EnquiryFormData.email.value)) {
      Swal.fire({
        title: "Error",
        text: "Please enter a valid email address.",
        icon: "error",
      });
      return;
    }

    dispatch(startLoader());

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(enquiryData),
    };

    // Attach the user token if logged in
    if (userToken) {
      fetchOptions.headers.authorization = `Bearer ${userToken}`;
    }

    fetch(`${links.backendUrl}/send-enquiry`, fetchOptions)
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            dispatch(endLoader());
            Swal.fire({
              title: "Error",
              text: err.message,
              icon: "error",
            });
            throw new Error(err.message);
          });
        }
        return res.json();
      })
      .then((result) => {
        dispatch(endLoader());
        Swal.fire({
          title: "Success",
          text: result.message,
          icon: "success",
        });
        setEnquiryFormData({
          subject: { value: "", error: "", hasError: false },
          enquiryText: { value: "", error: "", hasError: false },
          email: { value: "", error: "", hasError: false },
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  // Pre-fill email and disable input for logged-in users
  useEffect(() => {
    if (localStorage.getItem("userData")) {
      const storedUserData = JSON.parse(localStorage.getItem("userData"));
      setEnquiryFormData((prevState) => ({
        ...prevState,
        email: { ...prevState.email, value: storedUserData.email },
      }));
      setIsLoggedIn(true); // User is logged in
    }
  }, []);

  // let myRows = [];
  const handleOpenEnquiry = () => {
    setOpenEnquiryModal(true);
  };
  const handleCloseEnquiry = () => {
    setOpenEnquiryModal(false);
  };
  const handleAddToWishlist = () => {
    if (localStorage.getItem("userData")) {
      // console.log(JSON.parse(localStorage.getItem("userData")));
      let userToken = JSON.parse(localStorage.getItem("userData")).userToken;
      axios
        .post(
          links.backendUrl + "/add-to-wishlist",
          {
            carId: carId,
          },
          {
            headers: {
              Authorization: "Bearer " + userToken,
            },
          }
        )
        .then((response) => {
          console.log("response for add to wishlist:- ", response);
          let carCount = localStorage.getItem("wishlistLen")
            ? localStorage.getItem("wishlistLen")
            : 0;
          carCount++;
          localStorage.setItem("wishlistLen", carCount);
          Swal.fire({
            title: "Success",
            text: response.data.message,
            icon: "success",
          });
        })
        .catch((err) => {
          console.log("err", err);
          Swal.fire({
            title: "Error",
            text: err.response.data.message,
            icon: "error",
          });
        });
    } else {
      Swal.fire({
        title: "Error",
        text: "Login before adding to wishlist.",
        icon: "error",
      });
    }
  };
  const dispatch = useDispatch();
  useEffect(() => {
    // const asyncGetCarFn = async () => {
    try {
      dispatch(startLoader());
      const carResult = fetch(links.backendUrl + "/get-car", {
        method: "POST",
        body: JSON.stringify({ carId: carId }),
        headers: { "Content-Type": "application/json" },
      })
        .then((carResult) => {
          if (carResult.status < 200 || carResult.status > 299) {
            // alert("error while geting car info..!!");
            let newError = { message: "error while getting car" };
            throw newError;
          }
          return carResult.json();
        })
        .then((finalcarInfoResult) => {
          // let finalcarInfoResult = await carResult.json();
          console.log("car info:-", finalcarInfoResult.car);
          setCarInfo(finalcarInfoResult.car);
          let myRows = [
            { name: finalcarInfoResult.car.name },
            { price: finalcarInfoResult.car.price },
            {
              body: finalcarInfoResult.car.carType
                ? finalcarInfoResult.car.carType
                : finalcarInfoResult.car.body,
            },
            { color: finalcarInfoResult.car.color },
            { seatingCapacity: finalcarInfoResult.car.seatingCapacity },
            { year: finalcarInfoResult.car.year },
            { mileage: finalcarInfoResult.car.mileage },
            { make: finalcarInfoResult.car.make },
            { Engine: finalcarInfoResult.car.engine },
            { odometer: finalcarInfoResult.car.odometer },
            { model: finalcarInfoResult.car.model },
            { oldOrNew: finalcarInfoResult.car.oldOrNew },
            { fuelType: finalcarInfoResult.car.fuelType },
            { suspension: finalcarInfoResult.car.suspension },
            { transmission: finalcarInfoResult.car.transmission },
          ];
          setRows(myRows);
          setCurrentImage(finalcarInfoResult.car.images[0]);
          dispatch(endLoader());
          if (localStorage.getItem("userData")) {
            setIsLoggedIn(true);
            console.log("wishlist:- ", wishlist);
            if (wishlist.length != 0)
              if (
                wishlist.find((item) => {
                  return item._id == finalcarInfoResult._id;
                })
              ) {
                setIsInWishlist(true);
              }
          } else {
            setIsLoggedIn(false);
          }
        });

      // setLoadingData(false);
    } catch (err) {
      console.log("err:-", err);
      dispatch(endLoader());
    }
  }, [wishlist]);
  //new code
  const [alignment, setAlignment] = React.useState("left");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const headCols = ["Specification Type", "Value"];
  // if(carInfo){
  //   // setTimeout(()=>{},1000)

  // }

  const handleImageChange = (image) => {
    setCurrentImage(image);
  };

  return (
    <>
      {carInfo && (
        <>
          <Container maxWidth="lg">
            <Grid container spacing={2} p={3}>
              <Grid item xs={12} md={11} ml="auto" mr="auto">
                <Typography
                  variant={isMobile ? "h4" : "h2"}
                  style={{ fontWeight: 'bold' }}
                >
                  {carInfo.name} ({carInfo.grade})
                </Typography>
              </Grid>

              {/* Car Image */}
              <Grid item xs={12} md={7}>
                <>

                  <Grid container>
                    <ScrollingImageComponent
                      handleImageChange={handleImageChange}
                      images={carInfo.images}
                    />
                  </Grid>
                </>
              </Grid>

              {/* Contact/Inquiry Section */}
              <Grid item xs={12} md={5}>
                <Container maxWidth="sm">
                  <Box sx={{ textAlign: "center", marginBottom: 1 }}>
                    <Typography>Estimated Price</Typography>
                    <Typography variant="h4" color="error">
                      ${carInfo.price}*
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Excl. Govt. Charges
                    </Typography>
                  </Box>
                  {/* Wishlist Button */}
                  <Grid xs={12} mt={3} mb={2}>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleAddToWishlist}
                      fullWidth
                      endIcon={<FavoriteIcon />}
                    >
                      {isLoggedIn && isInWishlist
                        ? "Remove From Wishlist"
                        : "Add To Wishlist"}
                    </Button>
                  </Grid>
                  <Typography variant="h5" align="center" gutterBottom>
                    Check Availability
                  </Typography>


                  {/* Email Field: Disable input if logged in */}
                  <TextField
                    fullWidth
                    label="Email"
                    value={EnquiryFormData.email.value} // Pre-filled for logged-in users
                    required
                    disabled={isLoggedIn} // Disable the input if the user is logged in
                    onChange={(e) => {
                      setEnquiryFormData((state) => ({
                        ...state,
                        email: { ...state.email, value: e.target.value },
                      }));
                    }}
                    variant="outlined"
                    margin="dense"
                  />
                  {/* Subject Field */}
                  <TextField
                    fullWidth
                    label="Subject"
                    value={EnquiryFormData.subject.value}
                    required
                    onChange={(e) => {
                      setEnquiryFormData((state) => ({
                        ...state,
                        subject: { ...state.subject, value: e.target.value },
                      }));
                    }}
                    variant="outlined"
                    margin="dense"
                  />

                  {/* Comments Field */}
                  <TextField
                    fullWidth
                    label="Comments"
                    value={EnquiryFormData.enquiryText.value}
                    onChange={(e) => {
                      setEnquiryFormData((state) => ({
                        ...state,
                        enquiryText: { ...state.enquiryText, value: e.target.value },
                      }));
                    }}
                    variant="outlined"
                    margin="normal"
                    multiline
                    rows={2}
                  />

                  <Button
                    variant="contained"
                    onClick={handleSendEnquiry}
                    color="warning"
                    fullWidth
                  >
                    Send Enquiry
                  </Button>



                </Container>
              </Grid>
            </Grid>
            <Container item xs={11}>
              <Typography variant="h4">Description</Typography>
              <Typography mt={1}>{carInfo.description}</Typography>
            </Container>
          </Container>


        </>
      )}

      <Grid container xs={12} md={10} mb={4} ml="auto" mr="auto" mt={4}>
        <Typography variant="h2">Key Features</Typography>
      </Grid>

      <Grid container xs={12} md={10} mb={4} ml="auto" mr="auto" mt={4}>
        <CustomizedTable headerCols={headCols} rows={rows} />
      </Grid>

      <ReviewsComponent />c
      {/* 
      Sticky Enquire Now Button
      <Button sx={{
        position: 'fixed',
        right: '40px',
        bottom: '40px',
        zIndex: 999
      }} onClick={handleOpenEnquiry} size="large" variant="contained">Enquire Now</Button>
      <EnquireNowModal openModal={openEnquiryModal} handleCloseModal={handleCloseEnquiry} carId={carId} /> */}
    </>
  );
};

export default CarDetailsPage;
