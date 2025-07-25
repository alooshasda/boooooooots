const db = require(`pro.db`)
module.exports = {
    name: `antijoin`,
    run: async (Client, message) => {
        if (!message.guild) return;
        if (!message.member.permissions.has('ADMINISTRATOR')) return;
        const args = message.content.split(` `)
        let onoroff =args[1]
        if (!onoroff) return message.channel.send(`Example: antijoin on/off`);
        if (onoroff == 'on') {
            if (db.get(`antijoin-${message.guild.id}`) == 'on') {
                return message.channel.send(`AntiJoin Is already turned on ✅`);
            } else {
                db.set(`antijoin-${message.guild.id}`, 'on');
                message.channel.send(`AntiJoin has been successfully turned on ✅`);
            }

        } else if (onoroff == 'off') {
            if (db.get(`antijoin-${message.guild.id}`) == 'off') {
                return message.channel.send(`AntiJoin Is already turned off ❎`);
            } else {
                db.set(`antijoin-${message.guild.id}`, 'off');
                message.channel.send(`AntiJoin has been successfully turned off ❎`);
            }
        }
    }
}