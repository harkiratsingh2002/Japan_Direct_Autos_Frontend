import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  OutlinedInput,
  Pagination,
  Typography,
} from "@mui/material";
import UserManagementTable from "./UserManagementTable";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { endLoader, startLoader } from "../reduxStore/loadingSlice";
import axios from "axios";
import Swal from "sweetalert2";
import links from "../assets/util/links";
import SearchIcon from "@mui/icons-material/Search";

const ManageUsers = () => {
  const headCells = ["Email", "Role", "User Details", "Actions"];
  const [rows, setRows] = useState([]);

  const deleteRow = (userId) => {
    let rowIndex = rows.findIndex((row) => {
      return row._id == userId;
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
    if (searchText.length > 0) {
      // dispatch(startLoader())
      axios
        .post(links.backendUrl + "/search-user", {
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
            setRows(response.data.fiveUsers);
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
    } else {
      axios
        .post(links.backendUrl + "/get-five-users", {
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
          setRows(response.data.fiveUsers);
          setTotal(response.data.total);
          dispatch(endLoader());
        })
        .catch((err) => {
          dispatch(endLoader());

          console.log("error while getting 5 users", err);
        });
    }
  };
  useEffect(() => {
    dispatch(startLoader());
    axios
      .post(links.backendUrl + "/get-five-users", {
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
        setRows(response.data.fiveUsers);
        setTotal(response.data.total);
      })
      .catch((err) => {
        console.log("error while getting 5 users", err);
      });
  }, []);

  const [searchText, setSearchText] = useState("");
  const [emailSearchText, setEmailSearchText] = useState("");
  const handleSearch = () => {
    setPage(1);
    dispatch(startLoader());
    axios
      .post(links.backendUrl + "/search-user", {
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
          setRows(response.data.fiveUsers);
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

  const handleEmailSearch = ()=>{
    setPage(1);
    setSearchText('');
    dispatch(startLoader());
    axios.post(links.backendUrl + '/search-user-by-email',{
      email: emailSearchText
    })
    .then((response) => {
      dispatch(endLoader());
      if (response.status < 200 || response.status > 299) {
        let newError = {
          message: response.data.message,
        };
        throw newError;
      } else {
        setRows(response.data.user);
        setTotal(response.data.total);
      }
    })
    .catch((err) => {
      dispatch(endLoader());

      console.log("error while user search:- ", err);
      Swal.fire({
        title: "Error",
        text: err.messaage,
        icon: "error",
      });
    }); 
  }
  return (
    <>
      <Grid container justifyContent={"center"}>
        <Grid container mt={5} xs={10} justifyContent={"space-between"}>
        <Grid item mb={4} xs={12}>
          <Typography variant="h4">Manage Users</Typography>
        </Grid>
          <Grid item xs={10} md={3}>
            <Button
              variant="contained"
              onClick={() => {
                window.location.reload();
              }}
            >
              Reset
            </Button>
            </Grid>
            <Grid item xs={6} md={4}>
              <FormControl
                sx={{
                  width: "100%",
                }}
                variant="outlined"
              >
                <OutlinedInput
                  id="outlined-adornment-search-by-email"
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
                  placeholder="Email Search"
                  fullWidth
                  onChange={(e) => setEmailSearchText(e.target.value)}
                  value={emailSearchText}
                  onKeyDown={(e) => {
                    if (e.key == "Enter") {
                      // console.log('search text',searchText)
                      handleEmailSearch();
                    }
                  }}
                />
                {/* <FormHelperText id="outlined-weight-helper-text">Weight</FormHelperText> */}
              </FormControl>
            </Grid>

            <Grid item xs={6} md={4}>
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

        <Grid item mx={3} mt={5} mb={5} xs={10}>
          {rows.length > 0 && (
            <UserManagementTable
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

export default ManageUsers;
