const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
  // Check if access token is in session
  const accessToken = req.session.accessToken;
  if (!accessToken) {
    res.render('register', { message: 'No access token found' });
    return;
  }
  
  // Verify access token
  try {
    const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).send('Invalid access token');
  }
};

module.exports = {checkAuth}