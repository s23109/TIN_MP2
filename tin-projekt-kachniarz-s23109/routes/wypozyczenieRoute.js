const express = require('express');
const router = express.Router();

const wypozyczenieController = require('../controllers/wypozyczenieController');

router.get('/' ,wypozyczenieController.showWypozyczenieList);
router.get('/add',wypozyczenieController.showAddWypozyczenieForm);
router.get('/details/:lendID',wypozyczenieController.showWypozyczenieDetails);
router.get('/edit/:lendID' , wypozyczenieController.showEditWypozyczenieForm);

router.post('/add' , wypozyczenieController.addWypozyczenie);
router.post('/edit', wypozyczenieController.updateWypozyczenie);
router.delete('/delete/:lendID',wypozyczenieController.deleteWypozyczenie);


module.exports = router;