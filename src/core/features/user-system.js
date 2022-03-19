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

/**
 * Show LevelLeaderBoard
 * @param {CommandInteraction} interaction
 */
const showLevelLeaderboard = async (interaction) => {
  const guildId = interaction.guildId;
  const levelLeaderBoard = await guildUserService.getLevelLeaderboard(guildId);

  const firstUser = levelLeaderBoard[0];

  const message = await newEmbedMessage(guildId);
  message.setTitle(`Level Leaderboard`);
  message.setThumbnail(firstUser.avatarURL || interaction.client.user.avatarURL());
  message.setDescription(`
    Congrats on being the first <@${firstUser.userId}>!
  `);

  levelLeaderBoard.map((guildUser, index) => {
    message.addField(
      `RANK ${(index + 1).toString().padStart(2, "0")}`,
      `User: <@${guildUser.userId}>\nExperience: ${guildUser.experience}`,
    );
  });

  await interaction.reply({ embeds: [message] });
}

/**
 * Show CurrencyLeaderboard
 * @param {CommandInteraction} interaction
 */
const showCurrencyLeaderboard = async (interaction) => {
  const guildId = interaction.guildId;
  const currencyLeaderboard = await guildUserService.getCurrencyLeaderboard(guildId);

  const firstUser = currencyLeaderboard[0];

  const message = await newEmbedMessage(guildId);
  message.setTitle(`Currency Leaderboard`);
  message.setThumbnail(firstUser.avatarURL || interaction.client.user.avatarURL());
  message.setDescription(`
    Congrats on being the first <@${firstUser.userId}>!
  `);

  currencyLeaderboard.map((guildUser, index) => {
    message.addField(
      `RANK ${(index + 1).toString().padStart(2, "0")}`,
      `User: <@${guildUser.userId}>\nSakura Petals: ${guildUser.currency}`,
    );
  });

  await interaction.reply({ embeds: [message] });
}

/**
 * Parse Leaderboard command
 * @param {CommandInteraction} interaction
 */
const showLeaderboard = async (interaction) => {
  switch (interaction.options.getString("type")) {
    case "level": {
      await showLevelLeaderboard(interaction);
    } break;

    case "currency": {
      await showCurrencyLeaderboard(interaction);
    } break;

    default:
      break;
  }
}

const userSystem = { showUsercard, showLeaderboard };

module.exports = userSystem;