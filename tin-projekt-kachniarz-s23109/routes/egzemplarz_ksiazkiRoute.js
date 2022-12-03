const express = require('express');
const router = express.Router();

const egzemplarz_ksiazkiController = require('../controllers/Egzemplarz_ksiazkiController');


router.get('/' , egzemplarz_ksiazkiController.showKsiazkaList);
router.get('/add' , egzemplarz_ksiazkiController.showAddKsiazkaForm);
router.get('/details/:bookID' , egzemplarz_ksiazkiController.showKsiazkaDetails);
router.get('/edit/:bookID' , egzemplarz_ksiazkiController.showEditKsiazkaForm);

router.post('/add' , egzemplarz_ksiazkiController.addKsiazka);
router.post('/edit', egzemplarz_ksiazkiController.updateKsiazka);
router.get('/delete/:bookID', egzemplarz_ksiazkiController.deleteKsiazka);


module.exports = router;