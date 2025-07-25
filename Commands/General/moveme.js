module.exports = {
    name: 'moveme', // هنا اسم الامر
  aliases: ["ودني",],
    run : (client, message, args) => {
     
  const a10rgs = message.content.split(' ');
  const command = a10rgs[0];
    if (!message.member.permissions.has('MOVE_MEMBERS')) { return message.react('❌'); }
    const author = message.member;
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.find(member => member.id === author.id);
    if (!mentionedMember) { return message.react('❌'); }
    const authorVoiceChannel = author.voice.channel;
    const mentionedMemberVoiceChannel = mentionedMember.voice.channel;
    if (!mentionedMemberVoiceChannel || authorVoiceChannel === mentionedMemberVoiceChannel) { return message.react('❌'); }
    author.voice.setChannel(mentionedMemberVoiceChannel);
    return message.react('✅');

 }   
}
