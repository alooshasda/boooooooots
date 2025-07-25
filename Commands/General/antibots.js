const d2b = require('pro.db');
module.exports = {
    name: `antibots`,
    run: async (Client, message) => {
        if (!message.guild) return;
        if (!message.member.permissions.has('ADMINISTRATOR')) return;
        const args = message.content.split(` `)
        let onoroff = args[1]
        if (!onoroff) return message.channel.send(`Example: antibots on/off`)
        if (onoroff == 'on') {
            if (d2b.get(`antibots-${message.guild.id}`) == 'on') {
                return message.channel.send(`AntiBot is already turned on ✅`);
            } else {
                d2b.set(`antibots-${message.guild.id}`, 'on');
                message.channel.send(`AntiBot has been successfully turned on ✅`);
            }
        } else if (onoroff == 'off') {
            if (d2b.get(`antibots-${message.guild.id}`) == 'off') {
                return message.channel.send(`AntiBot is already turned off ❎`);
            } else {
                d2b.set(`antibots-${message.guild.id}`, 'off');
                message.channel.send(`AntiBot has been successfully turned off ❎`);
            }

        }
    }
}