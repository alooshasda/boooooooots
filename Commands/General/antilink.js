const db = require(`pro.db`)
module.exports = {
    name: `antilink`,
    run: async (Client, message) => {
        if (!message.guild) return;
        if (!message.member.permissions.has('ADMINISTRATOR')) return;
        const args = message.content.split(` `)
        let onoroff =args[1]
        if (!onoroff) return message.channel.send(`Example: antilinks on/off`);
        if (onoroff == 'on') {
            if (db.get(`antilinks-${message.guild.id}`) == 'on') {
                return message.channel.send(`AntiLinks Is already turned on ✅`);
            } else {
                db.set(`antilinks-${message.guild.id}`, 'on');
                message.channel.send(`AntiLinks has been successfully turned on ✅`);
            }

        } else if (onoroff == 'off') {
            if (db.get(`antilinks-${message.guild.id}`) == 'off') {
                return message.channel.send(`AntiLinks Is already turned off ❎`);
            } else {
                db.set(`antilinks-${message.guild.id}`, 'off');
                message.channel.send(`AntiLinks has been successfully turned off ❎`);
            }
        }
    }
}