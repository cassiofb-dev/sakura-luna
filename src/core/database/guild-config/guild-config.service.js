const guildConfigModel = require("./guild-config.model");
const GuildConfig = require("./guild-config");

/**
 * Create GuildConfig
 * @param {GuildConfig} guildConfig
 * @returns {Promise<GuildConfig>}
 */
 const save = async (guildConfig) => {
  const guildId = guildConfig.guildId;
  const foundGuildConfig = await guildConfigModel.findOne({ guildId });

  if (foundGuildConfig) {
    await guildConfigModel.updateOne({ guildId }, guildConfig);
    return guildConfigModel.findOne({ guildId });
  }

  return guildConfigModel.create(guildConfig);
}

/**
 * Find one GuildConfig
 * @param {GuildConfig} guildConfig
 * @returns {Promise<Array<GuildConfig>>}
 */
 const find = (guildConfig) => {
  return guildConfigModel.find(guildConfig);
}

const guildConfigService = { save, find };

module.exports = guildConfigService;