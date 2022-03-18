const { CommandInteraction } = require("discord.js");
const Command = require("../core/classes/command.js");
const userArtSystem = require("../core/features/user-art-system.js");
const authorizationHandler = require("../core/handlers/authorization.handler.js");

const command = new Command();
command.setName("user-art");
command.setDescription("Manage user arts UwU");

command.addSubcommand(subCommand => {
  subCommand.setName("register");
  subCommand.setDescription("register your art (>w<)");

  subCommand.addStringOption(option => {
    option.setName("name");
    option.setDescription("your art name");
    option.setRequired(true);
    return option;
  });

  subCommand.addStringOption(option => {
    option.setName("link");
    option.setDescription("link to your art");
    option.setRequired(true);
    return option;
  });

  return subCommand;
});

/**
 * UserArt implementation
 * @param {CommandInteraction} interaction
 */
 const execute = async (interaction) => {
  const allowExecution = await authorizationHandler.hasAdminRole(interaction);

  if (!allowExecution) return;

  await userArtSystem.manageUserArt(interaction);
};

command.execute = execute;

module.exports = command;