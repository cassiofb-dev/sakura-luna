const { CommandInteraction } = require("discord.js");
const Command = require("../core/classes/command.js");
const currencySystem = require("../core/features/currency-system.js");

const command = new Command();
command.setName("giveaway");
command.setDescription("Make a giveaway");

command.addNumberOption(option => {
  option.setName("amount");
  option.setDescription("The currency amount to giveaway");
  option.setRequired(true);
  return option;
});

/**
 * Giveaway implementation
 * @param {CommandInteraction} interaction
 */
const execute = async (interaction) => {
  await currencySystem.giveaway(interaction);
};

command.execute = execute;

module.exports = command;