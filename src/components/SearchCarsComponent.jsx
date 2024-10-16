import {
  FormControl,
  Grid,
  InputAdornment,
  OutlinedInput,
  Pagination,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  Button,
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
  const [sortOption, setSortOption] = useState(""); // New state for sorting
  const dispatch = useDispatch();

  const handleChange = (event, value) => {
    setPage(value);
    performSearch();
  };

  const handleSearch = () => {
    setPage(1);
    performSearch();
  };

  const performSearch = () => {
    dispatch(startLoader());
    axios
      .post(links.backendUrl + "/search-cars", {
        searchText: searchText,
        page,
        sortOption, // Include the sorting option in the request
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
          text: err.message,
          icon: "error",
        });
      });
  };

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={3}
        sx={{ width: '100%', padding: 2 }}
      >
        {/* Search Bar */}
        <Grid item xs={12} sm={8} md={7}>
          <FormControl fullWidth variant="outlined">
            <OutlinedInput
              id="outlined-adornment-search"
              endAdornment={
                <InputAdornment position="end">
                  <SearchIcon /> {/* Optional: Add an icon for better UX */}
                </InputAdornment>
              }
              aria-describedby="outlined-search-helper-text"
              inputProps={{ "aria-label": "search" }}
              placeholder="Search Cars"
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
          </FormControl>
        </Grid>

        {/* Sorting Dropdown */}
        <Grid item xs={12} sm={4} md={2}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="sort-label">Sort By</InputLabel>
            <Select
              labelId="sort-label"
              id="sort-select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              label="Sort By"
            >
              <MenuItem value="price_asc">Price: Low to High</MenuItem>
              <MenuItem value="price_desc">Price: High to Low</MenuItem>
              <MenuItem value="year_asc">Year: Old to New</MenuItem>
              <MenuItem value="year_desc">Year: New to Old</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Search Button */}
        <Grid item xs={12} sm={12} md={2}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSearch}
            sx={{ padding: '10px 0' }}
          >
            Search
          </Button>
        </Grid>
      </Grid>


      {searchResult && (
        <Grid container justifyContent="center" my={4} ml="auto" mr="auto" spacing={2} sx={{ width: '100%', maxWidth: 'lg' }}>
          <Grid item xs={12}>
            <Typography mb={2} variant="h4" align="center">
              Search Results
            </Typography>
          </Grid>
          <Grid container justifyContent="center" spacing={2} sx={{ width: '100%' }}>
            {searchResult.map((newCar, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} mb={2} display="flex" justifyContent="center">
                <CarCardComponent car={newCar} />
              </Grid>
            ))}
          </Grid>

          <Grid item xs={12} mt={3}>
            <Pagination
              count={count}
              page={page}
              color="primary"
              onChange={handleChange}
              sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default SearchCarsComponent;