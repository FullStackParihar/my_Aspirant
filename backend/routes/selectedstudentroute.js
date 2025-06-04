 
const express = require('express');
const router = express.Router();
 
const  selectedstudentcontroller = require('../controller/selectedstudentcontroller');

router.post('/addselectedstudent', selectedstudentcontroller.addSelectedStudent);
// router.get('/getstudents', selectedstudentcontroller.getStudents);
// router.get('/getreviews', selectedstudentcontroller.getreviews);
router.get('/getselectedstudents', selectedstudentcontroller.getSelectedStudents);
module.exports = router;