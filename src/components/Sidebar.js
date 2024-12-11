import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard, People, Category, ViewList } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const drawerWidth = 240; // Set the width of the sidebar

const Sidebar = () => {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
        >
            <List>
            <Link to={"/dashboard"} style={{textDecoration:"none",color:"black",fontSize:"30px",fontWeight:"bold"}}>
                <ListItem button>
                    <ListItemIcon ><Dashboard  /></ListItemIcon>
                   
                    <ListItemText primary="Dashboard"  />
                </ListItem>
                </Link>
                <Link to={"/dashboard/adduser"} style={{textDecoration:"none",color:"black"}}>
                <ListItem button>
                    <ListItemIcon><People /></ListItemIcon>
                    <ListItemText primary="Users" />
                </ListItem>
                </Link>
                <Link to={"/dashboard/addcategory"} style={{textDecoration:"none",color:"black"}}>
                <ListItem button>
                    <ListItemIcon><Category /></ListItemIcon>
                    <ListItemText primary="Categories" />
                </ListItem>
                </Link>
                <Link to={"/dashboard/productmanagement"} style={{textDecoration:"none",color:"black"}}>
                <ListItem button>
                    <ListItemIcon><ViewList /></ListItemIcon>
                    <ListItemText primary="Products" />
                </ListItem>
                </Link>
            </List>
        </Drawer>
    );
};

export default Sidebar;
