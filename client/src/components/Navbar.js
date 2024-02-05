import React, { useState } from "react";
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import PersonIcon from '@mui/icons-material/Person';
import 'tailwindcss/tailwind.css';
const Navbar = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const menuOptions = [
      {
        text: "Home",
        icon: <HomeIcon />,
      },
      {
        text: "About",
        icon: <InfoIcon />,
      },
      {
        text: "Contact",
        icon: <PhoneRoundedIcon />,
      },
    ];
    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
          <div className="nav-logo-container">
            <h2 className="text-violet-600">Visa App</h2>
          </div>
          <div className="navbar-links-container flex items-center space-x-4">
            <a href="/Home" className="text-gray-700 hover:text-gray-900">Home</a>
            <a href="/About" className="text-gray-700 hover:text-gray-900">About</a>
            <a href="/Contact" className="text-gray-700 hover:text-gray-900">Contact</a>
            <PersonIcon className="text-gray-700 hover:text-gray-900" />
          </div>
          <div className="navbar-menu-container">
            <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
          </div>
          <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
            <Box
              sx={{ width: 250 }}
              role="presentation"
              onClick={() => setOpenMenu(false)}
              onKeyDown={() => setOpenMenu(false)}
            >
              <List>
                {menuOptions.map((item) => (
                  <ListItem key={item.text} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <Divider />
            </Box>
          </Drawer>
        </nav>
      );
    };
    export default Navbar;