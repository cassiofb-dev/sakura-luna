const { CommandInteraction } = require("discord.js");
const Command = require("../core/classes/command.js");
const guildUserService = require("../core/database/guild-user/guild-user.service.js");
const authorizationHandler = require("../core/handlers/authorization.handler.js");

const command = new Command();
command.setName("sync");
command.setDescription("Sync Sakura database to server");

/**
 * Sync implementation
 * @param {CommandInteraction} interaction
 */
const execute = async (interaction) => {
  const allowExecution = await authorizationHandler.hasAdminRole(interaction);

  if (!allowExecution) return;

  await interaction.reply({
    content: "Execution allowed, start to sync server in database...",
  });

  const guildId = interaction.guildId;
  const members = (await interaction.guild.members.fetch()).map(member => member);
  const guildUsers = await guildUserService.find({ guildId });

  const membersIds = members.map(member => member.id);
  const guildUsersIds = guildUsers.map(guildUser => guildUser.userId);

  let added = 0, removed = 0;

  for (const member of members) if (!guildUsersIds.includes(member.id)) {
    await guildUserService.createIfNotExist(guildId, member.id);
    added++;
  }

  for (const guildUser of guildUsers) if (!membersIds.includes(guildUser.userId)) {
    await guildUserService.remove(guildId, guildUser.userId);
    removed++;
  }

  await interaction.followUp({
    content: `Sync successful, ${added} users added and ${removed} users removed.`,
  });
};

command.execute = execute;

module.exports = command;