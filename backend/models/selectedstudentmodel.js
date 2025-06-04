
const mongoose = require('mongoose');

const selectedStudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  rollnumber: { type: String, required: true },
  exam: { type: String, required: true },
},{ versionKey: false, timestamps: true });

module.exports = mongoose.model('SelectedStudent', selectedStudentSchema);
