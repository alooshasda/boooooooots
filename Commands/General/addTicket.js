module.exports = {
    name: 'add', // هنا اسم الامر
    run : (client, message, args) => {
        
     

  if (!message.member.permissions.has('MANAGE_GUILD')) {
message.channel.send({ content: `**:confused: - You don't have permission**` });
};
if(!message.channel.name.includes("ticket-")) return message.channel.send({ content: "**❌ | This is Not Ticket Channel**" })
let member = message.mentions.members.first();
if (!member) return message.channel.send({ content: `**Please mention the user**` });
    if (
      message.channel
        .permissionsFor(member)
        .has(["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"])
    )
      return message.channel.send(
        `This member already in this ticket , :rolling_eyes:`
      );
    message.channel.permissionOverwrites.create(member.id, {
      SEND_MESSAGES: true,
      VIEW_CHANNEL: true,
      READ_MESSAGE_HISTORY: true
    });
    message.channel.send(
      `**Done added <@${member.user.id}> to the ticket , ☑️**`
    );




    }
}
