const { CommandInteraction } = require("discord.js");
const Command = require("../core/classes/command.js");
const mediaSystem = require("../core/features/media-system.js");

const command = new Command();
command.setName("gif");
command.setDescription("Random gif UwU");

command.addStringOption(option => {
  option.setName("search");
  option.setDescription("search term for search gifs");
  option.setRequired(true);
  return option;
});

/**
 * Gif implementation
 * @param {CommandInteraction} interaction
 */
const execute = async (interaction) => {
  const searchString = interaction.options.getString("search");
  const gifURL = await mediaSystem.searchGif(searchString);
  await interaction.reply(gifURL);
};

command.execute = execute;

module.exports = command;