// image, title,message

const mongoose = require('mongoose')

const NotificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  image: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
}, { versionKey: false, timestamps: true })
module.exports = mongoose.model('Notification', NotificationSchema)