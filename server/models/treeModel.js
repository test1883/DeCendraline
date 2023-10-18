const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const treeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  place: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  plantedAt: {
    type: Number,
    required: true,
  },
  lastWatered: {
    type: Number,
    required: true,
  },
  plantedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
module.exports = mongoose.model("Tree", treeSchema);
