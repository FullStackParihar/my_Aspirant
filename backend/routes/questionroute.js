 
const express = require('express');
const router = express.Router();
 
const  questioncontroller = require('../controller/qusetionscontroller');

router.post('/addquestion', questioncontroller.addQuestion);
router.get('/getallquestions', questioncontroller.getAllQuestions);
// router.put('/updatequestion/:id', questioncontroller.updateQuestion);
router.delete('/deletequestion/:id', questioncontroller.deleteQuestion);
router.put('/updatequestion/:id', questioncontroller.updateQuestion);

module.exports = router;