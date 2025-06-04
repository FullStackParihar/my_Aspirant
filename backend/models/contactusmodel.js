const mongoose = require('mongoose');

const contactUsSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  message: { type: String, required: true },
 
},{ versionKey: false, timestamps: true });

module.exports = mongoose.model('ContactUs', contactUsSchema); 