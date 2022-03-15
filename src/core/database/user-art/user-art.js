module.exports = class UserArt {
  /**
   *
   * @param {{
   * userId: String,
   * name: String,
   * link: Number,
   * createdAt: Date,
   * }} options
   */
  constructor(options) {
    this.userId = options.userId;
    this.name = options.name;
    this.link = options.link;
    this.createdAt = options.createdAt;
  }
}