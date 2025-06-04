 
const express = require('express');
const router = express.Router();
 
const  testcontroller = require('../controller/testcontroller');

router.post('/addtest', testcontroller.addtest);
router.get('/getalltests', testcontroller.getalltests);
router.patch('/updatetest/:id', testcontroller.updatetest);
// router.get('/gettests', testcontroller.getTests);
// router.get('/getreviews', testcontroller.getreviews);

module.exports = router;