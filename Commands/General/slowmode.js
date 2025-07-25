const Discord = require(`discord.js`);
module.exports = {
  name: `slowmode`,
  run: async (client, message) => {
    if (!message.member.permissions.has("ADMINISTRATOR")) {
      return message.react("❌");
    }

    if (message.author.bot || message.channel.type === "DM") {
      return;
    }

    const args = message.content.split(" ");
    if (isNaN(args[1])) {
      return message.react("❌");
    }

    message.react("🕐");
    message.channel.setRateLimitPerUser(args[1]);
  },
};
