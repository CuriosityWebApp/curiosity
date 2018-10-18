const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    userId: String,
    questionTitle: String,
    questionContent: String,
    category: String,
    bounty: Number,
    bountyPaid: { type: Boolean, default: false },
    restriction: { type: Number, default: 0 },
    tags: [String],
    views: { type: Number, default: 0 },
    score: { type: Number, default: 0 },
    ratedUpBy: { type: [String], default: [] },
    ratedDownBy: { type: [String], default: [] },
  },
  {
    timestamps: true,
  },
);

questionSchema.index({ '$**': 'text' });

module.exports = mongoose.model('Question', questionSchema);
