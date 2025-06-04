const Category = require('../models/categorymodel');
const Subcategory = require('../models/subcategorymodel')
const cloudinary = require('../config/cloudinary');

exports.getcat = async (req, res) => {
    try {
        const categories = await Category.find().populate({
            path: 'subcategories',
            model: 'Subcategory'
        });
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        
        await Subcategory.deleteMany({ category: id });

        if (category.image) {
            const publicId = category.image.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`categories/${publicId}`);
        }

        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.addCategory = async (req, res) => {
    try {
        const { title, status } = req.body;
        console.log("category body", req.body)


        const existing = await Category.findOne({ title });
        if (existing) {
            return res.status(409).json({ message: 'Category already exists' });
        }

        let imageUrl = null;

        if (req.files && req.files.image) {
            const file = req.files.image;


            const result = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'categories',
                transformation: [
                    { width: 500, height: 500, crop: 'limit' },
                ],
            });

            imageUrl = result.secure_url;
        }


        const category = new Category({ title, status, image: imageUrl });
        await category.save();



        res.status(201).json({ message: 'Category added successfully', category });
    } catch (error) {
        console.error('Error adding category:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updatecategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;

        const category = await Category.findByIdAndUpdate(id, { title }, { new: true });

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ message: 'Category updated successfully', category });
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.statusUpdate = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const category = await Category.findByIdAndUpdate(id, { status }, { new: true });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category status updated successfully', category });
    }
    catch (error) {
        console.error('Error updating category status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}