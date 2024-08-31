import { Button, Grid, Typography, Card, CardContent } from "@mui/material";
import myColors from "../assets/util/myColors";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import links from "../assets/util/links";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useQuery, useQueryClient } from "@tanstack/react-query"; // Import react-query hooks


// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const fetchCount = async (type) => {
  const response = await fetch(`${links.backendUrl}/${type}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.count;
};

const DashboardAdminMain = () => {
  let navigate = useNavigate();
  const queryClient = useQueryClient(); // Create a query client instance

  // Using react-query to fetch data with caching and optimistic updates
  const { data: carCount = 0 } = useQuery({
    queryKey: ['countCars'],
    queryFn: () => fetchCount('countCars'),
    staleTime: 5000, // Keep data fresh for 5 seconds
  });

  const { data: userCount = 0 } = useQuery({
    queryKey: ['countUsers'],
    queryFn: () => fetchCount('countUsers'),
    staleTime: 5000,
  });

  const { data: enquiryCount = 0 } = useQuery({
    queryKey: ['countEnquiries'],
    queryFn: () => fetchCount('countEnquiries'),
    staleTime: 5000,
  });
  // Sample data for the chart
  const chartData = {
    labels: ["Users", "Cars", "Enquiries"],
    datasets: [
      {
        label: "Statistics",
        data: [userCount, carCount, enquiryCount], // Use dynamic data
        backgroundColor: [myColors.primaryColor, myColors.secondaryColor, myColors.judiColor],
      },
    ],
  };

  return (
    <>
      <Grid container py={5} xs={10} ml={"auto"} mr={"auto"} spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center" gutterBottom>
            Administrator Dashboard
          </Typography>
        </Grid>

        {/* Top Section with Cards */}
        <Grid container spacing={3} justifyContent="center">
          {/* Card for Cars */}
          <Grid item xs={12} md={3}>
            <Card sx={{ textAlign: 'center', padding: 2 }}>
              <Typography variant="h6">CARS</Typography>
              <Typography variant="h2">{carCount}</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/Dashboard/manage-cars")}
                fullWidth
              >
                Manage Cars
              </Button>
            </Card>
          </Grid>

          {/* Card for Users */}
          <Grid item xs={12} md={3}>
            <Card sx={{ textAlign: 'center', padding: 2 }}>
              <Typography variant="h6">USERS</Typography>
              <Typography variant="h2">{userCount}</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/Dashboard/manage-users")}
                fullWidth
              >
                Manage Users
              </Button>
            </Card>
          </Grid>

          {/* Card for Enquiries */}
          <Grid item xs={12} md={3}>
            <Card sx={{ textAlign: 'center', padding: 2 }}>
              <Typography variant="h6">ENQUIRIES</Typography>
              <Typography variant="h2">{enquiryCount}</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/Dashboard/handle-enquiries")}
                fullWidth
              >
                Manage Enquiries
              </Button>
            </Card>
          </Grid>
        </Grid>

        {/* Chart Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Dashboard Overview</Typography>
              <Bar data={chartData} />
            </CardContent>
          </Card>
        </Grid>

      </Grid >
    </>
  );
};

export default DashboardAdminMain;
