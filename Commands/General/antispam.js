const db = require(`pro.db`)
module.exports = {
    name: `antispam`,
    run: async (Client, message) => {
        if (!message.guild) return;
        if (!message.member.permissions.has('ADMINISTRATOR')) return;
        const args = message.content.split(` `)
        let onoroff =args[1]
        if (!onoroff) return message.channel.send(`Example: antispam on/off`);
        if (onoroff == 'on') {
            if (db.get(`antispam-${message.guild.id}`) == 'on') {
                return message.channel.send(`AntiSpam Is already turned on ✅`);
            } else {
                db.set(`antispam-${message.guild.id}`, 'on');
                message.channel.send(`AntiSpam has been successfully turned on ✅`);
            }

        } else if (onoroff == 'off') {
            if (db.get(`antispam-${message.guild.id}`) == 'off') {
                return message.channel.send(`AntiSpam Is already turned off ❎`);
            } else {
                db.set(`antispam-${message.guild.id}`, 'off');
                message.channel.send(`AntiSpam has been successfully turned off ❎`);
            }
        }
    }
}