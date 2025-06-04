
 
const express = require('express');
const router = express.Router();
 
const notificationcontroller = require('../controller/notificationcontroller');

router.post('/addnotification', notificationcontroller.addNotification);
router.get('/getnotifications', notificationcontroller.getAllNotifications);
// router.put('/updatenotification/:id', notificationcontroller.updateNotification);
router.delete('/deletenotification/:id', notificationcontroller.deleteNotification);

module.exports = router;