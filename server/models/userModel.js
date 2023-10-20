const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  about: {
    type: String,
  },
  address: {
    type: String,
    required: true,
    unique: true,
  },
  currentChallenge: {
    challengeType: {
      type: String,
      enum: ["indoor", "outdoor", "explore"],
    },
    duration: {
      type: Number,
    },
    difficulty: {
      type: String,
      enum: ["very easy", "easy", "medium", "hard", "very hard", "extreme"],
    },
    acceptedAt: {
      type: Number,
    },
    place: {
      type: String,
    },
    description: {
      type: String,
    },
  },
});
module.exports = mongoose.model("User", userSchema);
