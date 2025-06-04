

const Package = require('../models/packagemodel');
const cloudinary = require('../config/cloudinary');

exports.getPackage = async (req, res) => {
    try {
        const packages = await Package.find();
        res.status(200).json(packages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addPackage = async (req, res) => {
    try {
        const { title, description, price } = req.body;
        console.log("package body", req.body)

        const existing = await Package.findOne({ title });
        if (existing) {
            return res.status(409).json({ message: 'Package already exists' });
        }

        let imageUrl = null;

        if (req.files && req.files.image) {
            const file = req.files.image;

            const result = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'packages',
                transformation: [
                    { width: 500, height: 500, crop: 'limit' },
                ],
            });

            imageUrl = result.secure_url;
        }

        const package = new Package({ title, description, price, image: imageUrl });
        await package.save();

        res.status(201).json({ message: 'Package added successfully', package });
    } catch (error) {
        console.error('Error adding package:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.updatePackage = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, price } = req.body;

        const package = await Package.findByIdAndUpdate(id, { title, description, price }, { new: true });

        if (!package) {
            return res.status(404).json({ message: 'Package not found' });
        }

        res.status(200).json({ message: 'Package updated successfully', package });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.updatePackageStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const package = await Package.findByIdAndUpdate(id, { status }, { new: true });
        if (!package) {
            return res.status(404).json({ message: 'Package not found' });
        }
        res.status(200).json({ message: 'Package status updated successfully', package });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deletePackage = async (req, res) => {
    try {
        const { id } = req.params;

        const package = await Package.findByIdAndDelete(id);
        if (!package) {
            return res.status(404).json({ message: 'Package not found' });
        }
        if (package.image) {
            const publicId = package.image.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`packages/${publicId}`);
        }
        res.status(200).json({ message: 'Package deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting package:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
exports.getPackageById = async (req, res) => {
    try {
        const { id } = req.params;
        const package = await Package.findById(id);
        if (!package) {
            return res.status(404).json({ message: 'Package not found' });
        }
        res.status(200).json(package);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}
