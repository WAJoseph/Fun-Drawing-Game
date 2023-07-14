const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

router.get('/login', loginController.getLogin);
router.post('/login', loginController.postLogin);

module.exports = router;