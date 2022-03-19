const { CommandInteraction } = require("discord.js");
const { newEmbedMessage } = require("../core/classes/embed-message.js");
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

  if (!gifURL.endsWith("gif")) {
    await interaction.reply({
      content: "Your gif was not found T_T",
      ephemeral: true,
    });
  }

  const message = await newEmbedMessage(interaction.guildId);
  message.setTitle("Sakura found your gif!");
  message.setDescription(`Here it goes your gif result for: **${searchString}**`)
  message.setImage(gifURL);

  await interaction.reply({
    embeds: [message],
  });
};

command.execute = execute;

module.exports = command;