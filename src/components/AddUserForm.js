import React, { useState } from 'react';
import { TextField, Button, Box, MenuItem, Typography, Alert } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const roles = [
    { value: 'admin', label: 'Admin' },
    { value: 'user', label: 'User' },
];

const AddUserForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [users, setUsers] = useState([
        // Initial data, could be fetched from an API
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
    ]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simple validation
        if (!formData.name || !formData.email || !formData.role || !formData.password) {
            setError('All fields are required.');
            return;
        }

        // Reset error and success state
        setError('');
        setSuccess(true);

        // Add new user to the users state
        const newUser = {
            id: users.length + 1,  // Simple ID increment, should use a better ID generation in production
            name: formData.name,
            email: formData.email,
            role: formData.role,
        };
        setUsers([...users, newUser]);

        // Reset form after submission
        setFormData({
            name: '',
            email: '',
            role: '',
            password: '',
        });

        // Hide success message after 3 seconds
        setTimeout(() => setSuccess(false), 3000);
    };

    // Define columns for the DataGrid
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'role', headerName: 'Role', width: 100 },
    ];

    return (
        <Box sx={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <Typography variant="h5" component="h2" align="center" gutterBottom>
                Add New User
            </Typography>

            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">User added successfully!</Alert>}

            <Box sx={{ mb: 3 }}>
                <TextField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                />
                <TextField
                    label="Role"
                    name="role"
                    select
                    value={formData.role}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                >
                    {roles.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleSubmit}
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Add User
                </Button>
            </Box>

            <Typography variant="h6" component="h3" gutterBottom>
                Registered Users
            </Typography>
            <div style={{ height: 300, width: '100%' }}>
                <DataGrid
                    rows={users}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                />
            </div>
        </Box>
    );
};

export default AddUserForm;
