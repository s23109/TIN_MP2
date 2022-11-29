const express = require('express');
const router = express.Router();

const Wypozyczenia_APIController = require('../../api/WypozyczenieAPI');

router.get('/', Wypozyczenia_APIController.getAllWypozyczenie);
router.get('/:lendID' , Wypozyczenia_APIController.getWypozyczenieByID);

router.post('/' , Wypozyczenia_APIController.createWypozyczenie);

router.put('/:lendID' , Wypozyczenia_APIController.updateWypozyczenie);

router.delete('/:lendID', Wypozyczenia_APIController.deleteWypozyczenie);

// nie podpięta metoda usuwająca wiele obiektów



module.exports = router;