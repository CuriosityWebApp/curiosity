const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  userId: String,
  question: String,
  category: String,
  bounty: Number,
  bountyPaid: Boolean,
  restriction: Number,
  tags: [String]
})

module.exports = mongoose.model('Question', questionSchema);