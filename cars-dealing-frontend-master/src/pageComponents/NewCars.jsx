import { Button, FormControl, Grid, InputAdornment, OutlinedInput, Pagination, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import links from "../assets/util/links";
import CarCardComponent from "../components/carCardComponent";
import { useDispatch } from "react-redux";
import { endLoader, startLoader } from "../reduxStore/loadingSlice";
import axios from "axios";


const NewCars = () => {
  const [newCars, setNewCars] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [searchResult, setSearchResult] = useState(null);
  const [searchClicked, setSearchClicked] = useState(false);
  // const [total,setTotal] = useState(0)
  const dispatch = useDispatch();

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
        dispatch(endLoader());
        console.log("response", data);
        return data.json();
      })
      .then((carsData) => {
        console.log("cars:- ", carsData);
        setNewCars(carsData.cars);
        setCount(Math.ceil(carsData.count / 6));
      });
  }, []);
  const handleChange = (event, value) => {
    // make request to fetch data
    setPage(value);
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
      });
  };

  
  return (
    <>
      {/* // all cars title */}

      <Grid container mt={3} mb={3} justifyContent={"center"}>
        
          <Grid item xs={8}>
            <Typography mb={2} variant="h5">
              {"New Cars"}
            </Typography>
          </Grid>
          
          {/* </Grid> */}
          
        
        <Grid container justifyContent={"center"} xs={12} spacing={2} md={9}>
          {newCars.map((newCar) => {
            return (
              <Grid item sx={{ display: "flex" }} xs={11} mb={2} md={4}>
                <CarCardComponent car={newCar} />
              </Grid>
            );
          })}
        </Grid>
        <Grid container justifyContent={"center"} xs={12} md={9}>
          <Pagination
            count={count}
            page={page}
            color="primary"
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      {/* // all cars card */}
    </>
  );
};

export default NewCars;
