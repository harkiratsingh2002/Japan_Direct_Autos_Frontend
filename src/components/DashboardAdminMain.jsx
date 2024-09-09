import React from "react";
import {
  Button,
  Grid,
  Typography,
  Card,
  Box,
  IconButton,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { Refresh as RefreshIcon, Add as AddIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Function to fetch counts
const fetchCount = async (type) => {
  const response = await fetch(`http://localhost:7777/${type}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.count;
};

// Function to fetch recent reviews
const fetchRecentReviews = async () => {
  const response = await fetch(`http://localhost:7777/reviews/recent`);
  if (!response.ok) {
    throw new Error("Failed to fetch recent reviews");
  }
  return response.json().then((data) => {
    console.log("reviews data:- ", data.data);
    let reviews = data.data.map((item) => {
      return {
        carName: item.carId.name,
        rating: item.rating,
        reviewText: item.reviewText,
        reviewdBy: item.reviewdBy.firstName + " " + item.reviewdBy.lastName,
        carLink: "/car-details/" + item.carId._id,
      };
    });
    console.log("reviews modified;- ", reviews);
    return data.reviews;
  }); // Adjust to extract the 'reviews' array from the response
};

const DashboardAdminMain = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch counts
  const { data: carCount = 0, refetch: refetchCars } = useQuery({
    queryKey: ["countCars"],
    queryFn: () => fetchCount("countCars"),
    staleTime: 300000,
  });

  const { data: userCount = 0, refetch: refetchUsers } = useQuery({
    queryKey: ["countUsers"],
    queryFn: () => fetchCount("countUsers"),
    staleTime: 300000,
  });

  const { data: enquiryCount = 0, refetch: refetchEnquiries } = useQuery({
    queryKey: ["countEnquiries"],
    queryFn: () => fetchCount("countEnquiries"),
    staleTime: 300000,
  });

  // Fetch recent reviews
  const { data: recentReviews = [], refetch: refetchReviews } = useQuery({
    queryKey: ["recentReviews"],
    queryFn: fetchRecentReviews,
    staleTime: 300000,
  });

  // Refresh handler
  const handleRefresh = () => {
    refetchCars();
    refetchUsers();
    refetchEnquiries();
    refetchReviews();
  };

  // Chart data
  const chartData = {
    labels: ["Users", "Cars", "Enquiries"],
    datasets: [
      {
        label: "Statistics",
        data: [userCount, carCount, enquiryCount],
        backgroundColor: ["#1e88e5", "#43a047", "#f4511e"],
      },
    ],
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      {/* Header */}
      <Grid container justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Admin Dashboard</Typography>
        <IconButton onClick={handleRefresh} color="primary">
          <RefreshIcon />
        </IconButton>
      </Grid>

      {/* Overview Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, boxShadow: 3 }}>
            <Typography variant="h6">Total Cars</Typography>
            <Typography variant="h2" sx={{ color: "#1e88e5" }}>
              {carCount}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => navigate("/Dashboard/manage-cars")}
              sx={{ mt: 2 }}
            >
              Manage Cars
            </Button>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, boxShadow: 3 }}>
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="h2" sx={{ color: "#43a047" }}>
              {userCount}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => navigate("/Dashboard/manage-users")}
              sx={{ mt: 2 }}
            >
              Manage Users
            </Button>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, boxShadow: 3 }}>
            <Typography variant="h6">Total Enquiries</Typography>
            <Typography variant="h2" sx={{ color: "#f4511e" }}>
              {enquiryCount}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => navigate("/Dashboard/handle-enquiries")}
              sx={{ mt: 2 }}
            >
              Manage Enquiries
            </Button>
          </Card>
        </Grid>
      </Grid>

      {/* Chart and Recent Reviews Panel */}
      <Grid container spacing={3} mb={4}>
        {/* Smaller Chart */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, boxShadow: 3, height: "86%" }}>
            <Typography variant="h6">Dashboard Overview</Typography>
            <Bar data={chartData} />
          </Card>
        </Grid>

        {/* Styled Recent Reviews Panel */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, boxShadow: 3, height: "86%" }}>
            <Typography variant="h6" gutterBottom>
              Recent Reviews
            </Typography>
            <List>
              {recentReviews.length > 0 ? (
                recentReviews.map((review, index) => (
                  <React.Fragment key={index}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar>{review.reviewdBy?.firstName.charAt(0)}</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={`"${review.reviewText}"`}
                        secondary={`by ${review.reviewdBy?.firstName} ${review.reviewdBy?.lastName} (Rating: ${review.rating}/5) for ${review.carId?.name} `}
                      />
                    </ListItem>
                    {index < recentReviews.length - 1 && (
                      <Divider variant="inset" component="li" />
                    )}
                  </React.Fragment>
                ))
              ) : (
                <Typography variant="body2" sx={{ mt: 2 }}>
                  No recent reviews available.
                </Typography>
              )}
            </List>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Actions Section */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, boxShadow: 3 }}>
            <Typography variant="h6">Quick Actions</Typography>
            <Button
              startIcon={<AddIcon />}
              variant="outlined"
              color="primary"
              fullWidth
              onClick={() => navigate("/Dashboard/add-car-form")}
              sx={{ mt: 2 }}
            >
              Add Car
            </Button>
            <Button
              startIcon={<AddIcon />}
              variant="outlined"
              color="primary"
              fullWidth
              onClick={() => navigate("/Dashboard/add-user")}
              sx={{ mt: 2 }}
            >
              Add User
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardAdminMain;
