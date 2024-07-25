import { useWindowWidth } from "@react-hook/window-size";
import Jumbotron from "../components/Jumbotron";
import JumbotronMobile from "../components/JumbotronMobile";
import { Grid, Typography } from "@mui/material";
import ScrollContainer from "../components/ScrollContainer";
import { useEffect, useState } from "react";
import links from "../assets/util/links";
import { useDispatch } from "react-redux";
import { endLoader, startLoader } from "../reduxStore/loadingSlice";
import SearchCarsComponent from "../components/SearchCarsComponent";
// import { useEffect } from "react";
// import useDeviceWidth from "../customHooks/useDeviceWidth";

// import { Outlet } from "react-router-dom";
const HomePage = ()=>{

    const width  = useWindowWidth() ;
    const [newCars,setNewCars] = useState([]);
    const [usedCars,setUsedCars] = useState([]);

    
    const dispatch = useDispatch();
    useEffect(() => {
        let url = links.backendUrl + "/get-seven-new-cars";
        dispatch(startLoader())
        fetch(url)
          .then((data) => {
            console.log("response", data);
            return data.json();
          })
          .then((carsData) => {
            console.log("cars:- ", carsData);
            setNewCars(carsData.cars);
            // setCount(carsData.count);
          });
          let url2 = links.backendUrl + "/get-seven-used-cars";
        fetch(url2)
          .then((data) => {
            console.log("response", data);
            return data.json();
          })
          .then((carsData) => {
            console.log("cars:- ", carsData);
            setUsedCars(carsData.cars);
            // setCount(carsData.count);
            dispatch(endLoader())
          });
      }, []);

    return (
        <>
            {/* <header>
                <Outlet />
            </header> */}
            <Grid container>

            
                {
                    width<=768?<JumbotronMobile />: <Jumbotron />
                }
                
            
            
            <Grid container my={5}>
                <SearchCarsComponent />
            </Grid>
            <Grid container marginTop={3} marginLeft={'auto'} marginRight={'auto'}  xs={10} >
                <Typography variant="h5">
                    Top New Cars

                </Typography>
            </Grid>
            <Grid container marginLeft={'auto'} marginRight={'auto'} xs={10} justifyContent={'space-around'}>
                <ScrollContainer  title={'Top New Cars'} cars={newCars}  />
            </Grid>
            <Grid container marginTop={4} marginLeft={'auto'} marginRight={'auto'}  xs={10} >
                <Typography variant="h5">
                    Top Used Cars

                </Typography>
            </Grid>
            <Grid container mb={4} marginLeft={'auto'} marginRight={'auto'} xs={10} justifyContent={'space-around'}>
                <ScrollContainer   cars={usedCars}  />
            </Grid>
            </Grid>
            
        </>
    )
}

export default HomePage;