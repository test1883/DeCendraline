const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  challengeDesc: {
    type: String,
  },
  createdAt: {
    type: Number,
    required: true,
  },
  isApproved: {
    type: Boolean,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  treeId: {
    type: Schema.Types.ObjectId,
    ref: "Tree",
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  images: {
    type: [String],
    required: true,
  },
  likes: {
    type: [{ type: Schema.Types.ObjectId, ref: "User", unique: true }],
    required: true,
  },
});
module.exports = mongoose.model("Post", postSchema);
