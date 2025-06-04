 
const express = require('express');
const router = express.Router();
 
const  studentcontroller = require('../controller/studentcontroller');

router.post('/addstudent', studentcontroller.addStudent);
// router.get('/getstudents', studentcontroller.getStudents);
router.get('/getreviews', studentcontroller.getreviews);

module.exports = router;