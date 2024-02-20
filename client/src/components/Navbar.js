// import React, { useState ,useEffect} from "react";
// import { Link } from "react-router-dom";
// import { HiOutlineBars3 } from "react-icons/hi2";
// import Box from "@mui/material/Box";
// import Drawer from "@mui/material/Drawer";
// import List from "@mui/material/List";
// import Divider from "@mui/material/Divider";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import HomeIcon from "@mui/icons-material/Home";
// import InfoIcon from "@mui/icons-material/Info";
// import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
// import PersonIcon from '@mui/icons-material/Person';
// const Navbar = () => {

//     const [openMenu, setOpenMenu] = useState(false);
//     const menuOptions = [
//       {
//         text: "Home",
//         icon: <HomeIcon />,
//         path:'/home'
//       },
//       {
//         text: "About",
//         icon: <InfoIcon />,
//         path:'/about'
//       },
//       {
//         text: "Contact",
//         icon: <PhoneRoundedIcon />,
//         path:'/contact'
//       },
//     ];
//     const [isSticky, setIsSticky] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       const offset = window.scrollY;
//       if (offset > 0) {
//         setIsSticky(true);
//       } else {
//         setIsSticky(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//     return (
//         <nav className={`flex items-center justify-between px-6 py-4 bg-violet-600 shadow-md ${isSticky ? 'fixed top-0 left-0 right-0 z-50' : ''}`}>
//         <div className="nav-logo-container">
//           <h2 className="text-2xl text-slate-200 font-bold">Visa App</h2>
//         </div>
//         <div className="hidden md:flex navbar-links-container items-center space-x-6 mr-8">
//           <a href="/Home" className=" text-slate-200 hover:text-gray-900 text-lg">Home</a>
//           <a href="/About" className="text-slate-200 hover:text-gray-900 text-lg">About</a>
//           <a href="/Contact" className="text-slate-200 hover:text-gray-900 text-lg">Contact</a>
//           <div>
//           <PersonIcon className="text-slate-200 hover:text-gray-900 mr-1" />
//           <a href="/Profile" className="text-slate-200 hover:text-gray-900 text-lg">Profile</a>
//           </div>
//         </div>
//           <div className="navbar-menu-container md:hidden">
//             <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
//           </div>
//           <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
//             <Box
//               sx={{ width: 250 }}
//               role="presentation"
//               onClick={() => setOpenMenu(false)}
//               onKeyDown={() => setOpenMenu(false)}
//             >
//               <List>
//                 {menuOptions.map((item) => (
//                   <ListItem key={item.text} disablePadding>
//                     <ListItemButton component={Link} to={item.path}>
//                       <ListItemIcon>{item.icon}</ListItemIcon>
//                       <ListItemText primary={item.text} />
//                     </ListItemButton>
//                   </ListItem>
//                 ))}
//               </List>
//               <Divider />
//             </Box>
//           </Drawer>
//         </nav>
//       );
//     };
//     export default Navbar;


import React, { useState ,useEffect} from "react";
import { Link } from "react-router-dom";
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

const Navbar = ({ scrollToSection }) => {
    const [openMenu, setOpenMenu] = useState(false);
    const menuOptions = [
      {
        text: "Home",
        icon: <HomeIcon />,
        path:'#hero' // Update the path to anchor link
      },
      {
        text: "About",
        icon: <InfoIcon />,
        path:'#about' // Update the path to anchor link
      },
      {
        text: "Contact",
        icon: <PhoneRoundedIcon />,
        path:'#contact' // Update the path to anchor link
      },
    //   {
    //     text: "Profile",
    //     icon: <PersonIcon />,
    //     path:'/profile' // Update the path to anchor link
    //   },
    ];

    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 0) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={`flex items-center justify-between px-6 py-4 bg-violet-600 shadow-md ${isSticky ? 'fixed top-0 left-0 right-0 z-50' : ''}`}>
            <div className="nav-logo-container">
                <h2 className="text-2xl text-slate-200 font-bold">Visa App</h2>
            </div>
            <div className="hidden md:flex navbar-links-container items-center space-x-6 mr-8">
                {menuOptions.map((item) => (
                    <a key={item.text} href={item.path} onClick={() => scrollToSection(item.path.substring(1))} className="text-slate-200 hover:text-gray-900 text-lg">{item.text}</a>
                ))}
                <div>
                    <PersonIcon className="text-slate-200 hover:text-gray-900 mr-1" />
                    <a href="/Profile" className="text-slate-200 hover:text-gray-900 text-lg">Profile</a>
                </div>
            </div>
            <div className="navbar-menu-container md:hidden">
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
                                <ListItemButton onClick={() => {setOpenMenu(false); scrollToSection(item.path.substring(1))}}>
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

