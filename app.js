const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');

// Load environment variables
require('dotenv').config();

const app = express();

// Set up Mongoose connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use('/css', express.static(path.join(__dirname, 'node_modules' , 'bootstrap', 'dist', 'css')))


// Routes
app.use('/', require('./routes/game'));
app.use('/', require('./routes/logout'));
app.use('/', require('./routes/login'));
app.use('/', require('./routes/register'));
app.use('/', require('./routes/index'));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));