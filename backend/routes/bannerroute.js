 
const express = require('express');
const router = express.Router();
 
const bannercontroller = require('../controller/bannercontroller');

router.post('/addbanner', bannercontroller.addBanner);
router.get('/getbanner', bannercontroller.getbanner);
router.get('/getonebanner/:id', bannercontroller.getonebanner);
router.delete('/deletebanner/:id', bannercontroller.deleteBanner);

module.exports = router;