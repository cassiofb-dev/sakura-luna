const mongoose = require("mongoose");

const userArtSchema = new mongoose.Schema({
  userId: String,
  name: String,
  link: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("UserArt", userArtSchema);