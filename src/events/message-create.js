const { Message } = require("discord.js");
const Event = require("../core/classes/event");
const guildUserService = require("../core/database/guild-user/guild-user.service");
const customReplySystem = require("../core/features/custom-reply-system");
const levelUpSytem = require("../core/features/level-up-system");

const event = new Event({
  name: "messageCreate",
  once: false,
});

/**
 * messageCreate implementation
 * @param {Message} message
 */
const execute = async (message) => {
  if (message.author.bot) return;
  await levelUpSytem.handleLevel(message);
  await customReplySystem.handleCustomReply(message);
  await guildUserService.update({
    guildId: message.guildId,
    userId: message.author.id,
    avatarURL: message.author.avatarURL(),
  });
}

event.execute = execute;

module.exports = event;