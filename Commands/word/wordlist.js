const { Message, Client } = require("discord.js");
const db = require(`pro.db`);

module.exports = {
    name: "wordlist",
    aliases: ["wordlist"],
    description: "Show all words in the database.",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     */

    run: async (client, message) => {
        if (!message.member.permissions.has(`ADMINISTRATOR`)) return;
        const words = db.get(`word_${message.guild.id}`);
        if (!Array.isArray(words) || words.length === 0) {
            return message.reply({ content : "**⚙️ - no bad words**"});
        }
        
        const wordsList = words.join(" , ");
        
        message.channel.send({ content : `Saved words: ${wordsList}`});
    }
}