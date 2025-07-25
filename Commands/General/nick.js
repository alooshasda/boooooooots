module.exports = {
    name: 'nick', // هنا اسم الامر
  aliases: ["rolenick",],
    run : (client, message, args) => {
        
     

    if(!message.guild || message.author.bot) return
  let command = message.content.toLowerCase().split(" ")[0];
  
  if (!message.member.permissions.has("MANAGE_ROLES")) return
  let userID = message.content.split(' ').slice(1).join(' ')
   const user = message.mentions.members.first() || client.users.cache.get(userID)
    let picrole = message.guild.roles.cache.find(n => n.name === 'nick.')
    if (!user) return message.react(`❌`)
    reason = `<@!${message.author.id}>`
    if (user.roles.cache.get(picrole.id)) {
      user.roles.remove(picrole, reason).then(() => {
        return message.react(`✅`);
      })
    } else {
      user.roles.add(picrole, reason).then(() => {
        return message.react(`✅`)
      })
    }
  

    }
}
