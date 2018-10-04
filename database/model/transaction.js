const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    questionId: String,
    senderId: String,
    receiverId: String,
    amount: Number,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Transaction', transactionSchema);
