const { CommandInteraction } = require("discord.js");
const Command = require("../core/classes/command.js");
const { showUsercard } = require("../core/features/user-system.js");

const command = new Command();
command.setName("usercard");
command.setDescription("Generate your server usercard");

/**
 * usercard implementation
 * @param {CommandInteraction} interaction
 */
const execute = async (interaction) => {
  await showUsercard(interaction);
};

command.execute = execute;

module.exports = command;