 
const express = require('express');
const router = express.Router();
 
const contactuscontroller = require('../controller/contactuscontroller');

router.post('/addcontactus', contactuscontroller.addContactUs);
router.get('/getcontactus', contactuscontroller.getAllContacts);

module.exports = router;