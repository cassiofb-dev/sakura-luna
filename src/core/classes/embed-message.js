const { MessageEmbed, MessageEmbedOptions } = require("discord.js");
const guildConfigService = require("../database/guild-config/guild-config.service");

class EmbedMessage extends MessageEmbed {
  /**
   *   * @param {MessageEmbedOptions} options   */
  constructor(options) {
    super(options);
  }

  /**
   * Load GuildConfig
   * @param {String} guildId   */
  async loadGuildConfig(guildId) {
    const [guildConfig] = await guildConfigService.find({ guildId });
    if (guildConfig) this.setColor(guildConfig.embedMessageColor);
  }
}

/**
 * Returns a EmbedMessage Instance with GuildConfig
 * @param {String} guildId * @returns {Promise<EmbedMessage>}
 */
const newEmbedMessage = async (guildId) => {
  const embedMessage = new EmbedMessage();
  await embedMessage.loadGuildConfig(guildId);
  return embedMessage;
}

module.exports = { newEmbedMessage };