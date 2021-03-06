const { CommandInteraction } = require("discord.js");
const Command = require("../core/classes/command.js");
const { newEmbedMessage } = require("../core/classes/embed-message.js");
const mediaSystem = require("../core/features/media-system.js");

const command = new Command();
command.setName("kiss");
command.setDescription("KISS UwU");

command.addUserOption(option => {
  option.setName("kissed");
  option.setDescription("The loved one UwU");
  option.setRequired(true);
  return option;
});

/**
 * Kiss implementation
 * @param {CommandInteraction} interaction
 */
const execute = async (interaction) => {
  const kissGifURL = await mediaSystem.searchGif("anime kiss");
  const kissinUserId = interaction.user.id;
  const kissedUserId = interaction.options.getUser("kissed").id;

  const message = await newEmbedMessage(interaction.guildId);
  message.setTitle("KISS UwU");
  message.setDescription(`<@${kissinUserId}> kissed <@${kissedUserId}>`);
  message.setImage(kissGifURL);

  await interaction.reply({
    embeds: [message],
  });
};

command.execute = execute;

module.exports = command;