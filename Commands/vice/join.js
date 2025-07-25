let { Client } = require("discord.js");
let { joinVoiceChannel } = require("@discordjs/voice");
const Setting_ = require('pro.db');
const {owners } = require(`${process.cwd()}/config`);
module.exports = {
  name: "join",
  description: '〡Join To Voice Channel..',
  aliases: ["join", "247"],
  example: ["join"],

  /**
   * 
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array} args 
   */

  run: async (client, message, args) => {
    try {
      if (!owners.includes(message.author.id)) return;
      let args = message.content.split(" ").slice(1).join(" ");
      let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
      if (!channel || channel.type !== 'GUILD_VOICE') {
        return await message.reply({ content: `**⛔️ - please mention voice channel **` });
      }
      Setting_.set(`Voice_${client.user.id}`, channel.id)
      let connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator,
        selfMute: false,
        selfDeaf: false
      });
      connection.on('ready', () => {
        message.reply({ content: `**✅ - Done successfully **` });
      });
      connection.on('error', (error) => {
        console.log(error);
        message.reply({ content: `**هناكَ خطأٌ يرجى إصلاحهُ**\n\n\`\`\`js\n${error}\`\`\`` });
      });
    } catch (e) {
      return;
    }
  }
};