const Discord = require(`discord.js`);
const db = require(`pro.db`)
module.exports = {
    name: `setplaying`,
    run: (client, message) => {
      
      const Color = db.get(`Guild_Color = ${message.guild.id}`) || message.guild.members.me.displayHexColor || `#000000`
            if (!Color) return;
      
        const args = message.content.split(" ").slice(1).join(" ")
      if (!args) return message.reply("**💬 - send status msg**")
        message.reply({
            embeds: [new Discord.MessageEmbed()
                     .setColor(`${Color || message.guild.members.me.displayHexColor || `#000000`}`)
                     .setDescription(`[1] Playing
[2] Listening
[3] Streaming
[4] Watching
[0] Cancel`)]
        })
  
        let filter = m => m.author.id === message.author.id;
        message.channel.awaitMessages({ filter, max: 1, time: 90000, errors: ['time'] }).then(collected => {
            if (collected.first().content.toLowerCase() == '1') {
                message.reply({ embeds: [new Discord.MessageEmbed()
                                         // حط كود هنا
                                         .setColor(`${Color || message.guild.members.me.displayHexColor || `#000000`}`)
                                         .setDescription('تم تغيير الحالة إلى PLAYING')] })
                client.user.setPresence({ status: 'idle', activities: [{ name: args, type: "PLAYING" }] })
            } else if (collected.first().content.toLowerCase() == '2') {
                message.reply({ embeds: [new Discord.MessageEmbed()
                                         .setColor(`${Color || message.guild.members.me.displayHexColor || `#000000`}`)
                                         .setDescription('تم تغيير الحالة إلى LISTENING')] })
                client.user.setPresence({ status: 'idle', activities: [{ name: args, type: "LISTENING" }] })

            } else if (collected.first().content.toLowerCase() == '3') {
                message.reply({ embeds: [new Discord.MessageEmbed()
                                         .setColor(`${Color || message.guild.members.me.displayHexColor || `#000000`}`)
                                         .setDescription('تم تغيير الحالة إلى STREAMING')] })
                client.user.setPresence({ status: 'idle', activities: [{ name: args, type: "STREAMING", url: "https://www.twitch.tv/global" }] })

            } else if (collected.first().content.toLowerCase() == '4') {
                message.reply({ embeds: [new Discord.MessageEmbed()
                                         .setColor(`${Color || message.guild.members.me.displayHexColor || `#000000`}`)
                                         .setDescription('تم تغيير الحالة إلى WATCHING')] })
                client.user.setPresence({ status: 'idle', activities: [{ name: args, type: "WATCHING" }] })

            } else if (collected.first().content.toLowerCase() == '0') {
                message.reply({ embeds: [new Discord.MessageEmbed()
                                         .setColor(`${Color || message.guild.members.me.displayHexColor || `#000000`}`)
                                         .setDescription('تم الإلغاء')] })
            }
        }).catch(() => {
            message.reply({ embeds: [new Discord.MessageEmbed()
                                     .setColor(`${Color || message.guild.members.me.displayHexColor || `#000000`}`)
                                     .setDescription('مر الوقت اللازم على الآمر')] })
        })
    }
}