 
const express = require('express');
const router = express.Router();
 
const userController = require('../controller/categorycontroller');

router.post('/addcat', userController.addCategory);
router.get('/getcat', userController.getcat);
router.delete('/deletecat/:id', userController.deleteCategory);
// router.post('/addsubcat', userController.addSubcategory);
router.patch('/updatecat/:id', userController.updatecategory);
router.patch('/statusupdate/:id', userController.statusUpdate);


module.exports = router;