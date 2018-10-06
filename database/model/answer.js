const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const answerSchema = new Schema(
  {
    userId: String,
    questionId: String,
    answer: String,
    score: { type: Number, default: 0 },
    answerChosen: Boolean
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Answer', answerSchema);
