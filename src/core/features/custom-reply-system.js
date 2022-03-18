const { Message, CommandInteraction } = require("discord.js");
const { newEmbedMessage } = require("../classes/embed-message");
const customReplyService = require("../database/custom-reply/custom-reply.service");

/**
 * Level Up System Manager
 * @param {Message} message
 */
const handleCustomReply = async (message) => {
  const guildId = message.guildId;
  const trigger = message.content;
  const [customReply] = await customReplyService.find({ guildId, trigger });

  if (!customReply) return;

  await message.reply(customReply.message);
}

/**
 * Custom reply CRUD
 * @param {CommandInteraction} interaction
 */
const manageCustomReply = async (interaction) => {

  switch (interaction.options.getSubcommand()) {
    case "save": {
      const guildId = interaction.guildId;
      const trigger = interaction.options.getString("trigger");
      const message = interaction.options.getString("message");
      await customReplyService.save({ guildId, trigger, message });
      await interaction.reply("Custom reply saved");
    } break;

    case "list": {
      const guildId = interaction.guildId;
      const customReplies = await customReplyService.find({ guildId });

      if (!customReplies.length) return interaction.reply({
        content: "No custom replies found T_T",
      });

      const embedMessage = await newEmbedMessage(guildId);

      embedMessage.setTitle("Custom Replies List");

      for (const customReplyIndex in customReplies) {
        const { trigger, message } = customReplies[customReplyIndex];
        embedMessage.addField(
          `Custom Reply #${(Number(customReplyIndex) + 1).toString().padStart(2, "0")}`,
          `trigger: ${trigger}\nmessage: ${message}`,
        );
      }

      await interaction.reply({ embeds: [embedMessage] });
    } break;

    case "remove": {
      const guildId = interaction.guildId;
      const trigger = interaction.options.getString("trigger");
      await customReplyService.remove({ guildId, trigger });
      await interaction.reply("Custom reply removed");
    } break;

    default:
      break;
  }
}

const customReplySystem = { handleCustomReply, manageCustomReply };

module.exports = customReplySystem;