import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import links from '../assets/util/links';
import SearchCarsComponent from './SearchCarsComponent';
import {
    Grid,
    Typography,
    Pagination,
    Skeleton,
} from "@mui/material";
import CarCardComponent from '../components/carCardComponent'; // Adjust the path as necessary

const ResultsPage = () => {
    const location = useLocation();
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(true);

    // Pagination state
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(1); // Total number of pages

    // Extract the search query from the URL
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search') || '';

    useEffect(() => {
        const fetchSearchResults = async () => {
            setLoading(true);
            if (searchQuery.trim()) {
                try {
                    const response = await axios.post(`${links.backendUrl}/search-cars`, {
                        searchText: searchQuery,
                        page: page,
                        sortOption: 'default', // Replace with actual sort option
                    });

                    console.log('Response data:', response.data);

                    setSearchResult(response.data.searchResult || []);

                    // Handle pagination
                    const totalResults = response.data.total || 0;
                    const resultsPerPage = response.data.resultsPerPage || 10; // Adjust as per your backend
                    const totalPages = Math.ceil(totalResults / resultsPerPage);
                    setCount(totalPages);

                } catch (error) {
                    console.error('Error searching for cars:', error);
                    setSearchResult([]);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [searchQuery, page]);

    const handleChange = (event, value) => {
        setPage(value);
    };

    return (
        <div className="results-page">
            <Grid container sx={{ mt: 2 }}>
                <SearchCarsComponent />
            </Grid>
            <h1>Search Results for "{searchQuery}"</h1>

            <Grid container justifyContent="center" my={4} ml="auto" mr="auto" spacing={2} sx={{ width: '100%', maxWidth: 'lg' }}>
                <Grid item xs={12}>
                    {/* Additional content can go here */}
                </Grid>
                <Grid container justifyContent="center" spacing={2} sx={{ width: '100%' }}>
                    {loading
                        ? Array.from(new Array(6)).map((_, index) => (
                            <Grid item key={index} xs={12} sm={6} md={4} mb={2} display="flex" justifyContent="center">
                                <Skeleton variant="rectangular" width={300} height={200} />
                            </Grid>
                        ))
                        : searchResult.length > 0
                            ? searchResult.map((newCar, index) => (
                                <Grid item key={index} xs={12} sm={6} md={4} mb={2} display="flex" justifyContent="center">
                                    <CarCardComponent car={newCar} />
                                </Grid>
                            ))
                            : (
                                <Typography variant="h6">No cars found for "{searchQuery}"</Typography>
                            )
                    }
                </Grid>

                {!loading && (
                    <Grid item xs={12} mt={3}>
                        <Pagination
                            count={count}
                            page={page}
                            color="primary"
                            onChange={handleChange}
                            sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}
                        />
                    </Grid>
                )}

            </Grid>
        </div>
    );
};

export default ResultsPage;
