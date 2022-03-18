const { Message } = require("discord.js");
const guildConfigService = require("../database/guild-config/guild-config.service");
const guildUserService = require("../database/guild-user/guild-user.service");

/**
 * Level Up System Manager
 * @param {Message} message
 */
const handleLevel = async (message) => {
  const guildId = message.guildId;
  const userId = message.author.id;
  const guildUser = await guildUserService.createIfNotExist(guildId, userId);

  const guildUserOldLevel = Math.floor(Math.log2(guildUser.experience));
  const guildUserNewLevel = Math.floor(Math.log2(guildUser.experience + 1));

  if (guildUserNewLevel > 0 && guildUserNewLevel > guildUserOldLevel) {
    const [guildConfig] = await guildConfigService.find({ guildId });
    const levelUpMessage = guildConfig.levelUpMessage || `Level UP! Your new Level is ${guildUserNewLevel}`;

    await message.reply({
      content: levelUpMessage,
    });

    guildUser.currency += guildUserNewLevel;
  }

  guildUser.experience++;
  await guildUserService.update(guildUser);
}

const levelUpSystem = { handleLevel };

module.exports = levelUpSystem;