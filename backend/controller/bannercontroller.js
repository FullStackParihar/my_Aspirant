

const Banner = require('../models/bannermodel');
const cloudinary = require('../config/cloudinary');

exports.getbanner = async (req, res) => {
    try {
        const banners = await Banner.find();
        res.status(200).json(banners);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getonebanner = async (req, res) => {
    try {
        const { id } = req.params;
        const banner = await Banner.findById(id);
        if (!banner) {
            return res.status(404).json({ message: 'Banner not found' });
        }
        res.status(200).json(banner);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.deleteBanner = async (req, res) => {
    try {
        const { id } = req.params;

        const banner = await Banner.findByIdAndDelete(id);
        if (!banner) {
            return res.status(404).json({ message: 'Banner not found' });
        }

       if (banner.image) {
           const publicId = banner.image.split('/').pop().split('.')[0];
           await cloudinary.uploader.destroy(`banners/${publicId}`);
       }

       res.status(200).json({ message: 'Banner deleted successfully' });
   } catch (error) {
       console.error('Error deleting banner:', error);
       res.status(500).json({ message: 'Internal server error' });
   }
}

exports.addBanner = async (req, res) => {
    try {
        const { name } = req.body;
        console.log("banner body", req.body)

        const existing = await Banner.findOne({ name });
        if (existing) {
            return res.status(409).json({ message: 'Banner already exists' });
        }

        let imageUrl = null;

        if (req.files && req.files.image) {
            const file = req.files.image;

            const result = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'banners',
                transformation: [
                    { width: 500, height: 500, crop: 'limit' },
                ],
            });

            imageUrl = result.secure_url;
        }

        const banner = new Banner({ name, image: imageUrl });
        await banner.save();

        res.status(201).json({ message: 'Banner added successfully', banner });
    } catch (error) {
        console.error('Error adding banner:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
