
const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');

router.post('/signup', userController.signup);
router.post('/verifyOtp', userController.verifyOtp);
router.post('/login', userController.login);
router.get('/getusers', userController.getusers);

//----------------profile----------------
router.get('/getuser/:id', userController.getuserprofile);
router.patch('/updateUserProfile/:id', userController.updateUserProfile);

module.exports = router;