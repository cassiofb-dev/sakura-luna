const { CommandInteraction } = require("discord.js");
const { guildUserLevel } = require("./level-up-system");
const { newEmbedMessage } = require("../classes/embed-message");
const guildUserService = require("../database/guild-user/guild-user.service");

/**
 * Show UserCard
 * @param {CommandInteraction} interaction */
const showUsercard = async (interaction) => {
  const guildId = interaction.guildId;
  const userId = interaction.user.id;
  const username = interaction.user.username;
  const userAvatarURL = interaction.user.avatarURL();
  const guildUser = await guildUserService.createIfNotExist(guildId, userId);
  const userLevel = guildUserLevel(guildUser.experience);

  let sakuraMessage = userLevel < 3 ? (
    "Sakura is starting to know you more OwO"
  ) : userLevel < 6 ? (
    "Sakura is starting to notice you UwU"
  ) : userLevel < 9 ? (
    "Sakura is always noticing you UwU"
  ) : (
    "Sakura is happy to know you and she will never forget you!"
  );

  const message = await newEmbedMessage(guildId);
  message.setTitle(`USERCARD: ${username}`);
  message.setThumbnail(userAvatarURL);
  message.addField("Sakura Message", sakuraMessage);
  message.addField("Experience", `
    Your experience is ${guildUser.experience}.
    And your level is ${guildUserLevel(guildUser.experience)}.
  `);
  message.addField("Currency", `You have ${guildUser.currency} sakura petals`);

  await interaction.reply({ embeds: [message] });
}

const userSystem = { showUsercard };

module.exports = userSystem;