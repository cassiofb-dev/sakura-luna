const { CommandInteraction } = require("discord.js");
const Command = require("../core/classes/command.js");
const guildConfigSystem = require("../core/features/guild-config-system.js");
const authorizationHandler = require("../core/handlers/authorization.handler.js");

const command = new Command();
command.setName("guild-config");
command.setDescription("Manage Bot GuildConfig");

command.addSubcommand(subCommand => {
  subCommand.setName("save");
  subCommand.setDescription("save GuildConfig");

  subCommand.addStringOption(option => {
    option.setName("welcome_message");
    option.setDescription("welcome_message");
    option.setRequired(false);
    return option;
  });

  subCommand.addStringOption(option => {
    option.setName("goodbye_message");
    option.setDescription("goodbye_message");
    option.setRequired(false);
    return option;
  });

  subCommand.addStringOption(option => {
    option.setName("level_up_message");
    option.setDescription("level_up_message");
    option.setRequired(false);
    return option;
  });

  subCommand.addStringOption(option => {
    option.setName("embed_message_color");
    option.setDescription("embed_message_color");
    option.setRequired(false);
    return option;
  });

  subCommand.addStringOption(option => {
    option.setName("welcome_channel_name");
    option.setDescription("welcome_channel_name");
    option.setRequired(false);
    return option;
  });

  subCommand.addStringOption(option => {
    option.setName("goodbye_channel_name");
    option.setDescription("goodbye_channel_name");
    option.setRequired(false);
    return option;
  });

  return subCommand;
});

/**
 * GuildConfig command implementation
 * @param {CommandInteraction} interaction
 */
const execute = async (interaction) => {
  const allowExecution = await authorizationHandler.hasAdminRole(interaction);

  if (!allowExecution) return;

  await guildConfigSystem.manageGuildConfig(interaction);
};

command.execute = execute;

module.exports = command;