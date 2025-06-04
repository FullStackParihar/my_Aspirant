const mongoose = require('mongoose');
const Subcategory = require('../models/subcategorymodel');
const Category = require('../models/categorymodel');


// update addsubcategory to add categoryId with subcategory
exports.addSubcategory = async (req, res) => {
    try {
        const { title, categoryId } = req.body;
        console.log("subcat body ", req.body)

        const subcategory = await Subcategory.create({ title, category: categoryId });

        await Category.findByIdAndUpdate(categoryId, {
            $push: { subcategories: subcategory._id }
        });

        res.status(201).json({
            message: 'Subcategory added and linked to category',
            subcategory
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getSubcategories = async (req, res) => {
    try {
        const subcategories = await Subcategory.find() 
        res.status(200).json(subcategories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateSubcategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, category } = req.body;

        const subcategory = await Subcategory.findByIdAndUpdate(id, { title, category }, { new: true });

        if (!subcategory) {
            return res.status(404).json({ message: 'Subcategory not found' });
        }

        res.status(200).json({ message: 'Subcategory updated successfully', subcategory });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateSubcategoryStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const subcategory = await Subcategory.findByIdAndUpdate(id, { status }, { new: true });

        if (!subcategory) {
            return res.status(404).json({ message: 'Subcategory not found' });
        }

        res.status(200).json({ message: 'Subcategory status updated successfully', subcategory });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//get subcategories by category id
// exports.getSubcategoriesByCategory = async (req, res) => {
//     try {
//         const { categoryId } = req.params;

//         const subcategories = await Subcategory.find({ category: categoryId });
//         if (!subcategories || subcategories.length === 0) {
//             return res.status(404).json({ message: 'No subcategories found for this category' });
//         }
//         res.status(200).json(subcategories);
//     }
//     catch (err) {
//         console.error('Error fetching subcategories by category:', err);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };


exports.getSubcategoriesByCategory = async (req, res) => {
    try {
        const categoryId = req.params.categoryId; // explicitly
        console.log('categoryId param:', categoryId);

        const subcategories = await Subcategory.find({ category: categoryId });
        if (!subcategories || subcategories.length === 0) {
            return res.status(404).json({ message: 'No subcategories found for this category' });
        }
        res.status(200).json(subcategories);
    }
    catch (err) {
        console.error('Error fetching subcategories by category:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};



exports.getAllSubcategories = async (req, res) => {
    try {
        const subcategories = await Subcategory.find();
        res.status(200).json(subcategories);
    } catch (err) {
        console.error('Error fetching all subcategories:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};







exports.deleteSubcategory = async (req, res) => {
    try {
        const { id } = req.params;

        const subcategory = await Subcategory.findByIdAndDelete(id);
        if (!subcategory) {
            return res.status(404).json({ message: 'Subcategory not found' });
        }

        res.status(200).json({ message: 'Subcategory deleted successfully' });
    } catch (err) {
        console.error('Error deleting subcategory:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};