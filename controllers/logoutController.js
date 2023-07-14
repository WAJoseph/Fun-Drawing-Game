exports.getLogout = (req, res) => {
    // Delete access token from session
    delete req.session.accessToken;
    // Redirect to login page
    res.redirect('/login');
  };