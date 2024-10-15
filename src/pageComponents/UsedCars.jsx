import { Grid, Pagination, Typography, Box, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import links from "../assets/util/links";
import CarCardComponent from "../components/carCardComponent";
import { endLoader, startLoader } from "../reduxStore/loadingSlice";
import { useDispatch, useSelector } from "react-redux";
import SearchCarsComponent from "../components/SearchCarsComponent";

const UsedCars = () => {
  const [usedCars, setUsedCars] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loadingSlice.isLoading);

  useEffect(() => {
    let url = links.backendUrl + "/get-used-cars";
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
        return data.json();
      })
      .then((carsData) => {
        setUsedCars(carsData.cars);
        setCount(Math.ceil(carsData.count / 6));
        dispatch(endLoader());
      })
      .catch((error) => {
        console.error("Error fetching used cars:", error);
        dispatch(endLoader());
      });
  }, [dispatch, page]);

  const handleChange = (event, value) => {
    setPage(value);
    dispatch(startLoader());
    let url = links.backendUrl + "/get-used-cars";
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
        return data.json();
      })
      .then((carsData) => {
        setUsedCars(carsData.cars);
        dispatch(endLoader());
      })
      .catch((error) => {
        console.error("Error fetching used cars:", error);
        dispatch(endLoader());
      });
  };

  return (
    <>
      {/* All cars title */}
      <Grid container mt={3} mb={3} justifyContent={"center"}>
        <Grid item xs={8}>
          <Typography mb={2} variant="h2" align="center" sx={{ fontWeight: 'bold' }}>
            {"Used Cars"}
          </Typography>
        </Grid>

        <Grid container sx={{ mt: 1, mb: 3 }}>
          <SearchCarsComponent />
        </Grid>

        <Grid
          container
          justifyContent={"center"}
          xs={12}
          spacing={2}
          md={9}
          alignItems="stretch"
        >
          {loading
            ? Array.from(new Array(6)).map((_, index) => (
              <Grid
                item
                key={index}
                xs={11}
                md={4}
                sx={{ display: 'flex', flexDirection: 'column' }}
              >
                <Box width={300}>
                  <Skeleton variant="rectangular" width={300} height={140} />
                  <Box sx={{ pt: 0.5 }}>
                    <Skeleton variant="text" />
                    <Skeleton variant="text" width="60%" />
                  </Box>
                </Box>
              </Grid>
            ))
            : usedCars.map((newCar) => (
              <Grid
                item
                key={newCar.id}
                xs={11}
                md={4}
                sx={{ display: 'flex', flexDirection: 'column' }}
              >
                <CarCardComponent car={newCar} sx={{ flexGrow: 1 }} />
              </Grid>
            ))}
        </Grid>

        {!loading && (
          <Grid mt={3} container justifyContent={"center"} xs={12} md={9}>
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

export default UsedCars;
