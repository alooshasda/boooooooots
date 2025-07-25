const { Message, Client } = require("discord.js");
const ms = require("ms");
const Data = require("pro.db");

module.exports = {
  name: "vmute",
  aliases: [],
  description: "mute a member from the voice channel",
  usage: ["!vmute @user"],
  category: "admin",
  botPermission: ["MUTE_MEMBERS"],
  authorPermission: ["MUTE_MEMBERS"],
  cooldowns: [],
  ownerOnly: false,
  /**
   *
   * @param {*} client
   * @param {Message} message
   * @param {*} args
   * @param {*} config
   * @returns
   */
  run: async (client, message, args, config) => {
    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    if (!args[0])
      return message
        .reply({ content: `:rolling_eyes: **Please mention member or id**` })
        .catch((err) => {
          console.log(`i couldn't reply to the message: ` + err.message);
        });

    if (!member)
      return message
        .reply({ content: `:rolling_eyes: **I can't find this member**` })
        .catch((err) => {
          console.log(`i couldn't reply to the message: ` + err.message);
        });

    if (message.member.roles.highest.position < member.roles.highest.position)
      return message
        .reply({
          content: `:rolling_eyes: **${member.user.username} have higher role than you**`,
        })
        .catch((err) => {
          console.log(`i couldn't reply to the message: ` + err.message);
        });

    if (!member.voice.channel)
      return message.reply({
        content: `:x: **The user aren't in a voice channel**`,
      });
    member.voice.channel.permissionOverwrites
      .edit(member, { SPEAK: false, USE_VAD: false })
      .then(() => {
        var time = args[2];
        if (!time) time = "24h";
        Data.set(`Muted_V_Member_${member.id}`, new Date().getTime() + ms(time));
        message.reply({
          content: `:white_check_mark: **Muted ${member.user.username} from this voice channel**`,
        });
      });
  },
};
