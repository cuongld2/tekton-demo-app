const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const PostSchema = new Schema({
  _id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
