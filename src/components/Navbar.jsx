import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import myColors from "../assets/util/myColors";
import logo from "../assets/images/logo.png";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useWindowWidth } from "@react-hook/window-size";
import MenuIcon from "@mui/icons-material/Menu";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { FloatingWhatsApp } from '@carlos8a/react-whatsapp-floating-button';
import whatsappDP from '../assets/images/whatsappDP.jpg'
import UserIcon from '../assets/images/userIcon.png';
import SearchBar from "./SearchBar.jsx";


import IconButton from "@mui/material/IconButton";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
// import MobileNavbarDrawer from "";
// import MobileNavbarDrawer from "./mobileNavbarDrawer";

// import MenuIcon from '@mui/icons-material/Menu';
import Footer from "./Footer";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, logoutUser } from "../reduxStore/userDataSlice";
import Swal from "sweetalert2";
import Menu from "@mui/material/Menu";
import AccountCircle from '@mui/icons-material/AccountCircle';

import MenuItem from "@mui/material/MenuItem";
import Loading from "./Loading";
import links from "../assets/util/links";
import axios from "axios";
import { Margin } from "@mui/icons-material";

const navLinks = [
  {
    linkName: "Home",
    link: "/",
    visibleTo: "All",
  },


  {
    linkName: "Our Story",
    link: "/our-story",
    visibleTo: "All",
  },
  {
    linkName: "Contact Us",
    link: "/contact-us",
    visibleTo: "All",
  },
];

const adminLinks = [
  {
    linkName: "Dashboard",
    link: "/Dashboard/main",
    visibleTo: "Admin",
  },
];

const dynamicLink = [
  {
    linkName: "Login",
    link: "/login",
    visibleTo: "All",
  },

  {
    linkName: "Sign Up",
    link: "/register",
    visibleTo: "All",
  },
];

// const dynamicLink = [
//   {
//     linkName: "Login",
//     link: "/login",
//     visibleTo: "All",
//   },


const MobileNavbarDrawer = (props) => {
  const firstName = useSelector((state) => state.userDataSlice.firstName);
  const role = useSelector((state) => state.userDataSlice.role);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutUser());
    localStorage.removeItem("userData");
    navigate("/login", { replace: true });
  };

  const loginMobileLink = (
    <>
      <ListItem disablePadding>
        <Link color={myColors.textBlack} to={"/login"}>
          <ListItemButton>
            {/* <ListItemIcon>
                  {index % 2 === 0 ? <AddCircleIcon /> : <EditRoundedIcon />}
                </ListItemIcon> */}
            <ListItemText
              sx={{
                color: myColors.textBlack,
              }}
              primary={"Login"}
            />
          </ListItemButton>
        </Link>
      </ListItem>
      <ListItem disablePadding>
        <Link color={myColors.textBlack} to={"/register"}>
          <ListItemButton>
            {/* <ListItemIcon>
                  {index % 2 === 0 ? <AddCircleIcon /> : <EditRoundedIcon />}
                </ListItemIcon> */}
            <ListItemText
              sx={{
                color: myColors.textBlack,
              }}
              primary={"Sign Up"}
            />
          </ListItemButton>
        </Link>
      </ListItem>
    </>
  );

  const logoutMobileLink = (
    <>
      <ListItem disablePadding>
        {/* <Link color={myColors.textBlack} to={"/login"}> */}
        <ListItemButton onClick={logoutHandler}>
          {/* <ListItemIcon>
                  {index % 2 === 0 ? <AddCircleIcon /> : <EditRoundedIcon />}
                </ListItemIcon> */}
          <ListItemText
            sx={{
              color: myColors.textBlack,
            }}
            primary={"Logout"}
          />
        </ListItemButton>
        {/* </Link> */}
      </ListItem>
    </>
  );
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openCars = Boolean(anchorEl);

  return (
    <Box sx={{ width: 250 }} role="presentation">
      <div>
        <IconButton
          size="large"
          edge="start"
          color={myColors.textBlack}
          aria-label="menu"
          sx={{ ml: "auto" }}
          onClick={props.closeDrawer}
        >
          <MenuIcon />
        </IconButton>
      </div>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            {/* <ListItemIcon>
                {index % 2 === 0 ? <AddCircleIcon /> : <EditRoundedIcon />}
              </ListItemIcon> */}
            <ListItemText
              sx={{
                color: myColors.textBlack,
              }}
              primary={`Hi ${firstName}`}
            />
          </ListItemButton>
        </ListItem>
        {navLinks.map((navItem, index) => (
          <>
            <ListItem key={index} disablePadding>
              <Link color={myColors.textBlack} to={navItem.link}>
                <ListItemButton onClick={props.closeDrawer}>
                  {/* <ListItemIcon>
                {index % 2 === 0 ? <AddCircleIcon /> : <EditRoundedIcon />}
              </ListItemIcon> */}
                  <ListItemText
                    sx={{
                      color: myColors.textBlack,
                    }}
                    primary={navItem.linkName}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          </>
        ))}
        <ListItemButton onClick={handleClick}>
          <ListItemText
            sx={{
              color: myColors.textBlack,
            }}
            primary={"Buy/Rent"}
          />
        </ListItemButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={openCars}
          onClose={props.closeDrawer}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <Link to={"/featured-cars"}>
            <MenuItem
              sx={{
                color: myColors.textBlack,
              }}
              onClick={props.closeDrawer}
            >
              featured Cars
            </MenuItem>
          </Link>
          <Link to={"/used-cars"}>
            <MenuItem
              sx={{
                color: myColors.textBlack,
              }}
              onClick={props.closeDrawer}
            >
              Used Cars
            </MenuItem>
          </Link>
          <Link to={"/rental-cars"}>
            <MenuItem
              sx={{
                color: myColors.textBlack,
              }}
              onClick={props.closeDrawer}
            >
              Rental Cars
            </MenuItem>
          </Link>
        </Menu>
        {role == "admin" &&
          adminLinks.map((linkItem, index) => {
            return (
              <>
                <ListItem key={index} disablePadding>
                  <Link color={myColors.textBlack} to={linkItem.link}>
                    <ListItemButton>
                      {/* <ListItemIcon>
                {index % 2 === 0 ? <AddCircleIcon /> : <EditRoundedIcon />}
              </ListItemIcon> */}
                      <ListItemText
                        sx={{
                          color: myColors.textBlack,
                        }}
                        primary={linkItem.linkName}
                      />
                    </ListItemButton>
                  </Link>
                </ListItem>
              </>
            );
          })}
        {firstName == "Guest" && loginMobileLink}
        {firstName != "Guest" && logoutMobileLink}
      </List>
      {/* <Divider /> */}
      {/* <List>
        {["Handle Enquiries"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );
};
export default function Navbar() {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [wishlistLen, setWishlistLen] = React.useState(0);
  const showWishlist = useSelector((state) => state.userDataSlice.showWishlist);
  const openCars = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  React.useEffect(() => {
    if (localStorage.getItem("userData")) {
      // setIsLoggedIn(true);
      let userData = JSON.parse(localStorage.getItem("userData"));

      axios
        .get(links.backendUrl + "/get-wishlist-length", {
          headers: {
            Authorization: `Bearer ${userData.userToken}`,
          },
        })
        .then((response) => {
          localStorage.setItem("wishlistLen", response.data.length);
          setWishlistLen(response.data.length);
        });
      let date = Date.now();
      console.log("expiry , date", userData.expiry, date);
      if (userData.expiry < date) {
        // alert("Your session is expired please login again to continue.");
        dispatch(logoutUser());
        Swal.fire({
          title: "Warning",
          text: "Your session is expired please login again to continue.",
          icon: "warning",
          // confirmButtonText: 'Cool'
        });
        localStorage.removeItem("userData");
        navigate("/login");
      } else {
        dispatch(loginUser({ userData: userData }));
      }
    }
  }, []);

  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logoutUser());
    localStorage.removeItem("userData");
    navigate("/login", { replace: true });
    // Window.location.reload();
  };
  const appBarStyles = {
    backgroundColor: myColors.offWhite,
    height: '70px'

  };
  const NavLinkStyles = {
    color: myColors.textBlack,
  };
  const width = useWindowWidth();
  const firstName = useSelector((state) => state.userDataSlice.firstName);
  const role = useSelector((state) => state.userDataSlice.role);

  const loginDesktopLink = (
    <>
      <Link to={"/login"}>
        <Button sx={NavLinkStyles}>Login</Button>
      </Link>
      <Link to={"/register"}>
        <Button sx={NavLinkStyles}>Sign Up</Button>
      </Link>
    </>
  );

  const logoutDesktopLink = (
    <>
      <Button sx={NavLinkStyles} onClick={logoutHandler}>
        Logout
      </Button>
    </>
  );
  const wishlistIcon = (
    <>
      {showWishlist && (
        <IconButton
          size="large"
          edge="start"
          color="error"
          aria-label="wishlist"
          sx={{ ml: "auto", marginTop: "0" }}
          onClick={() => {
            navigate("/wishlist");
          }}
        >
          <FavoriteIcon />
          <span
            style={{
              paddingBottom: "0.7em",
              fontSize: "0.7em",
            }}
          >
            {localStorage.getItem("wishlistLen")
              ? localStorage.getItem("wishlistLen")
              : 0}
          </span>
        </IconButton>
      )}
    </>
  );
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  // Handlers for User Menu
  const handleUserMenuOpen = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorElUser(null);
  };
  const desktopMenu = (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <div style={NavLinkStyles}>
          <Button onClick={handleClick} sx={NavLinkStyles}>
            {"Buy/Rent"}
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openCars}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <Link to={"/new-cars"}>
              <MenuItem sx={{ color: myColors.textBlack }} onClick={handleClose}>
                Featured Cars
              </MenuItem>
            </Link>
            <Link to={"/used-cars"}>
              <MenuItem sx={{ color: myColors.textBlack }} onClick={handleClose}>
                Used Cars
              </MenuItem>
            </Link>
            <Link to={"/rental-cars"}>
              <MenuItem sx={{ color: myColors.textBlack }} onClick={handleClose}>
                Rental Cars
              </MenuItem>
            </Link>
          </Menu>
          {role === "admin" &&
            adminLinks.map((linkObj) => (
              <Link to={linkObj.link} key={linkObj.linkName}>
                <Button sx={NavLinkStyles}>{linkObj.linkName}</Button>
              </Link>
            ))}
          {navLinks.map((linkObj) => (
            <Link to={linkObj.link} key={linkObj.linkName}>
              <Button sx={NavLinkStyles}>{linkObj.linkName}</Button>
            </Link>
          ))}
        </div>
      </Box>
      <SearchBar />
      {/* User Icon */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <IconButton

          size="large"
          edge="end"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleUserMenuOpen}
          color="black"
          outline='none'
          sx={{ mt: 1, mr: .4, p: 0 }}

        >
          <img
            src={UserIcon}
            alt="User Icon"
            style={{ width: 30, height: 30 }} // Adjust size as needed
          />

        </IconButton>
        <Typography variant="caption" sx={{ color: myColors.textBlack, mt: 0 }}>
          Account
        </Typography>
      </Box>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElUser}
        open={Boolean(anchorElUser)}
        onClose={handleUserMenuClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {firstName !== "Guest" ? (
          <><MenuItem>
            <Button sx={NavLinkStyles}>{`Hi ${firstName}`}</Button>
          </MenuItem>
            <MenuItem
              onClick={() => {
                handleUserMenuClose();
                navigate('/profile');
              }}
            >
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleUserMenuClose();
                logoutHandler();
              }}
            >
              Logout
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem>
              <Button sx={NavLinkStyles}>{`Hi ${firstName}`}</Button>
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleUserMenuClose();
                navigate('/login');
              }}
            >
              Login
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleUserMenuClose();
                navigate('/register');
              }}
            >
              Sign Up
            </MenuItem>
          </>
        )}
      </Menu>
      {wishlistIcon}
    </>
  );

  const [open, setOpen] = React.useState(false);

  const closeDrawer = () => {
    setOpen((oldOpenState) => {
      return false;
    });
  };

  const openDrawer = () => {
    setOpen(true);
  };

  const mobileMenu = (
    <>
      {wishlistIcon}
      <IconButton
        size="large"
        edge="start"
        color={myColors.textBlack}
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={openDrawer}
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={closeDrawer}>
        <MobileNavbarDrawer openDrawer={openDrawer} closeDrawer={closeDrawer} />
      </Drawer>
    </>
  );

  return (
    <>
      <Loading />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar sx={appBarStyles} position="static">
          <Toolbar>
            <Typography
              pt={2}
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              <img src={logo} alt="" height={50} />
            </Typography>
            {width <= 900 ? mobileMenu : desktopMenu}
          </Toolbar>
        </AppBar>
      </Box>

      <Outlet />

      <Footer />

      {/* Live Chat Integration */}
      <call-us-selector phonesystem-url="https://1676.3cx.cloud" party="japandirectautos" ></call-us-selector>



    </>
  );
}
