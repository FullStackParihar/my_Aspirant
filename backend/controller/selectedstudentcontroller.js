const mongoose = require('mongoose');
const cloudinary = require('../config/cloudinary');
const SelectedStudent = require('../models/selectedstudentmodel');

// name, roll number
// photo, exam

exports.addSelectedStudent = async (req, res) => {
    try {
        const { name, rollnumber, exam } = req.body;

        if (!req.files || !req.files.image) {
            return res.status(400).json({ message: 'No image file uploaded' });
        }

        const imageFile = req.files.image;

        const result = await cloudinary.uploader.upload(imageFile.tempFilePath);
        const image = result.secure_url;

        const selectedStudent = new SelectedStudent({
            name,
            image,
            rollnumber,
            exam
        });

        await selectedStudent.save();
        res.status(201).json({ message: 'Selected student added successfully', selectedStudent });

    } catch (error) {
        console.error('Error adding selected student:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.getSelectedStudents = async (req, res) => {
    try {
        const selectedStudents = await SelectedStudent.find();
        res.status(200).json(selectedStudents);
    } catch (error) {
        console.error('Error fetching selected students:', error);
        res.status(500).json({ message: 'Server error' });
    }
};  
