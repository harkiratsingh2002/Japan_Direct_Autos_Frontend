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
import Swal from 'sweetalert2'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Loading from "./Loading";

const navLinks = [
  {
    linkName: "Home",
    link: "/",
    visibleTo: "All",
  },
  
  {
    linkName: "Your Enquiries",
    link: "/your-enquiries",
    visibleTo: "All",
  },
  {
    linkName: "Our Story",
    link: "/our-story",
    visibleTo: "All",
  },
];

const adminLinks = [
  {
    linkName: "Dashboard",
    link: "/Dashboard/add-car-form",
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
// ]

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
    <Box sx={{ width: 250 }} role="presentation" >
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
                    primary={'Cars'}
                  />


        </ListItemButton>
        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openCars}
        onClose={props.closeDrawer}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
       <Link to={'/new-cars'}>
       <MenuItem  sx={{
         color:myColors.textBlack
       }} onClick={props.closeDrawer}>New Cars</MenuItem>
       </Link>
       <Link  to={'/used-cars'}>
       <MenuItem  sx={{
         color:myColors.textBlack
       }} onClick={props.closeDrawer}>Used Cars</MenuItem>
       </Link>
       <Link  to={'/rental-cars'}>
       <MenuItem  sx={{
         color:myColors.textBlack
       }} onClick={props.closeDrawer}>Rental Cars</MenuItem>
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
  const openCars = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  React.useEffect(() => {
    if (localStorage.getItem("userData")) {
      let userData = JSON.parse(localStorage.getItem("userData"));
      let date = Date.now();
      console.log('expiry , date',userData.expiry,date)
      if (userData.expiry < date) {
        // alert("Your session is expired please login again to continue.");
        dispatch(logoutUser());
        Swal.fire({
          title: 'Warning',
          text:"Your session is expired please login again to continue." ,
          icon: 'warning',
          // confirmButtonText: 'Cool'
        })
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
  };
  const appBarStyles = {
    backgroundColor: myColors.offWhite,
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

  const desktopMenu = (
    <>
      <div style={NavLinkStyles}>
        {/* <Button sx={NavLinkStyles}>Home</Button>
        <Button sx={NavLinkStyles}>New Cars</Button>
        <Button sx={NavLinkStyles}>Used Cars</Button> */}

        {/* <Link to={"/dashboard"}>
          <Button sx={NavLinkStyles}>Dashboard</Button>
        </Link> */}
        <Button sx={NavLinkStyles}>{`Hi ${firstName}`}</Button>

        {navLinks.map((linkObj) => {
          return (
            <>
              <Link to={linkObj.link}>
                <Button sx={NavLinkStyles}>{linkObj.linkName}</Button>
              </Link>
            </>
          );
        })}
 <Button onClick={handleClick} sx={NavLinkStyles}>{'Cars'}</Button>
<Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openCars}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
       <Link color={myColors.textBlack} to={'/new-cars'}>
       <MenuItem onClick={handleClose}>New Cars</MenuItem>
       </Link>
       <Link color={myColors.textBlack} to={'/used-cars'}>
       <MenuItem onClick={handleClose}>Used Cars</MenuItem>
       </Link>
       <Link color={myColors.textBlack} to={'/rental-cars'}>
       <MenuItem onClick={handleClose}>Rental Cars</MenuItem>
       </Link>  
        
      </Menu>
        {role == "admin" &&
          adminLinks.map((linkObj) => {
            return (
              <>
                <Link to={linkObj.link}>
                  <Button sx={NavLinkStyles}>{linkObj.linkName}</Button>
                </Link>
              </>
            );
          })}
        {firstName == "Guest" && loginDesktopLink}
        {firstName != "Guest" && logoutDesktopLink}

        {/* <Button sx={NavLinkStyles}>Our Story</Button>

        <Button sx={NavLinkStyles}>Contact Us</Button>

        <Button sx={NavLinkStyles}>Login</Button>
        <Button sx={NavLinkStyles}>Sign Up</Button> */}
      </div>
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
            {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
            <Typography
              pt={2}
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              <img src={logo} alt="" height={70} />
            </Typography>
            {width <= 768 ? mobileMenu : desktopMenu}
          </Toolbar>
        </AppBar>
      </Box>

      <Outlet />

      <Footer />
    </>
  );
}
