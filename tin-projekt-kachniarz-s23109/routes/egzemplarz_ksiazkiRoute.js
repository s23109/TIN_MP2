const express = require('express');
const router = express.Router();

const egzemplarz_ksiazkiController = require('../controllers/Egzemplarz_ksiazkiController');
const authUtil = require('../utils/authUtil');

router.get('/' , egzemplarz_ksiazkiController.showKsiazkaList);
router.get('/add' ,authUtil.permitOnlyAdmin , egzemplarz_ksiazkiController.showAddKsiazkaForm);
router.get('/details/:bookID' ,authUtil.permitOnlyAdmin, egzemplarz_ksiazkiController.showKsiazkaDetails);
router.get('/edit/:bookID' ,authUtil.permitOnlyAdmin, egzemplarz_ksiazkiController.showEditKsiazkaForm);

router.post('/add' , authUtil.permitOnlyAdmin,egzemplarz_ksiazkiController.addKsiazka);
router.post('/edit', authUtil.permitOnlyAdmin,egzemplarz_ksiazkiController.updateKsiazka);
router.get('/delete/:bookID', authUtil.permitOnlyAdmin,egzemplarz_ksiazkiController.deleteKsiazka);


module.exports = router;