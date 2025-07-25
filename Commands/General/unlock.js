module.exports = {
    name: 'unlock', // هنا اسم الامر
  aliases: ["فتح",],
    run : (client, message, args) => {
        
     

    const permission = message.member.permissions.has("MANAGE_CHANNELS");
    const guilds = message.guild.members.me.permissions.has("MANAGE_CHANNELS");
    const a7rgs = message.content.split(' ')
    const channel = message.mentions.channels.first() || client.channels.cache.get(a7rgs[1]) || message.channel;
    if (!permission)
      return message.reply(
        { content: "**😕 - You don't have permission**" }
      ).catch((err) => {
        console.log(`i couldn't reply to the message: ` + err.message)
      })
    if (!guilds) return message.reply({ content: `:rolling_eyes: **I couldn't change the channel permissions. Please check my permissions.**` }).catch((err) => {
      console.log(`i couldn't reply to the message: ` + err.message)
    })
    let everyone = message.guild.roles.cache.find(hyper => hyper.name === '@everyone');
    channel.permissionOverwrites.edit(everyone, {
      SEND_MESSAGES: null,
      SEND_MESSAGES_IN_THREADS: null,
      CREATE_PUBLIC_THREADS: null,
      CREATE_PRIVATE_THREADS: null
    }).then(() => {
      message.reply({ content: `:unlock: **${channel} has been unlocked.**` }).catch((err) => {
        console.log(`i couldn't reply to the message: ` + err.message)
      })
    })
 


 }   
}
