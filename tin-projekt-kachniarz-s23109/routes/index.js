var express = require('express');
var router = express.Router();
const AuthRepo = require('../controllers/authController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { navLocation: 'Main' , docType:'index'  });
});

router.post('/login',AuthRepo.login);
router.get('/logout',AuthRepo.logout);
router.get('/register', function (req,res,next) {
  res.render('Subpages/Account/register_form',{
    navLocation:'Register' ,
    docType:'form',
    kli: {},
    formMode: 'createNew',
    btnLabel: 'Dodaj',
    formAction: '/klient/add',
    pageTitle: 'Utwórz Konto',
    validationErrors:[]
  })
})


module.exports = router;
