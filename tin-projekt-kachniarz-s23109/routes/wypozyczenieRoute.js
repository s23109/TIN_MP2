const express = require('express');
const router = express.Router();

const wypozyczenieController = require('../controllers/wypozyczenieController');

router.get('/' ,wypozyczenieController.showWypozyczenieList);
router.get('/add',wypozyczenieController.showAddWypozyczenieForm);
router.get('/details/:lendID',wypozyczenieController.showAddWypozyczenieForm);


module.exports = router;