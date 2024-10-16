import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  OutlinedInput,
  Pagination,
  Typography,
  Box,
  Skeleton,
} from "@mui/material";
import { useEffect, useState } from "react";
import links from "../assets/util/links";
import CarCardComponent from "../components/carCardComponent";
import { useDispatch, useSelector } from "react-redux";
import { endLoader, startLoader } from "../reduxStore/loadingSlice";
import SearchCarsComponent from "../components/SearchCarsComponent";
import axios from "axios";
import topImage from '../assets/images/newCarsBg.jpeg'; // Update the path to your image

const NewCars = () => {
  const [newCars, setNewCars] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [searchResult, setSearchResult] = useState(null);
  const [searchClicked, setSearchClicked] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loadingSlice.isLoading);

  useEffect(() => {
    let url = links.backendUrl + "/get-new-cars";
    dispatch(startLoader());
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page,
      }),
    })
      .then((data) => {
        console.log("response", data);
        return data.json();
      })
      .then((carsData) => {
        console.log("cars:- ", carsData);
        setNewCars(carsData.cars);
        setCount(Math.ceil(carsData.count / 6));
        dispatch(endLoader());
      })
      .catch((error) => {
        console.error("Error fetching new cars:", error);
        dispatch(endLoader());
      });
  }, [dispatch, page]);

  const handleChange = (event, value) => {
    setPage(value);
    dispatch(startLoader());
    let url = links.backendUrl + "/get-new-cars";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page: value,
      }),
    })
      .then((data) => {
        console.log("response", data);
        return data.json();
      })
      .then((carsData) => {
        console.log("cars:- ", carsData);
        setNewCars(carsData.cars);
        setCount(Math.ceil(carsData.count / 6));
        dispatch(endLoader());
      })
      .catch((error) => {
        console.error("Error fetching new cars:", error);
        dispatch(endLoader());
      });
  };

  return (
    <>

      {/* All cars title */}
      <Grid container mt={3} mb={3} justifyContent="center">
        <Grid item xs={8}>
          <Typography mb={2} variant="h2" align="center" sx={{ fontWeight: 'bold' }}>
            {"Featured Cars"}
          </Typography>
        </Grid>

        <Grid container sx={{ mt: 1, mb: 3 }}>
          <SearchCarsComponent />
        </Grid>

        <Grid container justifyContent="center" xs={12} spacing={2} md={9}>
          {loading
            ? Array.from(new Array(6)).map((_, index) => (
              <Grid item key={index} sx={{ display: "flex" }} xs={11} mb={2} md={4}>
                <Box width={300}>
                  <Skeleton variant="rectangular" width={300} height={140} />
                  <Skeleton variant="text" />
                  <Skeleton variant="text" width="60%" />
                </Box>
              </Grid>
            ))
            : newCars.map((newCar) => (
              <Grid item key={newCar.id} sx={{ display: "flex", justifyContent: "center" }} xs={11} mb={2} md={4}>
                <CarCardComponent car={newCar} />
              </Grid>
            ))}
        </Grid>

        {!loading && (
          <Grid container justifyContent="center" xs={12} md={9}>
            <Pagination
              count={count}
              page={page}
              color="primary"
              onChange={handleChange}
            />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default NewCars;
