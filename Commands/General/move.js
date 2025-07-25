module.exports = {
    name: 'move', // هنا اسم الامر
  aliases: ["سحب","اسحب"],
    run : (client, message, args) => {
    
  const a9rgs = message.content.split(' ');
  const command = a9rgs[0];
    if (!message.member.permissions.has('MOVE_MEMBERS')) { return message.react('❌'); }
    const memberArg = a9rgs[1];
    const member = message.mentions.members.first() || message.guild.members.cache.find(member => member.id === memberArg || member.user.tag === memberArg || member.user.username === memberArg);
    if (!member) { return message.react('❌'); }
    const authorVoiceChannel = message.member.voice.channel;
    const memberVoiceChannel = member.voice.channel;
    if (!memberVoiceChannel || authorVoiceChannel === memberVoiceChannel) { return message.react('❌'); }
    member.voice.setChannel(authorVoiceChannel);
    return message.react('✅');

 }   
}
