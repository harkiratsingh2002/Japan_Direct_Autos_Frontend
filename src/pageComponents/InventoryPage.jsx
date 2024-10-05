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
const InventoryPage = () => {
    const width = useWindowWidth();
    const [newCars, setNewCars] = useState([]);
    const [usedCars, setUsedCars] = useState([]);
    const [rentalCars, setRentalCars] = useState([]);

    // Overlay Settings
    const [overlayVisible, setOverlayVisible] = useState(true);

    const handleOverlayClose = () => {
        setOverlayVisible(false);
    };

    const dispatch = useDispatch();
    useEffect(() => {
        let url = links.backendUrl + "/get-seven-new-cars";
        dispatch(startLoader());
        fetch(url)
            .then((data) => {
                dispatch(endLoader());

                console.log("response", data);
                return data.json();
            })
            .then((carsData) => {
                console.log("cars:- ", carsData);
                setNewCars(carsData.cars);
                // setCount(carsData.count);
            })
            .catch((err) => {
                dispatch(endLoader());
                console.log("err 7 new cars", err);
            });
        let url2 = links.backendUrl + "/get-seven-used-cars";
        fetch(url2)
            .then((data) => {
                dispatch(endLoader());

                console.log("response", data);
                return data.json();
            })
            .then((carsData) => {
                console.log("cars:- ", carsData);
                setUsedCars(carsData.cars);
                // setCount(carsData.count);
                // dispatch(endLoader());
            })
            .catch((err) => {
                dispatch(endLoader());
                console.log("err 7 used cars", err);
            });
        let url3 = links.backendUrl + "/get-seven-rental-cars";
        fetch(url3)
            .then((data) => {
                dispatch(endLoader());

                console.log("response", data);
                return data.json();
            })
            .then((carsData) => {
                console.log("cars:- ", carsData);
                setRentalCars(carsData.cars);
                // setCount(carsData.count);
                // dispatch(endLoader());
            })
            .catch((err) => {
                dispatch(endLoader());
                console.log("err 7 rental cars", err);
            });
    }, []);

    return (
        <>
            {/* <header>
                <Outlet />
            </header> */}
            <Grid container>


                <Grid
                    container
                    marginTop={3}
                    marginLeft={"auto"}
                    marginRight={"auto"}
                    xs={10}
                >
                    <Grid item xs={12} textAlign={"center"}>
                        <Typography textAlign={"center"} variant="h5">
                            New Cars
                        </Typography>
                    </Grid>
                    {/* <Typography variant="h5">Top New Cars</Typography> */}
                </Grid>
                <Grid
                    container
                    marginLeft={"auto"}
                    marginRight={"auto"}
                    xs={10}
                    justifyContent={"space-around"}
                >
                    <ScrollContainer carType={"new"} cars={newCars} />
                </Grid>
                <Grid
                    container
                    marginTop={4}
                    marginLeft={"auto"}
                    marginRight={"auto"}
                    xs={10}
                >
                    <Grid item xs={12} textAlign={"center"}>
                        <Typography textAlign={"center"} variant="h5">
                            Used Cars
                        </Typography>
                    </Grid>
                    {/* <Typography variant="h5">Top Used Cars</Typography> */}
                </Grid>
                <Grid
                    container
                    mb={4}
                    marginLeft={"auto"}
                    marginRight={"auto"}
                    xs={10}
                    justifyContent={"space-around"}
                >
                    <ScrollContainer carType={"used"} cars={usedCars} />
                </Grid>
                <Grid
                    container
                    marginTop={4}
                    marginLeft={"auto"}
                    marginRight={"auto"}
                    xs={10}
                >
                    <Grid item xs={12} textAlign={"center"}>
                        <Typography textAlign={"center"} variant="h5">
                            Rental Cars
                        </Typography>
                    </Grid>
                    {/* <Typography variant="h5">Top Rental Cars</Typography> */}
                </Grid>
                <Grid
                    container
                    mb={4}
                    marginLeft={"auto"}
                    marginRight={"auto"}
                    xs={10}
                    justifyContent={"space-around"}
                >
                    <ScrollContainer carType={"Rental"} cars={rentalCars} />
                </Grid>
            </Grid>

            <div></div>
        </>
    );
};

export default InventoryPage;
