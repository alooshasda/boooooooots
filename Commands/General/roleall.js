module.exports = {
    name: 'roleall', // هنا اسم الامر
    run : (client, message, args) => {
        
     if (!message.member.permissions.has('ADMINISTRATOR')) return message.react(`❌`)
    var rrole = message.content.split(" ").slice(1).join(" ");
    var role = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.name === rrole)||message.guild.roles.cache.find(r => r.id === rrole);
    if(!role) return message.channel.send(`**⚠️ - Please Specify Role ${rrole}**`);
    message.guild.members.cache.forEach(async m => {
        await m.roles.add(role)
    })
    message.channel.send({content : `${role.name} has been added to all the members in this server`})
 
    }
}

