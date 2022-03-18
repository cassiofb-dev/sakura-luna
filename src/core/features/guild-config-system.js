const { CommandInteraction } = require("discord.js");
const guildConfigService = require("../database/guild-config/guild-config.service");

/**
 * GuildConfig CRUD
 * @param {CommandInteraction} interaction
 */
const manageGuildConfig = async (interaction) => {

  switch (interaction.options.getSubcommand()) {
    case "save": {
      const guildId = interaction.guildId;
      const welcomeMessage = interaction.options.getString("welcome_message");
      const goodbyeMessage = interaction.options.getString("goodbye_message");
      const levelUpMessage = interaction.options.getString("level_up_message");
      const embedMessageColor = interaction.options.getString("embed_message_color");
      const welcomeChannelName = interaction.options.getString("welcome_channel_name");
      const goodbyeChannelName = interaction.options.getString("goodbye_channel_name");
      await guildConfigService.save({
        guildId,
        welcomeMessage,
        goodbyeMessage,
        levelUpMessage,
        embedMessageColor,
        welcomeChannelName,
        goodbyeChannelName,
      });

      await interaction.reply("Guild config saved!");
    } break;

    default:
      break;
  }
}

const guildConfigSystem = { manageGuildConfig };

module.exports = guildConfigSystem;