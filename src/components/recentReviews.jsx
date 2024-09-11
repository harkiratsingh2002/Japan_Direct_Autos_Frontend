import React from "react";
import {
    Card,
    CardContent,
    Typography,
    Grid,
    Avatar,
    Box,
    CircularProgress
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import link from "../assets/util/links";

// Function to fetch recent reviews
const fetchRecentReviews = async () => {
    const response = await fetch(`${link.backendUrl}/reviews/recent`);
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.data;
};

const RecentReviews = () => {
    const { data: reviews = [], isLoading, isError } = useQuery({
        queryKey: ["recentReviews"],
        queryFn: fetchRecentReviews,
        staleTime: 300000, // Adjust staleTime as needed
    });

    if (isLoading) {
        return <CircularProgress />;
    }

    if (isError) {
        return <Typography>Error fetching reviews</Typography>;
    }

    return (
        <Grid container spacing={3}>
            {reviews.map((review) => (
                <Grid item xs={12} md={6} key={review._id}>
                    <Card sx={{ boxShadow: 3 }}>
                        <CardContent>
                            <Box display="flex" alignItems="center" mb={2}>
                                <Avatar>{review.reviewdBy.firstName.charAt(0)}</Avatar>
                                <Box ml={2}>
                                    <Typography variant="h6">
                                        {review.reviewdBy.firstName} {review.reviewdBy.lastName}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {review.createdAt.split("T")[0]} {/* Show the date only */}
                                    </Typography>
                                </Box>
                            </Box>
                            <Typography variant="h5">{review.rating} ★</Typography>
                            <Typography variant="body1">{review.reviewText}</Typography>
                            {review.carId ? (
                                <Typography variant="body2" color="textSecondary">
                                    Car: {review.carId.name}
                                </Typography>
                            ) : (
                                <Typography variant="body2" color="textSecondary">
                                    Car information not available
                                </Typography>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default RecentReviews;
