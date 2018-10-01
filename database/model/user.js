const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  rank: {type: Number, default: 0},
  credit: {type: Number, default: 0}
},
  {
    timestamps: true
  }
)

module.exports = mongoose.model('User', userSchema);