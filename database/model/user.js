const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId: String,
  username: String,
  rank: Number,
  credit: Number
})

module.exports = mongoose.model('User', userSchema);