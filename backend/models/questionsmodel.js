// questions, option_a,option_b,option_c,option_d
// correct_ans, explaination

const mongoose = require('mongoose');
const Question = require('../models/questionsmodel');
 
const QuestionSchema = new mongoose.Schema({
  questions: { type: String, required: true },
  option_a: { type: String, required: true },
  option_b: { type: String, required: true },
  option_c: { type: String, required: true },
  option_d: { type: String, required: true },
  correct_ans: { type: String, required: true },
  explaination: { type: String, default: null },
}, { versionKey: false, timestamps: true });

module.exports = mongoose.model('Question', QuestionSchema);