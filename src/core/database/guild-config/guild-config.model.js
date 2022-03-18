const mongoose = require("mongoose");

const guildConfigSchema = new mongoose.Schema({
  guildId: String,
  welcomeMessage: String,
  goodbyeMessage: String,
  levelUpMessage: String,
  embedMessageColor: String,
  welcomeChannelName: String,
  goodbyeChannelName: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("GuildConfig", guildConfigSchema);