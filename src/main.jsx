import React from "react";
import ReactDOM from "react-dom/client";
// import React, { createContext } from 'react';
import { Provider } from "react-redux";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import App from './App.jsx'
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./index.css";
// import { getDatabase, ref, set } from "firebase/database";
// import app from './firebase.js';
import Navbar from "./components/Navbar.jsx";
import HomePage from "./pageComponents/HomePage.jsx";
import DashboardAdmin from "./pageComponents/DashboardAdmin.jsx";
import RegistrationPage from "./pageComponents/RegistrationPage.jsx";
import LoginPage from "./pageComponents/LoginPage.jsx";
import { store } from "./reduxStore/store.js";
import NewCars from "./pageComponents/NewCars.jsx";
import UsedCars from "./pageComponents/UsedCars.jsx";
import CarDetailsPage from "./pageComponents/CarDetailsPage.jsx";
// import { Auth0Provider } from "@auth0/auth0-react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import YourEnquiries from "./pageComponents/YourEnquiries.jsx";
import OurStory from "./pageComponents/OurStory.jsx";
import ContactUs from "./pageComponents/ContactUs.jsx";
import ForgotPassword from "./pageComponents/ForgotPassword.jsx";
import Wishlist from "./pageComponents/Wishlist.jsx";
import SearchResultPage from './components/searchResultPage.jsx';  // New component for displaying search results


import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RentalCars from "./pageComponents/RentalCars.jsx";
const queryClient = new QueryClient();

// const db = getDatabase(app);

// const userContext = createContext();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/dashboard/:dashboardOption",
        element: <DashboardAdmin />,
      },
      {
        path: "/register",
        element: <RegistrationPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/new-cars",
        element: <NewCars />,
      },
      {
        path: "/used-cars",
        element: <UsedCars />,
      },
      {
        path: "/rental-cars",
        element: <RentalCars />,
      },
      {
        path: "/car-details/:carId",
        element: <CarDetailsPage />,
      },
      {
        path: "/profile",
        element: <YourEnquiries />,
      },
      {
        path: "/our-story",
        element: <OurStory />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
      {
        path: "/results",
        element: <SearchResultPage />,  // New route for displaying search results
      }
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="378521593401-b7cq8jc0q6es09tn97vv7l2l69kklb5v.apps.googleusercontent.com">
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  </GoogleOAuthProvider>
);
