const mongoose = require('mongoose');
const notification = require('../models/notificationmodel');
const cloudinary = require('../config/cloudinary');

 
//addNotification with title, message, image image using cloudinary
exports.addNotification = async (req, res) => {
    try {
        const { title, message, image } = req.body;
        console.log("notification body", req.body);

        const existing = await notification.findOne({ title });
        if (existing) {
            return res.status(409).json({ message: 'Notification already exists' });
        }
        let imageUrl = null;
        if (req.files && req.files.image) {
            const file = req.files.image;
            const result = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'notifications',
                transformation: [
                    { width: 500, height: 500, crop: 'limit' },
                ],
            });
            imageUrl = result.secure_url;
        }
        const newNotification = new notification({ title, message, image: imageUrl });
        await newNotification.save();
        res.status(201).json({ message: 'Notification added successfully', notification: newNotification });
    } catch (error) {
        console.error('Error adding notification:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};





 






exports.getAllNotifications = async (req, res) => {
    try {
        const notifications = await notification.find();
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
// exports.updateNotification = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { title, message, image } = req.body;

//         const updatedNotification = await notification.findByIdAndUpdate(id, { title, message, image }, { new: true });

//         if (!updatedNotification) {
//             return res.status(404).json({ message: 'Notification not found' });
//         }

//         res.status(200).json({ message: 'Notification updated successfully', notification: updatedNotification });
//     } catch (error) {
//         console.error('Error updating notification:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };
exports.deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedNotification = await notification.findByIdAndDelete(id);

        if (!deletedNotification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (error) {
        console.error('Error deleting notification:', error);
        res.status(500).json({ message: 'Server error' });
    }
};