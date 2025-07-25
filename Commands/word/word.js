const { Message, ShardClientUtil } = require("discord.js");
const db = require(`pro.db`);

module.exports = {
  name: "word",
  aliases: ["word"],
  description: "A simple word command.",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   */

  run: async (client, message) => {
    const args = message.content.split(" ");
    const word = args[1];
    if (!message.member.permissions.has(`ADMINISTRATOR`)) return;
    if (!word) return message.react("❌");
    let words = db.get(`word_${message.guild.id}`);
    if (!Array.isArray(words)) {
      words = [];
    }
    words.push(word);
    db.set(`word_${message.guild.id}`, words);
    message.reply({ content: `**✅ - Done successfully **` });
  },
};
