import React from 'react';
import { useWindowWidth } from "@react-hook/window-size";
import { useLocation } from 'react-router-dom';
import CarCardComponent from '../components/carCardComponent';
import Jumbotron from "../components/Jumbotron";
import JumbotronMobile from "../components/JumbotronMobile";
import { Grid, Typography, Pagination } from '@mui/material';
import { useState } from "react";


const SearchResultPage = () => {
    const width = useWindowWidth();
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);

    const location = useLocation();
    const { searchResult } = location.state || { searchResult: [] };  // Get the search results passed via state
    const handleChange = (event, value) => {
        setPage(value);
        dispatch(startLoader());
        axios
            .post(links.backendUrl + "/search-cars", {
                searchText: searchText,
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
                    setSearchResult(response.data.searchResult);

                    setCount(Math.ceil(response.data.total / 6));
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
        <Grid container>
            {width <= 768 ? <JumbotronMobile /> : <Jumbotron />}
            <Grid container xs={10} my={4} ml={"auto"} mr={"auto"}>
                <Grid item xs={12}>
                    <Typography mb={2} variant="h5">
                        Search Result
                    </Typography>
                </Grid>
                <Grid container justifyContent={"center"} ml={'auto'} mr={'auto'} xs={10} spacing={2} md={10}>
                    {searchResult.map((newCar) => {
                        return (
                            <Grid item sx={{ display: "flex" }} xs={12} mb={2} md={4}>
                                <CarCardComponent car={newCar} />
                            </Grid>
                        );
                    })}
                </Grid>
                <Grid mt={3} container ml={'auto'} mr={'auto'} justifyContent={"center"} xs={10} md={10}>
                    <Pagination
                        count={count}
                        page={page}
                        color="primary"
                        onChange={handleChange}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default SearchResultPage;
