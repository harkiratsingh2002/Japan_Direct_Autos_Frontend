import { Button, Grid, Typography } from "@mui/material";
import myColors from "../assets/util/myColors";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const DashboardAdminMain = () => {
  let navigate = useNavigate();
  const [functionalityLinks, setFunctionalityLinks] = useState([
    "/add-user",
    "/manage-users",
    "/add-car-form",
    "/manage-cars",
    "/handle-enquiries",
  ]);
  return (
    <>
      <Grid container py={5} xs={8} ml={"auto"} mr={"auto"}>
        <Grid item xs={12}>
          <Typography variant="h4">Administrator Dashboard</Typography>
        </Grid>
        <Grid container mt={3} justifyContent={"space-between"}>
          <Grid item xs={6} md={3}>
            <Grid
              item
              sx={{
                backgroundColor: myColors.judiColor,
                textAlign: "center",
                padding: 4,
                borderRadius: "2em",
              }}
            >
              <Typography variant="h5">12</Typography>
              <Typography variant="h5">Cars</Typography>
            </Grid>
            <Typography textAlign={'center'}>Total Cars</Typography>
          </Grid>

          {/* <Grid
            item
            sx={{
              backgroundColor: myColors.judiColor,
              textAlign: "center",
              padding: 4,
              borderRadius: "2em",
              cursor: "pointer",
            }}
            xs={12}
            md={3}
            onClick={()=>{
                navigate('/Dashboard/add-car-form')
              }}
          >
            <Typography variant="h5">Add</Typography>
            <Typography variant="h5">Car</Typography>
          </Grid> */}
          {/* <Grid
            item
            sx={{
              backgroundColor: myColors.judiColor,
              textAlign: "center",
              padding: 4,
              borderRadius: "2em",
              cursor: "pointer",
            }}
            xs={12}
            md={3}
            onClick={()=>{
                navigate('/Dashboard/manage-cars')
              }}
          >
            <Typography variant="h5">Manage</Typography>
            <Typography variant="h5">Cars</Typography>
          </Grid> */}
          <Grid item xs={6} md={3}>
            <Grid
              item
              sx={{
                backgroundColor: myColors.judiColor,
                textAlign: "center",
                padding: 4,
                borderRadius: "2em",
              }}
            >
              <Typography variant="h5">12</Typography>
              <Typography variant="h5">Users</Typography>
            </Grid>
            <Typography textAlign={'center'}>Total Users</Typography>
          </Grid>

          <Grid item xs={6} md={3}>
            <Grid
              item
              sx={{
                backgroundColor: myColors.judiColor,
                textAlign: "center",
                padding: 4,
                borderRadius: "2em",
              }}
            >
              <Typography variant="h5">12</Typography>
              <Typography variant="h5">Enquiries</Typography>
            </Grid>
            <Typography textAlign={'center'}>Total Enquiries</Typography>
          </Grid>
          {/* <Grid
              item
              sx={{
                backgroundColor: myColors.judiColor,
                textAlign: "center",
                padding: 4,
                borderRadius: "2em",
                cursor: "pointer",
              }}
              xs={12}
              md={3}
              onClick={()=>{
                navigate('/Dashboard/handle-enquiries')
              }}
            >
              <Typography variant="h5">Handle</Typography>
              <Typography variant="h5">Enquiries</Typography>
            </Grid> */}
          <Grid container mt={3} justifyContent={"space-between"}>
            <Grid item mb={3} xs={12}>
              <Typography variant="h4">Admin Functionality</Typography>
            </Grid>
            {[
              "Add user",
              "Manage users",
              "Add Car",
              "Manage Cars",
              "Handle Enquiries",
            ].map((name, i) => {
              return (
                <>
                  <Grid item xs={3} md={2} key={name}>
                    <Link to={"/Dashboard" + functionalityLinks[i]}>
                      <Button variant="contained" size="small">
                        {name}
                      </Button>
                    </Link>
                  </Grid>
                </>
              );
            })}
            {/* <Grid
              item
              sx={{
                backgroundColor: myColors.judiColor,
                textAlign: "center",
                padding: 4,
                borderRadius: "2em",
                cursor: "pointer",
              }}
              xs={12}
              md={3}
              onClick={()=>{
                navigate('/Dashboard/add-user')
              }}
            >
              <Typography variant="h5">Add</Typography>
              <Typography variant="h5">User</Typography>
            </Grid>
            <Grid
              item
              sx={{
                backgroundColor: myColors.judiColor,
                textAlign: "center",
                padding: 4,
                borderRadius: "2em",
                cursor: "pointer",
              }}
              xs={12}
              md={3}
              onClick={()=>{
                navigate('/Dashboard/manage-users')
              }}
            >
              <Typography variant="h5">Manage</Typography>
              <Typography variant="h5">Users</Typography>
            </Grid> */}
          </Grid>
          <Grid container mt={3} justifyContent={"space-between"}>
            {/* <Grid
              item
              sx={{
                backgroundColor: myColors.judiColor,
                textAlign: "center",
                padding: 4,
                borderRadius: "2em",
                cursor: "pointer",
              }}
              xs={12}
              md={3}
            >
              <Typography variant="h5">Add</Typography>
              <Typography variant="h5">User</Typography>
            </Grid> */}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardAdminMain;
