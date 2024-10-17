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
  List,
  ListItem,
  Box,
  Container
} from "@mui/material";

import { useState } from "react";
import axios from "axios";
import CarCardComponent from "./carCardComponent";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { endLoader, startLoader } from "../reduxStore/loadingSlice";
import links from "../assets/util/links";
import Swal from "sweetalert2";
import _ from "lodash"; // Import lodash for debouncing

const SearchCarsComponent = () => {
  const [searchResult, setSearchResult] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]); // New state for dynamic suggestions
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

  // Debounced function for real-time suggestions
  const fetchSuggestions = _.debounce((value) => {
    axios
      .post(links.backendUrl + "/suggest-cars", {
        searchText: value,
      })
      .then((response) => {
        setSuggestions(response.data.suggestions); // Set suggestions for dynamic display
      })
      .catch((err) => {
        console.log("Error during fetching suggestions: ", err);
      });
  }, 300); // Debounce with a 300ms delay

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    if (value) {
      fetchSuggestions(value); // Fetch suggestions as user types
    } else {
      setSuggestions([]); // Clear suggestions when input is empty
    }
  };

  return (
    <>
      <>
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={3}
          >
            {/* Search Bar and Suggestions Container */}
            <Grid item xs={12} sm={8} md={7} sx={{ position: 'relative' }}>
              <FormControl fullWidth variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-search"
                  endAdornment={
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  }
                  aria-describedby="outlined-search-helper-text"
                  inputProps={{ "aria-label": "search" }}
                  placeholder="Search Cars"
                  onChange={handleInputChange}
                  value={searchText}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                />
              </FormControl>

              {suggestions.length > 0 && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    backgroundColor: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: 1,
                    boxShadow: 2,
                    maxHeight: 200,
                    overflowY: "auto",
                  }}
                >
                  <List>
                    {suggestions.map((suggestion, index) => (
                      <ListItem
                        button
                        key={index}
                        onClick={() => {
                          setSearchText(suggestion.name);
                          handleSearch();
                          setSuggestions([]);
                        }}
                      >
                        {suggestion.name}
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
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
        </Container>

        {/* Search Results */}
        {searchResult && (
          <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
            <Grid container justifyContent="center" spacing={2}>
              <Grid item xs={12}>
                <Typography mb={2} variant="h4" align="center">
                  Search Results
                </Typography>
              </Grid>
              <Grid container justifyContent="center" spacing={2}>
                {searchResult.map((newCar, index) => (
                  <Grid item key={index} xs={12} sm={6} md={4} display="flex" justifyContent="center">
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
                  sx={{ display: 'flex', justifyContent: 'center' }}
                />
              </Grid>
            </Grid>
          </Container>
        )}
      </>

    </>
  );
};

export default SearchCarsComponent;
