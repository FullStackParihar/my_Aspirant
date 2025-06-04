const mongoose = require('mongoose');
 

const CategorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  subcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory' }],
  createdAt: {
    type: Date,  
    default: Date.now,
  },
  updatedAt: {
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

module.exports = mongoose.model('Category', CategorySchema);
 