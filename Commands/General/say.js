module.exports = {
    name: 'say', // هنا اسم الامر
    run : (client, message, args) => {
        
 
  if (message.author.bot) return;
  if (!message.channel.guild) return;
    if (!message.member.permissions.has("ADMINISTRATOR")) {
      return message.reply("** 😕 You don't have permissions **");
    }
    if (!message.guild.members.me.permissions.has('ADMINISTRATOR')) {
      return message.reply(`** 😕 I couldn't edit the channel permissions. Please check my permissions and role position. **`);
    } 
    let aergs = message.content.split(' ').slice(2).join(' ')
    let argss = message.content.split(' ')
    let channel = message.mentions.channels.first() || message.guild.channels.cache.get(argss[1])
    let attach = message.attachments.first()
    if (!channel) return message.channel.send('** 😕 Please mention channel or id **');
    if (!aergs) return message.channel.send('** ❌ Please select a message **');
    message.delete()
    if (!attach) {
      channel.send({ content: `${aergs}` });
    } else {
      channel.send({ content: `${aergs}`, files: [attach] });
    }

    }
}