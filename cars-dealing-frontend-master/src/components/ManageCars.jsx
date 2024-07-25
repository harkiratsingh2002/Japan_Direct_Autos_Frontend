import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { endLoader, startLoader } from "../reduxStore/loadingSlice";
import axios from "axios";
import Swal from "sweetalert2";
import ManagementTable from "./ManagementTable";
import links from "../assets/util/links";
import { Button, FormControl, Grid, InputAdornment, OutlinedInput, Pagination, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const ManageCars = () => {
  const headCells = ["SrNo.", "Name", "New Or Old", "Added By", "Actions"];
  const [rows, setRows] = useState([]);

  const deleteRow = (carId) => {
    let rowIndex = rows.findIndex((row) => {
      return row.carId == carId;
    });
    rows.splice(rowIndex, 1);
    setRows(rows);
    setTotal((total) => {
      return total - 1;
    });
  };

  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(null);

  const handleChange = (event, value) => {
    setPage(value);
    dispatch(startLoader());
    if(searchText.length>0){
      axios
      .post(links.backendUrl + "/search-cars", {
        searchText,
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
          setRows(response.data.searchResult);
          setTotal(response.data.total);
        }
      })
      .catch((err) => {
        console.log("error while car search:- ", err);
        Swal.fire({
          title: "Error",
          text: err.messaage,
          icon: "error",
        });
      });
    }
    else{

      axios
        .post(links.backendUrl + "/get-five-cars", {
          page: value,
        })
        .then((response) => {
          if (response.status < 200 || response.status > 299) {
            Swal.fire({
              title: "error",
              text: response.messaage,
              icon: "error",
              // confirmButtonText: 'Cool'
            });
          }
          console.log("response", response);
          setRows(response.data.finalFiveCars);
          setTotal(response.data.total);
          dispatch(endLoader());
        })
        .catch((err) => {
          dispatch(endLoader());
  
          console.log("error while getting 5 cars", err);
        });
    }
  };
  useEffect(() => {
    dispatch(startLoader());
    axios
      .post(links.backendUrl + "/get-five-cars", {
        page: page,
      })
      .then((response) => {
        dispatch(endLoader());
        if (response.status < 200 || response.status > 299) {
          Swal.fire({
            title: "error",
            text: response.messaage,
            icon: "error",
            // confirmButtonText: 'Cool'
          });
        }
        console.log("response", response);
        setRows(response.data.finalFiveCars);
        setTotal(response.data.total);
      })
      .catch((err) => {
        console.log("error while getting 5 cars", err);
      });
  }, []);
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    setPage(1);
    dispatch(startLoader());
    axios
      .post(links.backendUrl + "/search-cars", {
        searchText,
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
          setRows(response.data.searchResult);
          setTotal(response.data.total);
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
      <Grid container justifyContent={"center"}>
        <Grid container xs={10} mt={5} justifyContent={"space-between"}>
        <Grid item mb={4} xs={12}>
          <Typography variant="h4">Manage Cars</Typography>
        </Grid>
          <Grid xs={10} md={5}>
            <Button
              variant="contained"
              onClick={() => {
                window.location.reload();
              }}
            >
              Reset
            </Button>
          </Grid>
          <Grid xs={10} md={5}>
            <FormControl
              sx={{
                width: "100%",
              }}
              variant="outlined"
            >
              <OutlinedInput
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
                placeholder="Global Search"
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
        <Grid item mx={3} mt={3} mb={5} xs={10}>
          {rows.length > 0 && (
            <ManagementTable
              rows={rows}
              deleteRow={deleteRow}
              headerCells={headCells}
            />
          )}
        </Grid>
        <Grid container justifyContent={"center"} pb={3} xs={10}>
          {total && (
            <Pagination
              color="primary"
              onChange={handleChange}
              count={Math.ceil(total / 5)}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default ManageCars;
