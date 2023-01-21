var express = require('express');
var router = express.Router();
const AuthRepo = require('../controllers/authController');
const AccountController = require('../controllers/accountController');
const authUtil = require("../utils/authUtil");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { navLocation: 'Main' , docType:'index'  });
});

router.post('/login',AuthRepo.login);
router.get('/logout',AuthRepo.logout);


//dropped due to mongo foch
router.get('/register', AccountController.showCreateAccountForm);
//TODO: ogarnij te permit auth strict
router.get('/account/:kliID',authUtil.permitAuthenticatedStrict,AccountController.showDetailsAccountForm);
router.get('/account_edit/:kliID',authUtil.permitAuthenticatedStrict,AccountController.showEditAccountForm);



// router.post('/createAccount',);
// router.post('/editAccount',);
// router.delete('/deleteAccount/:kliID',)




module.exports = router;
