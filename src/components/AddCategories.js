import React, { useState } from 'react';
import { Box, TextField, Button, Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [error, setError] = useState('');

    const handleAddCategory = () => {
        if (!categoryName.trim()) {
            setError('Category name is required');
            return;
        }

        if (!categoryDescription.trim()) {
            setError('Category description is required');
            return;
        }

        if (editingIndex !== null) {
            const updatedCategories = categories.map((category, index) =>
                index === editingIndex ? { name: categoryName, description: categoryDescription } : category
            );
            setCategories(updatedCategories);
            setEditingIndex(null);
        } else {
            setCategories([...categories, { name: categoryName, description: categoryDescription }]);
        }

        setCategoryName('');
        setCategoryDescription('');
        setError('');
    };

    const handleEditCategory = (index) => {
        setEditingIndex(index);
        setCategoryName(categories[index].name);
        setCategoryDescription(categories[index].description);
    };

    const handleDeleteCategory = (index) => {
        const updatedCategories = categories.filter((_, i) => i !== index);
        setCategories(updatedCategories);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Manage Categories
            </Typography>
            <Paper sx={{ p: 3, mb: 4 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <TextField
                            fullWidth
                            label="Category Name"
                            variant="outlined"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            error={!!error && !categoryName.trim()}
                            helperText={error && !categoryName.trim() ? 'Category name is required' : ''}
                        />
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <TextField
                            fullWidth
                            label="Category Description"
                            variant="outlined"
                            value={categoryDescription}
                            onChange={(e) => setCategoryDescription(e.target.value)}
                            error={!!error && !categoryDescription.trim()}
                            helperText={error && !categoryDescription.trim() ? 'Category description is required' : ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleAddCategory}
                            sx={{ mt: 2 }}
                        >
                            {editingIndex !== null ? 'Update Category' : 'Add Category'}
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            <Typography variant="h5" gutterBottom>
                Categories List
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map((category, index) => (
                            <TableRow key={index}>
                                <TableCell>{category.name}</TableCell>
                                <TableCell>{category.description}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => handleEditCategory(index)}>
                                        <EditIcon color="primary" />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteCategory(index)}>
                                        <DeleteIcon color="error" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default Categories;
