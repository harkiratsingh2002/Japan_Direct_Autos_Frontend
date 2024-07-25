import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from '@mui/icons-material/MoveToInbox';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import myColors from "../assets/util/myColors";
import SettingsIcon from "@mui/icons-material/Settings";
import { AppBar, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

// import MailIcon from '@mui/icons-material/Mail';

export default function DashboardDrawer() {
  const [open, setOpen] = React.useState(true);

  const closeDrawer = () => {
    setOpen((oldOpenState) => {
      return false;
    });
  };

  const openDrawer = () => {
    setOpen(true);
  };

  const appBarStyles = {
    backgroundColor: myColors.textBlack,
  };

  const dashboardLinks = ['/add-car-form','/manage-cars','/add-user','/manage-users']

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={closeDrawer}>
      <div>
        <IconButton
          size="large"
          edge="start"
          color={myColors.textBlack}
          aria-label="menu"
          sx={{ ml: "auto" }}
          onClick={openDrawer}
        >
          <MenuIcon />
        </IconButton>
      </div>
      <List>
        {["Add Car", "Manage Cars", "Add User", "Manage Users"].map((text, index) => (
          <ListItem key={text} disablePadding>
          
          <Link  to={'/Dashboard' + dashboardLinks[index]}>
            
            <ListItemButton  sx={{
                color: myColors.textBlack
              }}>
              <ListItemIcon>
                {index % 2 === 0 ? <AddCircleIcon /> : <EditRoundedIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["Handle Enquiries"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <Link  to={'/Dashboard/handle-enquiries'}>
            
            <ListItemButton  sx={{
                color: myColors.textBlack
              }}>
              {/* <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon> */}
              <ListItemText primary={text} />
            </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar sx={appBarStyles} position="static">
          <Toolbar>
            <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={openDrawer}
          >
            <SettingsIcon />
          </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer open={open} onClose={closeDrawer}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
