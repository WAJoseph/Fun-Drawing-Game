const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const getLogin = (req, res) => {
  res.render('login', {message : null});
};

const postLogin = async (req, res) => {
  const { email, password } = req.body;
  
  // Authenticate user
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).send('Invalid email or password');
      return;
    }
    
    // If authentication is successful, create access and refresh tokens
    const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET);
    
    // Store access token in session
    req.session.accessToken = accessToken;
    
    // Store refresh token in database
    user.refreshToken = refreshToken;
    await user.save();
    
    res.render('game',{message: null})
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getLogin,
  postLogin
};