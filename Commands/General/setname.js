module.exports = {
    name: 'setname', // هنا اسم الامر
    run : (client, message, args) => {
        
     

  let a5rgs = message.content.split(" ");
  let name = a5rgs.slice(1).join(" ");
  if(message.member.permissions.has("ADMINISTRATOR")) {
  if (!name) return message.channel.send( `** Please Provide me a name for the bot !**`);
  client.user.setUsername(`${name}`);
  message.reply(`**Done setting \`${name}\` the new name for me**`)
  }
    }
}
