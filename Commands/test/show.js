const { MessageEmbed } = require("discord.js");


module.exports = {
  name: "show",
  aliases: ["اظهار"],
  description: "show chat",
  usage: ["!show"],
  category: "admin",
  botPermission: ["MANAGE_CHANNELS"],
  authorPermission: ["MANAGE_CHANNELS"],
  cooldowns: [],
  ownerOnly: false,
  run: async (client, message, args, config) => {



                let everyone = message.guild.roles.cache.find(hyper => hyper.name === '@everyone');
                message.channel.permissionOverwrites.edit(everyone, {
                        VIEW_CHANNEL: true
                }).then(() => {
                        message.reply({ content: `:white_check_mark: **<#${message.channel.id}> Done show this room.**`, ephemeral: true }).catch((err) => {
                                console.log(`i couldn't reply to the message: ` + err.message)
                        })
                })
        }
};