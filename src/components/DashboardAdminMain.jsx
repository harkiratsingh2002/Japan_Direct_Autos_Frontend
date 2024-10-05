import React from "react";
import { AddCircleOutline, Edit, Delete, Visibility } from '@mui/icons-material';
import addCarImage from "../assets/images/add-car.png";
import addUserImage from "../assets/images/add-user.png";

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
import RecentReviews from "./recentReviews";
import link from "../assets/util/links";
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
  const response = await fetch(`${link.backendUrl}/${type}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.count;
};

// Function to fetch recent reviews
const fetchRecentReviews = async () => {
  const response = await fetch(`${link.backendUrl}/reviews/recent`);
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
      <Grid container alignItems="center" justifyContent="space-between" mb={2}>
        <Grid item>

          <Typography variant="h4">Admin Dashboard</Typography>
        </Grid>
        {/* Quick Actions Section */}
        <Grid item >
          <Grid container spacing={2}>
            <Grid item>
              <IconButton color="primary" onClick={() => { navigate("/Dashboard/add-car-form") }}>
                <img src={addCarImage} alt="Add" style={{ width: 50, height: 50 }} />
              </IconButton>
              <Typography variant="h6">Add Car</Typography>

            </Grid>
            <Grid item>
              <IconButton color="primary" onClick={() => { navigate("/Dashboard/add-user") }}>
                <img src={addUserImage} alt="Edit" style={{ width: 50, height: 50 }} />
              </IconButton>
              <Typography variant="h6">Add User</Typography>

            </Grid>


            <IconButton onClick={handleRefresh} color="primary">
              <RefreshIcon />
            </IconButton>

          </Grid>
        </Grid>
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
          <Card sx={{ p: 2, boxShadow: 3, height: "89.5%" }}>
            <Typography variant="h4" marginBottom={8}>Dashboard Overview</Typography>
            <Bar data={chartData} />
          </Card>
        </Grid>

        {/* Styled Recent Reviews Panel */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, boxShadow: 3, height: "86%" }}>
            <Typography variant="h6" gutterBottom>
              Recent Reviews
            </Typography>
            <RecentReviews />
          </Card>
        </Grid>
      </Grid>





    </Box >
  );
};

export default DashboardAdminMain;
