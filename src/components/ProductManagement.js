import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const categories = ['Electronics', 'Clothing', 'Books', 'Home & Kitchen'];

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null); // Track the product being edited
  
  const initialValues = {
    name: '',
    description: '',
    price: '',
    category: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Product name is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number()
      .required('Price is required')
      .positive('Price must be a positive number'),
    category: Yup.string().required('Category is required'),
  });

  const handleSubmit = (values, { resetForm }) => {
    if (currentProduct) {
      // Update existing product
      setProducts(
        products.map((product) =>
          product.id === currentProduct.id ? { ...values, id: currentProduct.id } : product
        )
      );
      setCurrentProduct(null); // Clear the edit mode
    } else {
      // Add new product
      setProducts([...products, { ...values, id: Date.now() }]);
    }
    resetForm();
  };

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Product Management
        </Typography>
        <Formik
          initialValues={currentProduct || initialValues}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, values, errors, touched }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="name"
                    label="Product Name"
                    fullWidth
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    error={Boolean(errors.name) && touched.name}
                    helperText={<ErrorMessage name="name" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="description"
                    label="Description"
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={4}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    error={Boolean(errors.description) && touched.description}
                    helperText={<ErrorMessage name="description" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="price"
                    label="Price"
                    type="number"
                    fullWidth
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price}
                    error={Boolean(errors.price) && touched.price}
                    helperText={<ErrorMessage name="price" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="category-label">Category</InputLabel>
                    <Field
                      as={Select}
                      name="category"
                      label="Category"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.category}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {categories.map((cat) => (
                        <MenuItem key={cat} value={cat}>
                          {cat}
                        </MenuItem>
                      ))}
                    </Field>
                    <ErrorMessage name="category" component="div" style={{ color: 'red' }} />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    {currentProduct ? 'Update Product' : 'Add Product'}
                  </Button>
                  {currentProduct && (
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        setCurrentProduct(null); // Clear the current product on cancel
                      }}
                      style={{ marginLeft: 10,marginTop:10 }}
                    >
                      Cancel
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>

        {/* Products Table */}
        <Typography variant="h5" component="h2" gutterBottom style={{ marginTop: 20 }}>
          Products List
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(product.id)}
                      style={{ marginLeft: 10 }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default ProductManagement;
