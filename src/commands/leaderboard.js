const { CommandInteraction } = require("discord.js");
const Command = require("../core/classes/command.js");
const { showLeaderboard } = require("../core/features/user-system.js");

const command = new Command();
command.setName("leaderboard");
command.setDescription("See the best people!");

command.addStringOption(option => {
  option.setName("type");
  option.setDescription("type of leaderboard");
  option.addChoice("level", "level");
  option.addChoice("currency", "currency");
  option.setRequired(true);

  return option;
});

/**
 * LevelLeaderboard implementation
 * @param {CommandInteraction} interaction
 */
const execute = async (interaction) => {
  await showLeaderboard(interaction);
};

command.execute = execute;

module.exports = command;