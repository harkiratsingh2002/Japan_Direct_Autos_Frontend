import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { endLoader, startLoader } from "../reduxStore/loadingSlice";
import axios from "axios";
import Swal from "sweetalert2";
// import ManagementTable from "./ManagementTable";
import links from "../assets/util/links";
import { Button, FormControl, Grid, InputAdornment, Menu, MenuItem, OutlinedInput, Pagination, Typography } from "@mui/material";
import EnquiriesTable from "./EnquiriesTable";
import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
const HandleEnquiries = () => {
  const headCells = [
    "Enquired By",
    "Subject",
    "Car Details",
    "Enquiry",
    "Status",
    "Actions",
  ];
  const [rows, setRows] = useState([]);

  const deleteRow = (enquiryId) => {
    let rowIndex = rows.findIndex((row) => {
      return row._id == enquiryId;
    });
    rows.splice(rowIndex, 1);
    setRows(rows);
    setTotal((total) => {
      return total - 1;
    });
  };

  const completeRow = (enquiryId) => {
    setRows((oldState) => {
      let newState = [...oldState];
      let rowIndex = newState.findIndex((row) => row._id == enquiryId);
      newState[rowIndex].completed = true;
      return newState;
    });
  };

  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(null);
  const [filterSet,setFilterSet] = useState('')

  const handleChange = (event, value) => {
    setPage(value);
    // if(filterSet.length == 0){

    //   dispatch(startLoader());
    //   axios
    //     .post(links.backendUrl + "/get-five-enquiries", {
    //       page: value,
    //     })
    //     .then((response) => {
    //       dispatch(endLoader());
    //       console.log(response);
    //       if (response.status < 200 || response.status > 299) {
    //         Swal.fire({
    //           title: "error",
    //           text: response.messaage,
    //           icon: "error",
    //           // confirmButtonText: 'Cool'
    //         });
    //       }
    //       console.log("response", response);
    //       setRows(response.data.enquiries);
    //       setTotal(response.data.total);
    //     })
    //     .catch((err) => {
    //       console.log("error while getting 5 cars", err);
    //     });
    // }
    if(searchText.length>0){
      // setFilterSet('');
      dispatch(startLoader());
      setEmailSearchText('');
      axios.post(links.backendUrl + '/search-enquiries',{
        searchText,
        page: value
      })
      .then(response=>{
        dispatch(endLoader())
        if(response.status<200 || response.status>299){
          Swal.fire({
            title: 'Error',
            text: response.data.messaage,
            icon: 'error'
          })
        }
        else{
          setRows(response.data.searchResult);
          setTotal(response.data.total);
        }
      })
      .catch(err=>{
        console.log('err while searching enquiries',err)
      })
    } 

    else if(emailSearchText.length>0){
      setSearchText('');
      dispatch(startLoader());
      axios.post(links.backendUrl + '/search-enquiries-by-email',{
        email: emailSearchText,
        page
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
        dispatch(endLoader());
  
        console.log("error while user search:- ", err);
        Swal.fire({
          title: "Error",
          text: err.messaage,
          icon: "error",
        });
      })
    }
    
    else {
      dispatch(startLoader())
      axios.post(links.backendUrl + '/filter-enquiries',{
        completed: filterSet =='Completed' ? true : false,
        page: value
      })
      .then(response=>{
        dispatch(endLoader())
        if(response.status<200 || response.status>299){
          Swal.fire({
            title: 'Error',
            text: response.data.messaage,
            icon: 'error'
          })
        }
        else{
          setRows(response.data.filteredEnquiries);
          setTotal(response.data.total);
        }
      })
      .catch(err=>{
        console.log('err while filtering enquiries',err)
      })
    }
  };
  useEffect(() => {
    dispatch(startLoader());
    axios
      .post(links.backendUrl + "/get-five-enquiries", {
        page: page,
      })
      .then((response) => {
        // console.log('enquiries:- ',enquiries)
        console.log("response", response);
        dispatch(endLoader());
        if (response.status < 200 || response.status > 299) {
          Swal.fire({
            title: "error",
            text: response.messaage,
            icon: "error",
            // confirmButtonText: 'Cool'
          });
        }
        setRows(response.data.enquiries);
        setTotal(response.data.total);
      })
      .catch((err) => {
        console.log("error while getting 5 enquiries", err);
      });
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openFilterDropDown = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // const filterEnquiries = (filterStr)=>{
  //   dispatch(startLoader())
  //   setPage(1)
  //   setFilterSet(filterStr)
  //   axios.post(links.backendUrl + '/filter-enquiries',{
  //     completed: filterStr=='Completed' ? true : false,
  //     page: page
  //   })
  //   .then(response=>{
  //     dispatch(endLoader())
  //     if(response.status<200 || response.status>299){
  //       Swal.fire({
  //         title: 'Error',
  //         text: response.data.messaage,
  //         icon: 'error'
  //       })
  //     }
  //     else{
  //       setRows(response.data.filteredEnquiries);
  //       setTotal(response.data.total);
  //     }
  //   })
  //   .catch(err=>{
  //     console.log('err while filtering enquiries',err)
  //   })
  // }

  const [searchText,setSearchText] = useState('')
  const [emailSearchText, setEmailSearchText] = useState("");

  const handleSearch = ()=>{
    setPage(1);
    setFilterSet('');
    if(searchText.length> 0){

      dispatch(startLoader());
      axios.post(links.backendUrl + '/search-enquiries',{
        searchText,
        page
      })
      .then(response=>{
        dispatch(endLoader())
        if(response.status<200 || response.status>299){
          Swal.fire({
            title: 'Error',
            text: response.data.messaage,
            icon: 'error'
          })
        }
        else{
          setRows(response.data.searchResult);
          setTotal(response.data.total);
        }
      })
      .catch(err=>{
        console.log('err while searching enquiries',err)
      })
      
    }
  } 
  const handleEmailSearch = ()=>{
    setPage(1);
    setSearchText('');
    dispatch(startLoader());
    axios.post(links.backendUrl + '/search-enquiries-by-email',{
      email: emailSearchText,
      page
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
    <Grid container justifyContent={"center"}>
      <Grid container justifyContent={'space-between'} mt={5} xs={10}>
      <Grid item mb={4} xs={12}>
          <Typography variant="h4">Manage Enquiries</Typography>
        </Grid>
        <Grid item  xs={10} md={3}>
          {/* <Button
            id="basic-button"
            aria-controls={openFilterDropDown ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openFilterDropDown ? "true" : undefined}
            onClick={handleClick}
            variant="contained"
          >
            Filters
          </Button> */}
          <Button
            onClick={()=>{
            window.location.reload() 
            }}            
            variant="contained"
            sx={{
              marginLeft: '1.3em'
            }}
          >
            Reset
          </Button>

          {/* <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openFilterDropDown}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() => {
                filterEnquiries("In Progress");
                handleClose();
              }}
            >
              In Progress
            </MenuItem>
            <MenuItem
              onClick={() => {
                filterEnquiries("Completed");
                handleClose();
              }}
            >
              Completed
            </MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu> */}
        </Grid>
        <Grid item xs={10} md={4}>
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
        <Grid item xs={10} md={4}>
        <FormControl sx={{
          width: '100%'
        }}  variant="outlined">
          <OutlinedInput
            id="outlined-adornment-search"
            endAdornment={<InputAdornment position="end"><SearchIcon /></InputAdornment>}
            aria-describedby="outlined-search-helper-text"
            inputProps={{
              'aria-label': 'search',
            }}
            placeholder="Search"
            fullWidth
            onChange={(e)=>setSearchText(e.target.value)}
            value={searchText}
            onKeyDown={(e)=>{
              if(e.key == 'Enter'){
                // console.log('search text',searchText)
                handleSearch()
              }
            }}
          />
          {/* <FormHelperText id="outlined-weight-helper-text">Weight</FormHelperText> */}
        </FormControl>
        </Grid>
      </Grid>
      <Grid item mx={3} mt={5} mb={5} xs={10}>
        {rows.length > 0 && (
          <EnquiriesTable
            rows={rows}
            deleteRow={deleteRow}
            completeRow={completeRow}
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
  );
};

export default HandleEnquiries;
