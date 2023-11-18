import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import HomeIcon from '@mui/icons-material/Home';
import DeleteIcon from '@mui/icons-material/Delete';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import logo from "../../public/logo_size.jpg";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import { toast } from 'react-toastify';

const drawerWidth = 240;
const settings = ['Profile Settings', 'Logout'];

function PrivateRoutes(props){

    const navigateTo = useNavigate();
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [userVerified, setUserVerified] = useState(false);
    const [apiURL] = useState("http://127.0.0.1:3000/api/v1");

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
        };
    
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
        };
    
    const verifyCookies = async () => {
        try{
            const resp = await fetch(`${apiURL}/auth/verify`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    },
            });
            if(resp.ok === true){
                setUserVerified(true);
                // toast.success('Verified');
            }
            else{
                // toast.warn("Invalid Credentials!");
                const error = await resp.json();
                console.log("Invalid Credentials!", error);
                navigateTo(`/login`);
            }
        }
        catch (error){
            console.log("Failed to Login", error);
            toast.error("Failed to Login");
        }
    };

    const logout = async () => {
        try{
            const resp = await fetch(`${apiURL}/auth/logout`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    },
            });
            if(resp.ok === true){
                setUserVerified(false);
                navigateTo("/login");
                // toast.success('Verified');
            }
            else{
                toast.warn("Invalid Credentials!");
                const error = await resp.json();
                console.log("Invalid Credentials!", error);
                navigateTo(`/login`);
            }
        }
        catch (error){
            console.log("Failed to Login", error);
            toast.error("Failed to Login");
        }
    };

    useEffect(() => {
        //if tokens exist, verify, otherwise redirect to login
        verifyCookies();
    }, []);

    return (
        
        userVerified && 
        (
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
                    <Container>
                        <Toolbar disableGutters>
                            <div style={{ flexGrow: 1 }}>
                                <Box>
                                    <Typography textAlign="center">{props.location}</Typography>
                                </Box>
                            </div>
                            <Box>
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="http://localhost:3000/remy.jpg" />
                                </IconButton>
                                <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                                >
                                {settings.map((setting, index) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center" onClick={(e) => {
                                        if(index === 0){
                                            //show user profile
                                            console.log("Show User Profile");
                                        }
                                        else if(index === 1){
                                            logout();
                                        }
                                    }}>{setting}</Typography>
                                    </MenuItem>
                                ))}
                                </Menu>
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
                <Drawer
                    sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                    }}
                    variant="permanent"
                    anchor="left"
                >
                    <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
                        <img src={logo} alt="lists-logo" />
                    </Toolbar>
                    <Divider />
                    <List>
                    {['Home', 'Trash', 'User Management'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                        <ListItemButton 
                            onClick={(event) => { 
                                if(text === "Home"){
                                    navigateTo(`/home`);
                                }
                                else if(text === "Trash"){
                                    navigateTo(`/trash`);
                                }
                                else if(text === "User Management"){
                                    navigateTo(`/manage`);
                                }
                            }}
                        >
                            <ListItemIcon>
                            {text === "Home" ? <HomeIcon /> : (text === "Trash" ? <DeleteIcon /> : (text === "User Management" ? <ManageAccountsIcon /> : <InboxIcon />))}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                            
                        </ListItemButton>
                        </ListItem>
                    ))}
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
                >
                    <Toolbar />
                    <Outlet></Outlet>
                </Box>
            </Box>
        )
    );
}

export default PrivateRoutes;