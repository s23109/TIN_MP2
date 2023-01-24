const express = require('express');
const router = express.Router();

const wypozyczenieController = require('../controllers/wypozyczenieController');
const authUtil = require('../utils/authUtil');

router.get('/' ,wypozyczenieController.showWypozyczenieList);
router.get('/add',authUtil.permitOnlyAdmin,wypozyczenieController.showAddWypozyczenieForm);
router.get('/details/:lendID',authUtil.permitOnlyAdmin,wypozyczenieController.showWypozyczenieDetails);
router.get('/edit/:lendID' ,authUtil.permitOnlyAdmin, wypozyczenieController.showEditWypozyczenieForm);

router.post('/add' ,authUtil.permitOnlyAdmin, wypozyczenieController.addWypozyczenie);
router.post('/edit',authUtil.permitOnlyAdmin, wypozyczenieController.updateWypozyczenie);
router.get('/delete/:lendID',authUtil.permitOnlyAdmin,wypozyczenieController.deleteWypozyczenie);


module.exports = router;