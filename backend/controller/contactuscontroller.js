const mongoose = require('mongoose');
const contact = require('../models/contactusmodel');

// subject, message

exports.addContactUs = async (req, res) => {
    try {
        const { subject, message } = req.body;
        console.log("contact body", req.body);

        const contactUs = new contact({
            subject,
            message
        });

        await contactUs.save();
        res.status(201).json({ message: 'Contact Us created successfully', contactUs });
    } catch (error) {
        console.error('Error creating Contact Us:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ message: 'Server error' });
    }
};