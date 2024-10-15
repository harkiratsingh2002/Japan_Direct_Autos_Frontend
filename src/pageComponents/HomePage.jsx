import { useWindowWidth } from "@react-hook/window-size";
import Jumbotron from "../components/Jumbotron";
import JumbotronMobile from "../components/JumbotronMobile";
import { Grid, Typography } from "@mui/material";
import ScrollContainer from "../components/ScrollContainer";
import { useEffect, useState } from "react";
import links from "../assets/util/links";
import { useDispatch } from "react-redux";
import { endLoader, startLoader } from "../reduxStore/loadingSlice";
import SearchCarsComponent from "../components/SearchCarsComponent";

// import { useEffect } from "react";
// import useDeviceWidth from "../customHooks/useDeviceWidth";

// import { Outlet } from "react-router-dom";
const HomePage = () => {
  const width = useWindowWidth();
  const [newCars, setnewCars] = useState([]);
  const [usedCars, setUsedCars] = useState([]);
  const [rentalCars, setRentalCars] = useState([]);

  // Overlay Settings
  const [overlayVisible, setOverlayVisible] = useState(true);

  const handleOverlayClose = () => {
    setOverlayVisible(false);
  };

  const cardStyle = {
    width: "300px",
    height: "400px",
    borderRadius: "16px",
    padding: "16px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    marginBottom: "16px",
    backgroundColor: "#fff",
  };


  const dispatch = useDispatch();
  useEffect(() => {
    let url = links.backendUrl + "/get-seven-new-cars";
    dispatch(startLoader());
    fetch(url)
      .then((data) => {
        dispatch(endLoader());

        console.log("response", data);
        return data.json();
      })
      .then((carsData) => {
        console.log("cars:- ", carsData);
        setnewCars(carsData.cars);
        // setCount(carsData.count);
      })
      .catch((err) => {
        dispatch(endLoader());
        console.log("err 7 new cars", err);
      });
    let url2 = links.backendUrl + "/get-seven-used-cars";
    fetch(url2)
      .then((data) => {
        dispatch(endLoader());

        console.log("response", data);
        return data.json();
      })
      .then((carsData) => {
        console.log("cars:- ", carsData);
        setUsedCars(carsData.cars);
        // setCount(carsData.count);
        // dispatch(endLoader());
      })
      .catch((err) => {
        dispatch(endLoader());
        console.log("err 7 used cars", err);
      });
    let url3 = links.backendUrl + "/get-seven-rental-cars";
    fetch(url3)
      .then((data) => {
        dispatch(endLoader());

        console.log("response", data);
        return data.json();
      })
      .then((carsData) => {
        console.log("cars:- ", carsData);
        setRentalCars(carsData.cars);
        // setCount(carsData.count);
        // dispatch(endLoader());
      })
      .catch((err) => {
        dispatch(endLoader());
        console.log("err 7 rental cars", err);
      });
  }, []);

  return (
    <>
      {/* <header>
                <Outlet />
            </header> */}
      <Grid container>
        {width <= 900 ? <JumbotronMobile /> : <Jumbotron />}
        <Grid
          container
          mb={2}
          xs={8}
          mr={"auto"}
          ml={5}
          marginTop={7}
          justifyContent="left"

        >
          <Typography variant="h3">Looking for cars?</Typography>
        </Grid>
        <SearchCarsComponent />

        <Grid
          container
          marginTop={3}
          marginLeft={"auto"}
          marginRight={"auto"}
          xs={10}
        >
          <Grid item xs={12} textAlign={"center"}>
            <Typography textAlign={"center"} variant="h2">
              Featured Cars
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          marginLeft={"auto"}
          marginRight={"auto"}
          xs={10}
          justifyContent={"space-around"}
        >
          <ScrollContainer carType={"new"} cars={newCars} cardStyle={cardStyle} />
        </Grid>

        <Grid
          container
          marginTop={4}
          marginLeft={"auto"}
          marginRight={"auto"}
          xs={10}
        >
          <Grid item xs={12} textAlign={"center"}>
            <Typography textAlign={"center"} variant="h2">
              Used Cars
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          mb={4}
          marginLeft={"auto"}
          marginRight={"auto"}
          xs={10}
          justifyContent={"space-around"}
        >
          <ScrollContainer carType={"used"} cars={usedCars} cardStyle={cardStyle} />
        </Grid>

        <Grid
          container
          marginLeft={"auto"}
          marginRight={"auto"}
          xs={10}
        >
          <Grid item xs={12} textAlign={"center"}>
            <Typography textAlign={"center"} variant="h2">
              Rental Cars
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          mb={4}
          marginLeft={"auto"}
          marginRight={"auto"}
          xs={10}
          justifyContent={"space-around"}
        >
          <ScrollContainer carType={"Rental"} cars={rentalCars} cardStyle={cardStyle} />
        </Grid>

      </Grid>


    </>
  );
};

export default HomePage;
