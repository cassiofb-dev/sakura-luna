module.exports = class GuildConfig {
  /**
   *
   * @param {{
   *  guildId: String,
   *  welcomeMessage: String,
   *  goodbyeMessage: String,
   *  levelUpMessage: String,
   *  embedMessageColor: String,
   *  welcomeChannelName: String,
   *  goodbyeChannelName: String,
   *  createdAt: Date,
   * }} options
   */
  constructor(options) {
    this.guildId = options.guildId;
    this.welcomeMessage = options.welcomeMessage;
    this.goodbyeMessage = options.goodbyeMessage;
    this.levelUpMessage = options.levelUpMessage;
    this.embedMessageColor = options.embedMessageColor;
    this.welcomeChannelName = options.welcomeChannelName;
    this.goodbyeChannelName = options.goodbyeChannelName;
    this.createdAt = options.createdAt;
  }
}