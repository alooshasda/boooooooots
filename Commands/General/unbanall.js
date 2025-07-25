const { MessageEmbed } = require(`discord.js`);
module.exports = {
    name: `unbanall`,
    run: async (client, message) => {
        if (!message.member.permissions.has("BAN_MEMBERS")) return;
        if (!message.guild.members.me.permissions.has("BAN_MEMBERS")) return;
        let bans = await message.guild.bans.fetch()
        if (!bans.size) return message.channel.send({ content: `This server has no bans` })
        bans.forEach(ban => message.guild.members.unban(ban.user))
        message.reply({ content: `Plese wait...` }).then(m => {
            setTimeout(() => {
                m.reply({ content: `> **Done successfully unban from \`${bans.size}\` members!**` })
                m.delete()
            }, 4000)
        })

    }
}

