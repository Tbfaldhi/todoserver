const express = require('express');
const router = express.Router();
const { register, login, loginfb } = require('../controller/user.controller')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register',register)
router.post('/login',login)
router.post('/loginfb',loginfb)

module.exports = router;
