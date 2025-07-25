const { MessageEmbed, Message } = require("discord.js")
const db = require(`pro.db`)
module.exports = {
    name: 'allbans', // هنا اسم الامر
    /**
     * 
     * @param {*} client 
     * @param {Message} message 
     * @param {*} args 
     * @returns 
     */
    run : (client, message, args) => {
                          const Color = db.get(`Guild_Color = ${message.guild.id}`) || message.guild.members.me.displayHexColor || `#000000`
            if (!Color) return;
    message.guild.bans.fetch()
      .then(bans => {
        let list = bans.map(user => `- ${user.user.username}`).join('\n');
        if (list.length >= 1950) list = `${list.slice(0, 1948)}`;

        const embed = new MessageEmbed()
          .setColor(`${Color || message.guild.members.displayHexColor || `#000000`}`)
          .setTitle(`${bans.size} users are banned :`)
          .setDescription(`**${list}**`)
          .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({dynamic : true}))

        message.channel.send({ embeds: [embed] });
      })
      .catch(console.error);
  

  


    }
}
