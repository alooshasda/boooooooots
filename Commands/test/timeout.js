const Discord = require("discord.js")
const ms = require('ms')
const { MessageEmbed } = require("discord.js");


module.exports = {
  name: "timeout",
  aliases: [""],
  description: "timeout a member",
  usage: ["!timeout @user"],
  category: "admin",
  botPermission: ["MODERATE_MEMBERS"],
  authorPermission: ["MODERATE_MEMBERS"],
  cooldowns: [],
  ownerOnly: false,
  run: async (client, message, args, config) => {
    
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
 

    if (!args[0]) return message.reply({ content: `:rolling_eyes: **Please mention member or id**` }).catch((err) => {
      console.log(`i couldn't reply to the message: ` + err.message)
    })

    if (!member) return message.reply({ content: `:rolling_eyes: **I can't find this member**` }).catch((err) => {
      console.log(`i couldn't reply to the message: ` + err.message)
    })

    if (member.id === message.author.id) return message.reply({ content: `:rolling_eyes: **You can't use this on your self**` }).catch((err) => {
      console.log(`i couldn't reply to the message: ` + err.message)
    })

    if (message.member.roles.highest.position < member.roles.highest.position) return message.reply({ content: `:rolling_eyes: **You can't timeout ${member.user.username} have higher role than you**` }).catch((err) => {
      console.log(`i couldn't reply to the message: ` + err.message)
    })

  
    if (!args[1]) return message.reply({ content: `:x: **Please provide a valid time.**` })
    if (!args[1].endsWith('s')) {
        if (!args[1].endsWith('m')) {
          if (!args[1].endsWith('h')) {
            if (!args[1].endsWith('d')) {
              if (!args[1].endsWith('w')) {
                return message.reply({ content: `:rolling_eyes:** The time must ends with \`s / m / h / d / w\` **` })
              }
            }
          }
        
      }
    }
    member.timeout(ms(args[1]), `done by: ${message.member.nickname} , ${message.author.id}`)
      .then(() => {
        message.reply({ content: `:white_check_mark: **Done timeout ${member.user.username} for ${args[1]}**` })
      })
  },
};