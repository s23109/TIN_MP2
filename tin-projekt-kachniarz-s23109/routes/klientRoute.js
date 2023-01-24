const express = require('express');
const router = express.Router();

const klientController = require('../controllers/klientController')
const authUtil = require('../utils/authUtil');


//routowanie na dane ,,podstrony
router.get('/',authUtil.permitOnlyAdmin,klientController.showKlientList);
router.get('/add' ,authUtil.permitOnlyAdmin, klientController.showAddKlientForm);
//tu z tzw ,,path param'' - kliID który będzie potem czytany
router.get('/details/:kliID',authUtil.permitAuthenticatedStrict,klientController.showKlientDetails);
router.get('/edit/:kliID',authUtil.permitAuthenticatedStrict, klientController.showEditKlientForm);

//tu permit only admin bo klient dane wbija via account
router.post('/add' , authUtil.permitOnlyAdmin,klientController.addKlient);
router.post('/edit' , authUtil.permitAuthenticatedStrictViaBodyKlient,klientController.updateKlient);
router.get('/delete/:kliID',authUtil.permitAuthenticatedStrict , klientController.deleteKlient);

//eksport routera jako obiektu
module.exports = router;
