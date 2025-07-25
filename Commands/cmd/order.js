const db = require("pro.db");

module.exports = {
  name: "setcommandchannel",
  description: "To set channel room",
  usage: "!set-channel <channel>",
  run: async (client, message, args) => {
    if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply(`**😕 - You don't have permission**`);
    let channel = message.mentions.channels.first();

    if (!channel) {
      return message.reply("**⛔️ - Please specify channel **");
    }

    db.set(`setChannel_${message.guild.id}`, channel.id);
    message.reply(`**✅ - Done successfully ${channel}**`);
  }
};

