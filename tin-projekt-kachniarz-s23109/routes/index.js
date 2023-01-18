var express = require('express');
var router = express.Router();
const AuthRepo = require('../controllers/authController');
const AccountController = require('../controllers/accountController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { navLocation: 'Main' , docType:'index'  });
});

router.post('/login',AuthRepo.login);
router.get('/logout',AuthRepo.logout);
router.get('/register', );




module.exports = router;
