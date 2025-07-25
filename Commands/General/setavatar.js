module.exports = {
    name: 'setavatar', // هنا اسم الامر
    run : (client, message, args) => {
        
     

  let a6rgs = message.content.split(" ");
  let avatar = a6rgs.slice(1).join(" ");
 if(message.member.permissions.has("ADMINISTRATOR")) {
  if (!avatar)
  return message.channel.send(
  `**  Please Provide me an avatar for the bot !**`
  );
  client.user.setAvatar(`${avatar}`);
   message.reply("**Done changing my avatar**")
  }
      
    }
}
