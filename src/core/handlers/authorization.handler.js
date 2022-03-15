const { CommandInteraction } = require("discord.js");
const CONFIG = require("../../config");

/**
 * Handle permissions
 * @param {CommandInteraction} interaction
 */
const hasPermission = (interaction, permission) => {
  return interaction.member.permissions.has(permission);
}

/**
 * Handle roles
 * @param {CommandInteraction} interaction
 * @param {String} roleName
 */
const hasRole = (interaction, roleName) => {
  const roleNames = interaction.member.roles.cache.map(role => role.name);
  return roleNames.includes(roleName);
}

/**
 * Handle roles
 * @param {CommandInteraction} interaction
 * @param {String} roleName
 */
 const hasAdminRole = async (interaction) => {
   const isAdmin = hasRole(interaction, CONFIG.DISCORD.ROLES.ADMIN);

   await interaction.reply({
    content: "Only my master and friends can tell what I can say! Hmph!",
    ephemeral: true,
   });

   return isAdmin;
}

const authorizationHandler = { hasPermission, hasRole, hasAdminRole };

module.exports = authorizationHandler;