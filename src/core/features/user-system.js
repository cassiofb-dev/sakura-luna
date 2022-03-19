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

  const messages = await Promise.all(levelLeaderBoard.map(async (guildUser, index) => {
    const message = await newEmbedMessage(guildId);
    message.setTitle(`LEVEL RANK ${(index + 1).toString().padStart(2, "0")}`);
    message.setThumbnail(guildUser.avatarURL || "https://cdn.discordapp.com/avatars/947296544003092480/6c1d3eff3fcb00c46fe8e9b1c81f9e92.webp");
    message.setDescription(
      `User: <@${guildUser.userId}>
      Experience: ${guildUser.experience}
      #########################`
    );
    return message;
  }));

  await interaction.reply({ embeds: messages });
}

/**
 * Show CurrencyLeaderboard
 * @param {CommandInteraction} interaction
 */
const showCurrencyLeaderboard = async (interaction) => {
  const guildId = interaction.guildId;
  const currencyLeaderboard = await guildUserService.getCurrencyLeaderboard(guildId);

  const messages = await Promise.all(currencyLeaderboard.map(async (guildUser, index) => {
    const message = await newEmbedMessage(guildId);
    message.setTitle(`CURRENCY RANK ${(index + 1).toString().padStart(2, "0")}`);
    message.setThumbnail(guildUser.avatarURL || "https://cdn.discordapp.com/avatars/947296544003092480/6c1d3eff3fcb00c46fe8e9b1c81f9e92.webp");
    message.setDescription(
      `User: <@${guildUser.userId}>
      Sakura Petals: ${guildUser.currency}
      #########################`
    );
    return message;
  }));

  await interaction.reply({ embeds: messages });
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