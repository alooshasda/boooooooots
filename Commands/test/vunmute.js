const { Message, Client } = require("discord.js");

module.exports = {
  name: "vunmute",
  aliases: [],
  description: "unmute a member from the voice channel",
  usage: ["!vunmute @user"],
  category: "admin",
  botPermission: ["MUTE_MEMBERS"],
  authorPermission: ["MUTE_MEMBERS"],
  cooldowns: [],
  ownerOnly: false,
  run: async (client, message, args, config) => {
const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
		
                if (!args[0]) return message.reply({ content: `:rolling_eyes: **Please mention member or id**` }).catch((err) => {
                        console.log(`i couldn't reply to the message: ` + err.message)
                })

                if (!member) return message.reply({ content: `:rolling_eyes: **I can't find this member**` }).catch((err) => {
                        console.log(`i couldn't reply to the message: ` + err.message)
                })

                if (message.member.roles.highest.position < member.roles.highest.position) return message.reply({ content: `:rolling_eyes: **${member.user.username} have higher role than you**` }).catch((err) => {
                        console.log(`i couldn't reply to the message: ` + err.message)
                })


              
                if (!member.voice.channel) return message.reply({ content: `:x: **The user aren't in a voice channel**` })
                member.voice.setMute(false).then(() => {
                        message.reply({ content: `:white_check_mark: **Unmuted ${member.user.username} from the voice**` })
                })

        },
};