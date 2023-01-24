var express = require('express');
var router = express.Router();
const AuthRepo = require('../controllers/authController');
const AccountController = require('../controllers/accountController');
const authUtil = require("../utils/authUtil");
const LangController = require('../controllers/LangController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { navLocation: 'Main' , docType:'index'  });
});

router.post('/login',AuthRepo.login);
router.get('/logout',AuthRepo.logout);
router.get('/changeLang/:lang',LangController.changeLang);


router.get('/register', AccountController.showCreateAccountForm);
router.get('/account/:kliID',authUtil.permitAuthenticatedStrict,AccountController.showDetailsAccountForm);
router.get('/account_edit/:kliID',authUtil.permitAuthenticatedStrict,AccountController.showEditAccountForm);

router.get('/accountList',AccountController.getAccList);

router.post('/createAccount',AccountController.addAccount);
router.post('/editAccount/:kliID',authUtil.permitAuthenticatedStrict,AccountController.editAccount);
router.get('/deleteAccount/:kliID',authUtil.permitAuthenticatedStrict,AccountController.deleteAccount)

router.get('/accessDenied', function(req, res, next) {
  res.render('accessDenied', {} );
});


module.exports = router;
