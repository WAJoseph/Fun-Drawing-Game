const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const getRegister = (req, res) => {
  res.render('register', { message: null });
};

const postRegister = async (req, res) => {
  const { name, email, password } = req.body;
  
  // Register user
  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = new User({ name, email, password: hashedPassword });
    
    // Create refresh token
    const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET);
    user.refreshToken = refreshToken;
    
    // Save user
    await user.save();
    
    res.render('login', {message: null})
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

module.exports = {
    getRegister,
    postRegister
};