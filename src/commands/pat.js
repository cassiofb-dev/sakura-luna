const { CommandInteraction, MessageEmbed } = require("discord.js");
const Command = require("../core/classes/command.js");
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
 * Ping implementation
 * @param {CommandInteraction} interaction
 */
const execute = async (interaction) => {
  const patGifURL = await mediaSystem.searchGif("anime pat");
  const pattinUserId = interaction.user.id;
  const pattedUserId = interaction.options.getUser("patted").id;

  const message = new MessageEmbed();
  message.setTitle("PAT PAT UwU");
  message.setDescription(`<@${pattinUserId}> patted <@${pattedUserId}>`);
  message.setColor("LUMINOUS_VIVID_PINK");
  message.setImage(patGifURL);

  await interaction.reply({
    embeds: [message],
  });
};

command.execute = execute;

module.exports = command;