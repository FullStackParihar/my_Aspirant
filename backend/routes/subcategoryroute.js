 
const express = require('express');
const router = express.Router();
 
const subcategorycontroller = require('../controller/subcategorycontroller');

router.get('/getsubcat', subcategorycontroller.getSubcategories);
router.post('/addsubcat', subcategorycontroller.addSubcategory);
router.patch('/updatesubcat/:id', subcategorycontroller.updateSubcategory);
router.patch('/statusupdatesub/:id', subcategorycontroller.updateSubcategoryStatus);
//get one subcategory by category id
router.get('/getbysubcat/:categoryId', subcategorycontroller.getSubcategoriesByCategory);
router.delete('/deletesubcat/:id', subcategorycontroller.deleteSubcategory);
router.get('/getallsubcat', subcategorycontroller.getAllSubcategories);

module.exports = router;