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
      default: 'http://blog.debiase.com/wp-content/blogs.dir/8328/files/2017/06/mars.jpg',
    },
    vouch: { type: [String], default: [], unique: true },
  },
  {
    timestamps: true,
  },
);
userSchema.index({ '$**': 'text' });

module.exports = mongoose.model('User', userSchema);
