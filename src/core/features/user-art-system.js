const { CommandInteraction } = require("discord.js");
const userArtService = require("../database/user-art/user-art.service");

/**
 * Custom Art Management
 * @param {CommandInteraction} interaction 
 */
const manageUserArt = async (interaction) => {

  switch (interaction.options.getSubcommand()) {
    case "register": {
      const userId = interaction.user.id;
      const artName = interaction.options.getString("name");
      const artLink = interaction.options.getString("link");

      await userArtService.createIfNotExist({
        userId,
        name: artName,
        link: artLink,
      });

      await interaction.reply("Art registered");
    } break;
  
    default:
      break;
  }
}

const userArtSystem = { manageUserArt };

module.exports = userArtSystem;