const { CommandInteraction } = require("discord.js");
const Command = require("../core/classes/command.js");
const { newEmbedMessage } = require("../core/classes/embed-message.js");
const mediaSystem = require("../core/features/media-system.js");

const command = new Command();
command.setName("pat");
command.setDescription("PAT UwU");

command.addUserOption(option => {
  option.setName("patted");
  option.setDescription("The patted one UwU");
  option.setRequired(true);
  return option;
});

/**
 * Pat implementation
 * @param {CommandInteraction} interaction
 */
const execute = async (interaction) => {
  const patGifURL = await mediaSystem.searchGif("anime pat");
  const pattinUserId = interaction.user.id;
  const pattedUserId = interaction.options.getUser("patted").id;

  const message = await newEmbedMessage(interaction.guildId);
  message.setTitle("PAT PAT UwU");
  message.setDescription(`<@${pattinUserId}> patted <@${pattedUserId}>`);
  message.setImage(patGifURL);

  await interaction.reply({
    embeds: [message],
  });
};

command.execute = execute;

module.exports = command;