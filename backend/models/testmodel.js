const { default: mongoose } = require('mongoose');
const mondgoose = require('mongoose')

const TestSchema = new mondgoose.Schema({
    //  title, questions,duration, marks, positive mark
    // negative mark, package id, free or paid,
    // descriptions
    title: { type: String, required: true },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    duration: { type: Number, required: true },
    marks: { type: Number, required: true },
    positiveMark: { type: Number, default: 1 },
    negativeMark: { type: Number, default: 0 },
    packageId: { type: mondgoose.Schema.Types.ObjectId, ref: 'Package', required: true },
    isFree: { type: Boolean, default: false },
    description: { type: String, default: '' },
}, { versionKey: false, timestamps: true });
module.exports = mondgoose.model('Test', TestSchema);