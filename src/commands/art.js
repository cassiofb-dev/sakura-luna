const { CommandInteraction } = require("discord.js");
const Command = require("../core/classes/command.js");
const { newEmbedMessage } = require("../core/classes/embed-message.js");
const mediaSystem = require("../core/features/media-system.js");

const command = new Command();
command.setName("art");
command.setDescription("unlimeted access to amazing arts");

command.addStringOption(option => {
  option.setName("name");
  option.setDescription("search by art name");
  option.setRequired(false);
  return option;
});

/**
 * Art implementation
 * @param {CommandInteraction} interaction
 */
const execute = async (interaction) => {
  const artName = interaction.options.getString("name");
  const art = (await mediaSystem.findUserArt({name: artName}))[0] || await mediaSystem.randomUserArt();

  if (!art) return interaction.reply(`No art found! T_T`);

  const message = await newEmbedMessage(interaction.guildId);
  message.setTitle(`Art name: ${art.name}`);
  message.setDescription(`This art was sent by <@${art.userId}>`);
  message.setImage(art.link);

  await interaction.reply({
    embeds: [message],
  });
};

command.execute = execute;

module.exports = command;