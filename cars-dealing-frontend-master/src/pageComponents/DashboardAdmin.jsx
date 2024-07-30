import { useEffect, useState } from "react";
// import Car from "../models/Car.js";
import { Grid } from "@mui/material";
import DashboardDrawer from "../components/DashboardDrawer.jsx";
import AddCarForm from "../components/AddCarForm.jsx";
import links from "../assets/util/links.js";
import { useDispatch, useSelector } from "react-redux";
import AdminCheckDialog from "../components/AdminCheckDialog.jsx";
import { endLoader, startLoader } from "../reduxStore/loadingSlice";
import { useParams } from "react-router-dom";
import ManageCars from "../components/ManageCars.jsx";
import HandleEnquiries from "../components/HandleEnquiries.jsx";
import AddUser from "../components/AddUser.jsx";
import ManageUsers from "../components/ManageUsers.jsx";
import DashboardAdminMain from "../components/DashboardAdminMain.jsx";
const DashboardAdmin = ()=>{

    const [isAdmin,setIsAdmin] = useState(false)
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const dispatch = useDispatch()
    const userToken = (JSON.parse(localStorage.getItem('userData'))).userToken ;
    console.log('userToken',userToken);
    const { dashboardOption } = useParams();
    useEffect(()=>{
        // let tataPunch = Car(1,'Tata Punch','Micro-Suv',2021,34523,'Tata');
        // console.log('Tata punch:- ',tataPunch);

        // check for admin
        // fetch(links.backendUrl + '/check-admin',{

        // })
        // const url = window.location.href;

// Split the URL at the forward slash
        // const urlParts = url.split("/");

// Information after the last slash (/) is typically the filename or path
        // const infoAfterSlash = urlParts[urlParts.length - 1];

        // console.log(infoAfterSlash);
        
        let backUrl = links.backendUrl + '/check-admin'
        dispatch(startLoader())
        fetch(backUrl, {
            method: 'POST',
            headers: {
              'authorization': `Bearer ${userToken}`,
              // Add other headers if needed (e.g., Content-Type)
            },
            // Optional: body containing the data to send
            // body: JSON.stringify(yourData) // Assuming data is a JavaScript object
          })
        .then((result)=>{
            dispatch(endLoader())
            if(result.status<200 || result.status>299){
                // let newError = {}
                result.json().then(err=>{
                    console.log('error while admin check',err)
                    // alert('error while admin check')
                })
            }
            return result.json()

         })
         .then((adminCheckResult)=>{
            if(adminCheckResult.isAdmin){
                setIsAdmin(true);
            }
            else{
                setIsAdmin(false)
            }
            dispatch(endLoader())
         })
    },[])

    return (
        <>{
            !isAdmin ? <AdminCheckDialog open={open} handleClose={handleClose} /> : (

        <Grid>

        <DashboardDrawer />
        { dashboardOption == 'main' && <DashboardAdminMain />}
        { dashboardOption=='add-car-form' &&  <AddCarForm />}
        { dashboardOption=='manage-cars' && <ManageCars />}
        { dashboardOption=='handle-enquiries' && <HandleEnquiries />}
        { dashboardOption=='add-user' && <AddUser />}
        { dashboardOption=='manage-users' && <ManageUsers />}



        </Grid>
            )
        }
        </>
    )
}

export default DashboardAdmin;