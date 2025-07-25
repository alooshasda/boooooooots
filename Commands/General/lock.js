module.exports = {
    name: 'lock', // هنا اسم الامر
  aliases: ["قفل",],
    run : (client, message, args) => {
  
    const permission = message.member.permissions.has("MANAGE_CHANNELS");
    const guilds = message.guild.members.me.permissions.has("MANAGE_CHANNELS");
    const a8rgs = message.content.split(' ')
    const channel = message.mentions.channels.first() || client.channels.cache.get(a8rgs[1]) || message.channel;
    if (!permission)
      return message.reply(
        { content: ":x: **You don't have permission to use this command**" }
      ).catch((err) => {
        console.log(`i couldn't reply to the message: ` + err.message)
      })
    if (!guilds) return message.reply({ content: `:rolling_eyes: **I couldn't edit the channel permissions. Please check my permissions and role position.**`, ephemeral: true }).catch((err) => {
      console.log(`i couldn't reply to the message: ` + err.message)
    })
    let everyone = message.guild.roles.cache.find(hyper => hyper.name === '@everyone');
    channel.permissionOverwrites.edit(everyone, {
      SEND_MESSAGES: false,
      SEND_MESSAGES_IN_THREADS: false,
      CREATE_PUBLIC_THREADS: false,
      CREATE_PRIVATE_THREADS: false
    }).then(() => {
      message.reply({ content: `:lock: **${channel} has been looked.** ` }).catch((err) => {
        console.log(`i couldn't reply to the message: ` + err.message)
      })
    })
 
 }   
}
