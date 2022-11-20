const express = require('express');
const router = express.Router();

const klientController = require('../controllers/klientController');

//routowanie na dane ,,podstrony
router.get('/',klientController.showKlientList);
router.get('/add' , klientController.showAddKlientForm);
//tu z tzw ,,path param'' - empID który będzie potem czytany
router.get('/details/:empId',klientController.showKlientDetails);

//eksport routera jako obiektu
module.exports = router;
