import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CarCardComponent from "../components/carCardComponent";
import Swal from "sweetalert2";
import links from "../assets/util/links";
import axios from "axios";

const Wishlist = () => {
  const [WishlistCars, setWishlistCars] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("userData")) {
      // console.log(JSON.parse(localStorage.getItem("userData")));
      let userToken = JSON.parse(localStorage.getItem("userData")).userToken;
      axios
        .get(links.backendUrl + "/get-wishlist-cars", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setWishlistCars(response.data.cars);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      Swal.fire({
        title: "Error",
        text: "Login before accessing wishlist.",
        icon: "error",
      });
    }
  }, []);

  return (
    <>
      {/* // all cars title */}

      <Grid
        container
        mt={3}
        mb={3}
        sx={
          {
            //   minHeight: "90vh",
          }
        }
        justifyContent={"center"}
      >
        <Grid item xs={8}>
          <Typography mb={2} variant="h5">
            {"Wishlist"}
          </Typography>
        </Grid>
        {WishlistCars.length == 0 && (
          <Grid item xs={8}>
            <Typography variant="body1">
              There is no item in your wishlist.
            </Typography>
          </Grid>
        )}

        {/* </Grid> */}

        <Grid container justifyContent={"center"} xs={12} spacing={2} md={9}>
          {WishlistCars.length > 0 &&
            WishlistCars.map((newCar) => {
              return (
                <Grid item sx={{ display: "flex" }} xs={11} mb={2} md={4}>
                  <CarCardComponent
                    inWishlist={true}
                    setWishlistCars={setWishlistCars}
                    car={newCar}
                  />
                </Grid>
              );
            })}
        </Grid>
        {/* <Grid container justifyContent={"center"} xs={12} md={9}>
              <Pagination
                count={count}
                page={page}
                color="primary"
                onChange={handleChange}
              />
            </Grid> */}
      </Grid>
      {WishlistCars.length == 0 && (
        <Grid
          sx={{
            height: "85vh",
          }}
        ></Grid>
      )}
      {/* // all cars card */}
    </>
  );
};

export default Wishlist;
