const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
  userId: String,
  questionId: String,
  answer: String,
  score: Number
})

module.exports = mongoose.model('Answer', answerSchema);