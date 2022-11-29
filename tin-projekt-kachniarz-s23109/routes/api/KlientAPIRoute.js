const express = require('express');
const router = express.Router();

const kliApiController = require('../../api/KlientAPI');

router.get('/' , kliApiController.getAllKlient);
router.get('/:kliID' , kliApiController.getKlientByID);

// Post - create
// Put - update
router.post('/' , kliApiController.createKlient);
router.put('/:kliID' , kliApiController.updateKlient);

router.delete('/:kliID' , kliApiController.deleteKlient);

module.exports = router;