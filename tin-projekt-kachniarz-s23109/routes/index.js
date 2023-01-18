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

/*
//dropped due to mongo foch
router.get('/register', AccountController.showCreateAccountForm);
//non safe
router.get('/account/:kliID',AccountController.showDetailsAccountForm);
router.get('/account_edit/:kliID',AccountController.showEditAccountForm);

*/

// router.post('/createAccount',);
// router.post('/editAccount',);
// router.delete('/deleteAccount/:kliID',)




module.exports = router;
