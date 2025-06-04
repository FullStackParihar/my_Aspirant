const mongoose = require('mongoose');


const PackageSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },
    image: {
        type: String,
        default: null,
    },

},{ versionKey: false, timestamps: true });

module.exports = mongoose.model('Package', PackageSchema);
