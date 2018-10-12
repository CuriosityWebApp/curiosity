const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    email: String,
    rank: { type: Number, default: 0 },
    credit: { type: Number, default: 0 },
    avatarUrl: {
      type: String,
      default: 'https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Penguin-512.png',
    },
  },
  {
    timestamps: true,
  },
);
userSchema.index({ '$**': 'text' });

module.exports = mongoose.model('User', userSchema);
