const mongoose = require('mongoose');

const QuestionAnswerSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const QuestionAnswer = mongoose.model('QuestionAnswer', QuestionAnswerSchema);
module.exports = QuestionAnswer;
