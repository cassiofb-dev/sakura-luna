module.exports = class GuildUser {
  /**
   *
   * @param {{
   * guildId: String,
   * userId: String,
   * currency: Number,
   * avatarURL: String,
   * experience: Number,
   * createdAt: Date,
   * }} options
   */
  constructor(options) {
    this.guildId = options.guildId;
    this.userId = options.userId;
    this.currency = options.currency;
    this.avatarURL = options.avatarURL;
    this.experience = options.experience;
    this.createdAt = options.createdAt;
  }
}