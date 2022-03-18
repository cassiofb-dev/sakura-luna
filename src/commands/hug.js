const { CommandInteraction, MessageEmbed } = require("discord.js");
const Command = require("../core/classes/command.js");
const mediaSystem = require("../core/features/media-system.js");

const command = new Command();
command.setName("hug");
command.setDescription("HUG OwO");

command.addUserOption(option => {
  option.setName("hugged");
  option.setDescription("The lucky one OwO");
  option.setRequired(true);
  return option;
});

/**
 * Hug implementation
 * @param {CommandInteraction} interaction
 */
const execute = async (interaction) => {
  const hugGifURL = await mediaSystem.searchGif("anime hug");
  const hugginUserId = interaction.user.id;
  const huggedUserId = interaction.options.getUser("hugged").id;

  const message = new MessageEmbed();
  message.setTitle("HUG OwO");
  message.setDescription(`<@${hugginUserId}> hugged <@${huggedUserId}>`);
  message.setColor("LUMINOUS_VIVID_PINK");
  message.setImage(hugGifURL);

  await interaction.reply({
    embeds: [message],
  });
};

command.execute = execute;

module.exports = command;