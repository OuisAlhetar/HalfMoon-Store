import React, { useEffect,useState } from 'react';
import { Box, Grid, Paper, Typography, Button } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import CategoryIcon from '@mui/icons-material/Category';
import ListAltIcon from '@mui/icons-material/ListAlt';
import axios from 'axios';



const drawerWidth = 240; // Same width as the sidebar

const Dashboard = () => {
    const [counts,setCounts]=useState({
        users:0,
        products:0,
        categories:0
    })
    const stats = [
        { icon: <PeopleIcon color="error" sx={{ fontSize: 50 }} />, label: 'Users', value: counts.users },
        { icon: <CategoryIcon color="success" sx={{ fontSize: 50 }} />, label: 'Categories', value: counts.products },
        { icon: <ListAltIcon color="primary" sx={{ fontSize: 50 }} />, label: 'Requests', value: 50 },
    ];
    useEffect(()=>{
        
             axios.get('http://localhost/admin/index.php').then(response=>{
                    setCounts({...counts,users:response.data.userCount,products:response.data.productCount})
                })
            
    
            
        
            }
    ,[])

    return (
        <Box sx={{ flexGrow: 1, p: 3, ml: `${drawerWidth}px` ,mt:10}}> {/* Added left margin */}
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>
            <Grid container spacing={3}>
                {stats.map((stat, index) => (
                    <Grid item xs={12} md={4} key={index}>
                        <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                            {stat.icon}
                            <Box sx={{ ml: 2 }}>
                                <Typography variant="h5">{stat.value} {stat.label}</Typography>
                                <Button size="small">View Details</Button>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Dashboard;
