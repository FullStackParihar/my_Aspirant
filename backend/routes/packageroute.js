 
const express = require('express');
const router = express.Router();
 
const packagecontroller = require('../controller/packagecontroller');

router.post('/addpackage', packagecontroller.addPackage);
router.get('/getpackage', packagecontroller.getPackage);
router.patch('/updatepackage/:id', packagecontroller.updatePackage);
router.patch('/statusupdatepackage/:id', packagecontroller.updatePackageStatus);
router.delete('/deletepackage/:id', packagecontroller.deletePackage);
router.get('/getonepackage/:id', packagecontroller.getPackageById);

module.exports = router;