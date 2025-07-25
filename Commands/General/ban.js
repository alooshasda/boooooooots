const { MessageEmbed } = require(`discord.js`);
module.exports = {
  name: `ban`,
  aliases: [`باند`, `برا`, `حظر`],
  run: async (client, message) => {
    if (!message.member.permissions.has("BAN_MEMBERS")) return;
    let userID = message.content.split(" ").slice(1).join(" ");
    let argss = message.content.split(" ").slice(2).join(" ");
    var user =
      message.mentions.members.first() || client.users.cache.get(userID);
    if (!user) return message.react(`❌`);
    if (user.id === message.author.id) return message.react(`❌`);
    if (user.id === client.user.id) return message.react(`❌`);
    if (!user.bannable) return message.react(`❌`);
    await user.ban({ reason: `By ${message.author}, ${argss}` });
    message.react(`✅`);
  },
};
