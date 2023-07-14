const express = require('express');
const router = express.Router();
const { checkAuth } = require('../middlewares/auth');

router.get('/game', checkAuth, (req, res) => {
  res.render('game');
});

module.exports = router;