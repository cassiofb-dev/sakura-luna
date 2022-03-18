const { CommandInteraction } = require("discord.js");
const Command = require("../core/classes/command.js");
const { newEmbedMessage } = require("../core/classes/embed-message.js");
const mediaSystem = require("../core/features/media-system.js");

const command = new Command();
command.setName("define");
command.setDescription("unlimeted access to knowledge");

command.addStringOption(option => {
  option.setName("search");
  option.setDescription("search term for search meaning");
  option.setRequired(true);
  return option;
});

/**
 * Define implementation
 * @param {CommandInteraction} interaction
 */
const execute = async (interaction) => {
  const searchString = interaction.options.getString("search");
  const definition = await mediaSystem.define(searchString);

  if (!definition) interaction.reply(`T_T no results found for **${searchString}**`);

  const message = await newEmbedMessage(interaction.guildId);
  message.setTitle(definition.word);
  message.setURL(definition.permalink);
  message.addFields([
    {
      name: "Definition",
      value: definition.definition.substring(0, 1024).replace(/[[\]]/g, ''),
    },
    {
      name: "Example",
      value: definition.example?.substring(0, 1024)?.replace(/[[\]]/g, '') || 'No example found.',
    },
    {
      name: "Rating",
      value: `${definition.thumbs_up}👍 | ${definition.thumbs_down}👎`,
    },
  ]);

  await interaction.reply({
    embeds: [message],
  });
};

command.execute = execute;

module.exports = command;