const db = require("pro.db");

module.exports = {
  name: "cline",
  description: "To set channel room",
  usage: "!set-channel <channel>",
  run: async (client, message, args) => {
    if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply(`*😕 - You don't have permission*`);
    const channel = message.mentions.channels.first();

    if (!channel) {
      return message.reply("*⛔️ - Please select channel *");
    }

    let channels = await db.get("Channels") || [];

    if (channels.includes(channel.id)) {
      channels = channels.filter((id) => id !== channel.id);
      db.set("Channels", channels);
      return message.reply(`*✅ - Done! Removed the channel "${channel.name}" from the list. *`);
    } else {
      channels.push(channel.id);
      db.set("Channels", channels);
      return message.reply(`*✅ - Done! Added the channel "${channel.name}" to the list. *`);
    }
  },
};