const express = require('express');
const router = express.Router();

const egzemplarz_ksiazkiController = require('../controllers/Egzemplarz_ksiazkiController');
const klientController = require("../controllers/klientController");

router.get('/' , egzemplarz_ksiazkiController.showKsiazkaList);
router.get('/add' , egzemplarz_ksiazkiController.showAddKsiazkaForm);
router.get('/details/:bookID' , egzemplarz_ksiazkiController.showKsiazkaDetails);



module.exports = router;