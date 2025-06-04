const mongoose = require('mongoose');

const SubCategorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },

}, { versionKey: false, timestamps: true });

module.exports = mongoose.model('Subcategory', SubCategorySchema);
