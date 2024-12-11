import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const drawerWidth = 240; // Same width as the sidebar

const Navbar = () => {
    return (
        <AppBar 
            position="fixed" 
            color="default" 
            sx={{ 
                width: `calc(100% - ${drawerWidth}px)`, // Adjust width based on sidebar
                ml: `${drawerWidth}px`, // Add margin-left
                boxShadow: 'none', 
                borderBottom: '1px solid #e0e0e0' 
            }}
        >
            <Toolbar>
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                        Dashboard
                    </Typography>
                </Box>
                <Button color="primary" variant="contained">Logout</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
