const {
    createUser,
} = require('../../db');

const express = require('express');
const app = express.Router();
const { isLoggedIn } = require('./middleware');

app.post('/', async(req, res, next)=> {
    try {
        res.send(await createUser(req.body));
    }
    catch(ex){
        next(ex);
    }
});

module.exports = app;