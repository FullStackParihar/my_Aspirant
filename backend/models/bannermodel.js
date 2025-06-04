const mongoose = require('mongoose');
 

const BannerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  
  image: {
    type: String, 
    default: null,
  },
  
},{versionKey: false, timestamps: true});

module.exports = mongoose.model('Banner', BannerSchema);
