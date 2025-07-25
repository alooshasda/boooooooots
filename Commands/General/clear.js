module.exports = {
  name: 'clear',
  aliases: ['مسح'],
  run: async (client, message, args) => {
    message.delete({ timeout: 0 });

    if (!message.channel.guild) return message.reply('**This command is for servers only.**');

    if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.reply('**You don\'t have the required permissions.**');

    if (!message.guild.members.me.permissions.has('MANAGE_MESSAGES')) 
      return message.reply('**I don\'t have the necessary permissions to manage messages. Please check my role position and permissions.**');

    let amount = parseInt(args[0]) || 100;
    if (amount > 100) amount = 100;

    try {
      const fetchedMessages = await message.channel.messages.fetch({ limit: amount });
      await message.channel.bulkDelete(fetchedMessages);

      message.channel.send(`✅ Cleared ${amount} messages.`)
        .then(msg => msg.delete({ timeout: 5000 }));
    } catch (error) {
      console.error(error);
      message.channel.send(':x: An error occurred while clearing the messages.')
        .then(msg => msg.delete({ timeout: 5000 }));
    }
  }
};