// review 
// name,
// student_photo,
// student_desc,
// rating

const mongoose = require('mongoose');
const Student = require('../models/studentmodel');
const cloudinary = require('../config/cloudinary');




exports.addStudent = async (req, res) => {
    try {
        const { name, student_desc, rating, review } = req.body;


        if (!req.files || !req.files.image) {
            return res.status(400).json({ message: 'No image file uploaded' });
        }

        const imageFile = req.files.image;


        const result = await cloudinary.uploader.upload(imageFile.tempFilePath);
        const image = result.secure_url;

        const student = new Student({
            name,
            image,
            student_desc,
            rating,
            review
        });

        await student.save();
        res.status(201).json({ message: 'Student added successfully', student });

    } catch (error) {
        console.error('Error adding student:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

 
exports.getreviews = async (req, res) => {
    try {
        const reviews = await Student.find();
        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ message: 'Server error' });
    }
};