const express = require('express');

// import our modular routers for /tips and /feedback
const notes = require('./notes');

const app = express();

app.use('/notes', notes);

module.exports = app;