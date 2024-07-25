import {
  FormControl,
  Grid,
  InputAdornment,
  OutlinedInput,
  Pagination,
  Typography,
} from "@mui/material";

import { useState } from "react";
import axios from "axios";
import CarCardComponent from "./carCardComponent";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { endLoader, startLoader } from "../reduxStore/loadingSlice";
import links from "../assets/util/links";
import Swal from "sweetalert2";

const SearchCarsComponent = () => {
  const [searchResult, setSearchResult] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch()

  const handleChange = (event, value) => {
    setPage(value);
    dispatch(startLoader());
    axios
      .post(links.backendUrl + "/search-cars", {
        searchText: searchText,
        page,
      })
      .then((response) => {
        dispatch(endLoader());
        if (response.status < 200 || response.status > 299) {
          let newError = {
            message: response.data.message,
          };
          throw newError;
        } else {
          setSearchResult(response.data.searchResult);

          setCount(Math.ceil(response.data.total / 6));
        }
      })
      .catch((err) => {
        console.log("error while user search:- ", err);
        Swal.fire({
          title: "Error",
          text: err.messaage,
          icon: "error",
        });
      });
  };

  const handleSearch = () => {
    setPage(1);
    dispatch(startLoader());
    axios
      .post(links.backendUrl + "/search-cars", {
        searchText: searchText,
        page,
      })
      .then((response) => {
        dispatch(endLoader());
        if (response.status < 200 || response.status > 299) {
          let newError = {
            message: response.data.message,
          };
          throw newError;
        } else {
          setSearchResult(response.data.searchResult);

          setCount(Math.ceil(response.data.total / 6));
        }
      })
      .catch((err) => {
        console.log("error while user search:- ", err);
        Swal.fire({
          title: "Error",
          text: err.messaage,
          icon: "error",
        });
      });
  };

  return (
    <>
      <Grid container xs={8} justifyContent={"center"} ml={"auto"} mr={"auto"}>
        <Grid item xs={12}>
          <FormControl
            sx={{
              width: "100%",
            }}
            variant="filled"
          >
            <OutlinedInput
              variant="filled"
              id="outlined-adornment-search"
              endAdornment={
                <InputAdornment position="end">
                  <SearchIcon
                    onClick={() => {
                      handleSearch();
                    }}
                  />
                </InputAdornment>
              }
              aria-describedby="outlined-search-helper-text"
              inputProps={{
                "aria-label": "search",
              }}
              placeholder="Search Cars"
              fullWidth
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  // console.log('search text',searchText)
                  handleSearch();
                }
              }}
            />
            {/* <FormHelperText id="outlined-weight-helper-text">Weight</FormHelperText> */}
          </FormControl>
        </Grid>
      </Grid>
      {searchResult && (
        <Grid container xs={10} my={4} ml={"auto"} mr={"auto"}>
          <Grid item xs={12}>
            <Typography mb={2} variant="h5">
              Search Result
            </Typography>
          </Grid>
          <Grid container justifyContent={"center"} ml={'auto'} mr={'auto'} xs={10} spacing={2} md={10}>
            {searchResult.map((newCar) => {
              return (
                <Grid item sx={{ display: "flex" }} xs={12} mb={2} md={4}>
                  <CarCardComponent car={newCar} />
                </Grid>
              );
            })}
          </Grid>
          <Grid mt={3} container ml={'auto'} mr={'auto'} justifyContent={"center"} xs={10} md={10}>
            <Pagination
              count={count}
              page={page}
              color="primary"
              onChange={handleChange}
            /> 
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default SearchCarsComponent;
