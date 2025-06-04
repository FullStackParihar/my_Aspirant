// review 
// name,
// student_photo,
// student_desc,
// rating

const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  student_desc: { type: String, required: true },
  rating: { type: Number, required: true },
  review: { type: String, required: true },
},{ versionKey: false, timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);
