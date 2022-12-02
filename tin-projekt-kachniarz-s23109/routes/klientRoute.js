const express = require('express');
const router = express.Router();

const klientController = require('../controllers/klientController');

//routowanie na dane ,,podstrony
router.get('/',klientController.showKlientList);
router.get('/add' , klientController.showAddKlientForm);
//tu z tzw ,,path param'' - kliID który będzie potem czytany
router.get('/details/:kliID',klientController.showKlientDetails);
router.get('/edit/:kliID', klientController.showEditKlientForm);

//eksport routera jako obiektu
module.exports = router;
