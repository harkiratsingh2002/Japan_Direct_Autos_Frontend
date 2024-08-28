import { Grid, Pagination, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import links from "../assets/util/links";
import CarCardComponent from "../components/carCardComponent";
import { endLoader, startLoader } from "../reduxStore/loadingSlice";
import { useDispatch } from "react-redux";

const UsedCars = () => {
  const [usedCars, setUsedCars] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    // let url = links.backendUrl + '/get-used-cars'
    let url = links.backendUrl + "/get-used-cars";
    dispatch(startLoader())
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
        setUsedCars(carsData.cars);
        setCount(Math.ceil(carsData.count/6));
        dispatch(endLoader())
      });
  }, []);

  const handleChange = (event, value) => {
    // make request to fetch data
    setPage(value);
    let url = links.backendUrl + "/get-used-cars";
    dispatch(showLoader())
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
        setUsedCars(carsData.cars);
        dispatch(endLoader())
      });
  };
  return (
    <>
      {/* // all cars title */}

      <Grid container mt={3} mb={3} justifyContent={"center"}>
        <Grid item xs={8}>
          <Typography variant="h5" mb={2}>Used Cars</Typography>
        </Grid>
        <Grid container justifyContent={"center"} xs={12} spacing={2} md={9}>
          {usedCars.map((newCar) => {
            return (
              <Grid item xs={11} md={4}>
                <CarCardComponent car={newCar} />
              </Grid>
            );
          })}
        </Grid>
        <Grid mt={3} container justifyContent={"center"} xs={12} md={9}>
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

export default UsedCars;
