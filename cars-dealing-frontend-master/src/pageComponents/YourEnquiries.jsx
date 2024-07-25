import { Grid, Pagination, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { endLoader, startLoader } from "../reduxStore/loadingSlice";
import links from "../assets/util/links";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import YourEnquiriesTable from "../components/YourEnquiriesTable";
import axios from "axios";

const YourEnquiries = () => {

    const headerCells = ['Subject','Details','Car Details','Status'];
    const [rows,setRows] = useState([])
    const [total,setTotal] = useState(0)
    const [page,setPage] = useState(1)
    const dispatch = useDispatch();
    let userToken = ''
    if(localStorage.getItem('userData')){

        userToken = (JSON.parse(localStorage.getItem('userData'))).userToken ;
    }
    let navigate = useNavigate()
    const handleChange = (event, value) => {
        setPage(value);
        if(userToken.length>0){

            dispatch(startLoader())
            axios.post(links.backendUrl + '/get-your-enquiries',{page},{
                headers: {
                    'Authorization': `Bearer ${userToken}` // Assuming it's a Bearer token
                  } 
            })
            .then(response=>{
                dispatch(endLoader())
                if(response.status<200 || response.status>299){
                    let newError = {
                        message: response.data.message
                    }
                    throw newError;
                }
                setRows(response.data.yourEnquiries);
                setTotal(response.data.total);
            })
            .catch(err=>{
                console.log('error while getting your enquiries.',err);
                Swal.fire({
                    title: 'Error',
                    text: err.message?err.message:err.data.message, 
                    icon: 'error'
                })
            })
        }
        else{
            Swal.fire({
                title: 'UnAuthorized',
                text: 'Login to view your enquiries.',
                icon: 'error'
            })
            navigate('/login')
        }
    }
    useEffect(()=>{
        if(userToken.length>0){

            dispatch(startLoader())
            axios.post(links.backendUrl + '/get-your-enquiries',{page},{
                headers: {
                    'Authorization': `Bearer ${userToken}` // Assuming it's a Bearer token
                  } 
            })
            .then(response=>{
                dispatch(endLoader())
                if(response.status<200 || response.status>299){
                    let newError = {
                        message: response.data.message
                    }
                    throw newError;
                }
                setRows(response.data.yourEnquiries);
                setTotal(response.data.total);
            })
            .catch(err=>{
                console.log('error while getting your enquiries.',err);
                Swal.fire({
                    title: 'Error',
                    text: err.message?err.message:err.data.message, 
                    icon: 'error'
                })
            })
        }
        else{
            Swal.fire({
                title: 'UnAuthorized',
                text: 'Login to view your enquiries.',
                icon: 'error'
            })
            navigate('/login')
        }

        
    },[])
  return (
    <>
      <Grid justifyContent={"center"} ml={'auto'} mr={'auto'} container xs={10}>
        <Grid item xs={12}>
          <Typography mt={5} variant="h4">Your Enquiries</Typography>
        </Grid>
        <Grid item xs={12} mt={3}>
            {/* Enquiries Table */}
            <YourEnquiriesTable headerCells={headerCells} rows={rows}></YourEnquiriesTable>
        </Grid>
        <Grid container mt={3} justifyContent={"center"} pb={3} xs={10}>
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

export default YourEnquiries;
