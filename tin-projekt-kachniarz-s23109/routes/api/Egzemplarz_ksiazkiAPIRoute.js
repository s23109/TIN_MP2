const express = require('express');
const router = express.Router();

const Egzemplarz_APIController = require('../../api/Egzemplarz_ksiazkiAPI');

router.get('/' , Egzemplarz_APIController.getAllEgzemplarz_ksiazki);
router.get('/:bookID',Egzemplarz_APIController.getEgzemplarz_ksiazkiByID);

router.post('/', Egzemplarz_APIController.createEgzemplarz_ksiazki);
router.put('/:bookID', Egzemplarz_APIController.updateEgzemplarz_ksiazki);

router.delete('/:bookID' , Egzemplarz_APIController.deleteEgzemplarz_ksiazki);

module.exports = router;