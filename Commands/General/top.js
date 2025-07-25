
const {MessageEmbed} = require(`discord.js`);
const db = require(`pro.db`)
module.exports = {
    name: `top-invites`,
  aliases: ["top","توب"],
    run: async (client, message) => {
                  const Color = db.get(`Guild_Color = ${message.guild.id}`) || message.guild.members.me.displayHexColor || `#000000`
            if (!Color) return;
          const invites = await message.guild.invites.fetch();
          const sortedInvites = invites.sort((a, b) => b.uses - a.uses);
          const topInvites = sortedInvites.first(20);
          const embed = new MessageEmbed()
          topInvites.forEach((invite, index) => {
            const inviter = invite.inviter;
       embed.setColor(`${Color || message.guild.members.me.displayHexColor || `#000000`}`)
            embed.setTitle(`**Top Invites**`)
            embed.addFields({ name : `\`#${index + 1}\` - ${inviter.tag} has [ __${invite.uses}__ ]` , value : ` `})
          });
      
          message.channel.send({ embeds: [embed] });
    }
}

