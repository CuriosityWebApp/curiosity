const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    email: String,
    rank: { type: Number, default: 0 },
    credit: { type: Number, default: 0 },
    favoriteTags: { type: [String], default: [], unique: true },
    avatarUrl: {
      type: String,
      default: 'https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Penguin-512.png',
    },
    vouch: { type: [String], default: [], unique: true },
  },
  {
    timestamps: true,
  },
);
userSchema.index({ '$**': 'text' });

module.exports = mongoose.model('User', userSchema);
