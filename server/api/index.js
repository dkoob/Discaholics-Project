const express = require('express');
const app = express.Router();
const { isLoggedIn, isAdmin } = require('./components/middleware');

app.use('/products', require('./components/products'));
app.use('/', require('./components/auth'));
app.use('/orders', require('./components/orders'));
app.use('/lineItems', require('./components/lineItems'));
app.use('/users', require('./components/users'));

module.exports = app;
