 
 

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  
},{ versionKey: false, timestamps: true });

module.exports = mongoose.model('User', UserSchema);